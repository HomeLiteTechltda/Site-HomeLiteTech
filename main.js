document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o reload da página
    
    var email = document.getElementById('emailInput').value;
    
    if(email) {
        // Salva o email no localStorage
        let emails = JSON.parse(localStorage.getItem('newsletterEmails')) || [];
        emails.push(email);
        localStorage.setItem('newsletterEmails', JSON.stringify(emails));
        
        // Exibe uma mensagem de sucesso
        alert('Email cadastrado com sucesso!');
        
        // Limpa o campo de email
        document.getElementById('emailInput').value = '';
    } else {
        alert('Por favor, insira um email válido.');
    }
});


