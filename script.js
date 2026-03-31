// lógica de programação - 


// preciso de um sistema para calculcular se um aluno está aprovado ou não. O aluno faz 4 provas, cada uma valendo até 10 pontos. As condições são:
// Se a média for maior ou igual a 6, o aluno está aprovado
// Se a média for menor que 6, o aluno está reprovado


// variaveis para armazenar as notas, nota1, nota2, nota3, nota4
// variavel somaDaNotaTotal = nota 1 + nota 2 + nota 3 + nota 4
// variavel media = somaDaNotaTotal / 4

let bola = 7;
let feijao = 2;
let macarrao = 6;
let avetruz = 5;

let somaDaNotalTotal = bola + feijao + macarrao + avetruz;
console.log(`Soma das notas: ${somaDaNotalTotal}`);

let media = somaDaNotalTotal / 4;
console.log(`Média: ${media}`);

if (media >=6) {
    console.log("Aluno aprovado");
} else {
    console.log("Aluno reprovado");
}







function validarEmail(email) {
  // Regex básica para validação de e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const button = document.getElementById("valida-email");
button.addEventListener("click", function() {
    const emailInput = document.getElementById("email").value;
    if (validarEmail(emailInput)) {
        console.log("E-mail válido");
    } else {
        console.log("E-mail inválido");
    } 
})