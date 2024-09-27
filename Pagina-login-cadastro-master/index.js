// Campos do formulário de cadastro
const signUpForm = document.querySelector("#signUp");
const signupNameInput = document.querySelector("#signupName");
const signupEmailInput = document.querySelector("#signupEmail");
const signupAgeInput = document.querySelector("#signupAge");
const signupPasswordInput = document.querySelector("#signupPassword");
const signupConfirmPasswordInput = document.querySelector("#signupConfirmPassword");
const signUpBtn = document.querySelector("#signUpBtn");

// Campos do formulário de login
const loginForm = document.querySelector("#loginForm");
const loginEmailInput = document.querySelector("#loginEmail");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

// Outros
const notification = document.querySelector(".notificationContainer");

// Verifica se todos os campos do cadastro estão preenchidos e habilita e desabilita o botão 
const signupButtonDisable = () => {
  if (
    signupNameInput.value === "" ||
    signupEmailInput.value === "" ||
    signupAgeInput.value === "" ||
    signupConfirmPasswordInput.value === "" ||
    signupPasswordInput.value === ""
  ) {
    signUpBtn.setAttribute("disabled", true);
  } else {
    signUpBtn.removeAttribute("disabled");
  }
};

// Verifica se todos os campos do login estão preenchidos e habilita e desabilita o botão
const loginButtonDisable = () => {
  if (loginEmail.value === "" || loginPasswordInput.value === "") {
    loginBtn.setAttribute("disabled", true);
  } else {
    loginBtn.removeAttribute("disabled");
  }
};

// Altera entre o formulario de cadastro e login
const changeForm = (direction) => {
  if (direction === "left") {
    loginForm.style.display = 'flex';
    loginForm.classList.remove("hideLogin");
    loginForm.classList.add("showLogin");
    document.body.style.overflowY = 'hidden';
    signUpForm.classList.remove("showSignUp");
    signUpForm.classList.add("hideSignUp");
    signUpForm.reset();
    signupButtonDisable();
  } else {
    loginForm.classList.remove("showLogin");
    loginForm.classList.add("hideLogin");
    loginForm.reset();
    loginButtonDisable();
    document.body.style.overflowY = 'visible';
    signUpForm.classList.remove("hideSignUp");
    signUpForm.classList.add("showSignUp");
  }
};

// Exibe as mensagens de erro/sucesso
const messages = (message, status) => {
  notification.removeAttribute("error");
  notification.removeAttribute("success");

  if (status === "error") {
    notification.setAttribute("error", "");
  } else if (status === "success") {
    notification.setAttribute("success", "");
  }

  notification.style.display = "block";
  notification.innerHTML = message;

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
};

// Faz a validação dos inputs
const formVerification = (user) => {
  let error = false;
  let errorNumber = 0;

  if (!user.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
    errorNumber = 1;
  }

  if (user.password != user.confirmPassword) {
    errorNumber = 2;
  } else if (user.password.length < 6) {
    errorNumber = 3;
  }

  if (user.age >= 100 || user.age <= 0) {
    errorNumber = 4;
  }

  switch (errorNumber) {
    case 1:
      messages("Email inválido", "error");
      error = true;
      break;

    case 2:
      messages("As senhas não estão iguais", "error");
      error = true;
      break;

    case 3:
      messages("Sua senha deve possuir ao menos 6 caracteres", "error");
      error = true;
      break;

    case 4:
      messages("Idade inválida", "error");
      error = true;
      break;

    default:
      error = false;
      break;
  }

  return error;
};

// Realiza o cadastro
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = {
    email: signupEmailInput.value,
    name: signupNameInput.value,
    age: signupAgeInput.value,
    password: signupPasswordInput.value,
    confirmPassword: signupConfirmPasswordInput.value,
  };

  if (formVerification(user) === false) {
    delete user.confirmPassword;
    localStorage['user'] = JSON.stringify(user);
    messages('Usuário cadastrado com sucesso', 'success');
    changeForm('left');
  }
});

// Realiza o login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (localStorage['user'] === undefined) {
    messages('Você não possui Cadastro', 'error');
    changeForm('right');
  } else {
    const user = JSON.parse(localStorage['user']);
    const userLogin = {
      email: loginEmailInput.value,
      password: loginPasswordInput.value
    };

    if (userLogin.email === user.email && userLogin.password === user.password) {
      messages("Login correto", "success");//
      loginForm.reset();
      loginButtonDisable();
    } else {
      messages("Usuário ou senha incorretos", "error");
    }
  }
});
