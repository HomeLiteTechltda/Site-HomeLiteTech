document.getElementById("subscribeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    const email = document.getElementById("email").value;
    if (email) {
        document.getElementById("confirmationMessage").style.display = "block";
        // Limpa o campo de e-mail
        document.getElementById("email").value = "";
    }
});