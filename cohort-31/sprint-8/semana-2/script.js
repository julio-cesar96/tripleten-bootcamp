// métodos ou funções
// são blocos de código que realizam uma tarefa específica
// podem ser chamados ou invocados para executar a tarefa

// .card p {}

// exemplo de função
function saudacao() {
    console.log("Olá, seja bem-vindo!");
}

// chamando a função
saudacao();

// exemplo de função com parâmetros
function saudacaoPersonalizada(nome) {
    console.log(`Olá, ${nome}! Seja bem-vindo!`);
}

function soma(a, b) {
    return a + b;
}

let notasDaMarcela = soma(8, 9);
console.log(notasDaMarcela);

// chamando a função com um argumento
saudacaoPersonalizada("Maria"); // 
let saudacaoSabrina = saudacaoPersonalizada("Sabrina");

// DOM - Document Object Model
// é uma representação em árvore dos elementos HTML de uma página
// permite acessar e manipular os elementos da página usando JavaScript

// exemplo de manipulação da DOM
const tagFilhaDoButton = document.querySelector("#changeTextButton p");
console.log(tagFilhaDoButton.textContent);
button.addEventListener("click", function () {
    button.style.backgroundColor = "lightblue";
    button.style.color = "white";
    button.innerText = "O texto foi mudado!";
});