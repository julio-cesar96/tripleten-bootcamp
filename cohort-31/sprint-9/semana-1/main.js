console.log("main.js is running...");
// capturar o formulario pelo ID


function validarNome() {
    const inputNome = document.getElementById("nome");
    const erro = document.getElementById("erro-nome");
    const valor = inputNome.value.trim();

    if (valor == "") {
        erro.innerText = "O nome é obrigatório.";
        inputNome.classList.add("input-invalido");
        inputNome.classList.remove("input-valido");
        return false; // campo inválido
    }

    if (valor.length < 3) {
        erro.innerText = "O nome deve conter pelo menos 3 caracteres.";
        inputNome.classList.add("input-invalido");
        inputNome.classList.remove("input-valido");
        return false; // campo inválido
    }

    erro.innerText = "";
    inputNome.classList.remove("input-invalido");
    inputNome.classList.add("input-valido");
    return true; // campo válido
}

function validarEmail() {
    // O que
    const inputEmail = document.getElementById("email");
    const erro = document.getElementById("erro-email");
    const valor = inputEmail.value.trim();

    // Expressão regular para e-mail (padrão simples e eficaz)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor == "") {
        erro.innerText = "O e-mail é obrigatório.";
        inputEmail.classList.add("input-invalido");
        inputEmail.classList.remove("input-valido");
        return false; // campo inválido
    }

    if (!regexEmail.test(valor)) {
        erro.innerText = "O e-mail deve ser válido (ex: nome@dominio.com).";
        inputEmail.classList.add("input-invalido");
        inputEmail.classList.remove("input-valido");
        return false; // campo inválido
    }


    erro.innerText = "";
    inputEmail.classList.remove("input-invalido");
    inputEmail.classList.add("input-valido");
    return true; // campo válido
}

function validarSenha() {
    const inputSenha = document.getElementById("senha");
    const erro = document.getElementById("erro-senha");
    const valor = inputSenha.value.trim();

    if (valor == "") {
        erro.innerText = "A senha é obrigatória.";
        inputSenha.classList.add("input-invalido");
        inputSenha.classList.remove("input-valido");
        return false; // campo inválido
    }

    if (valor.length < 6) {
        erro.innerText = "A senha deve conter pelo menos 6 caracteres.";
        inputSenha.classList.add("input-invalido");
        inputSenha.classList.remove("input-valido");
        return false; // campo inválido
    }

    erro.innerText = "";
    inputSenha.classList.remove("input-invalido");
    inputSenha.classList.add("input-valido");
    return true; // campo válido
}

// O que - qual elemento da DOM você quer capturar? (formulário, input, botão...)
const form = document.getElementById("meuForm");

// Quando - qual evento você quer escutar? (submit, click, change...)
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    if (nomeValido && emailValido && senhaValida) {
        console.log("Formulário válido! Enviando dados...");

        alert("Cadastro realizado com sucesso!");
        form.reset(); // Limpa o formulário
        // Limpa as mensagens de erro e estilos
        document.getElementById("erro-nome").innerText = "";
        document.getElementById("erro-email").innerText = "";
        document.getElementById("erro-senha").innerText = "";
        document.getElementById("nome").classList.remove("input-valido");
        document.getElementById("email").classList.remove("input-valido");
        document.getElementById("senha").classList.remove("input-valido");
    }
});






// O que - qual elemento da DOM você quer capturar? (formulário, input, botão...)




// O que vai fazer



