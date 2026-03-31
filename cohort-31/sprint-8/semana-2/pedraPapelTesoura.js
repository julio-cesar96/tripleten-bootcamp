// script que simula o jogo Pedra, Papel e Tesoura
// o usuário escolhe uma opção e o computador escolhe aleatoriamente
// o resultado é exibido na tela

function jogarPedraPapelTesoura(escolhaUsuario) {
    const opcoes = ["pedra", "papel", "tesoura"];
    console.log(opcoes[1]);
    const escolhaComputador = opcoes[ Math.floor(Math.random() * opcoes.length) ]; // gera um número aleatório entre 0 e 2 para escolher a opção do computador

    console.log(`Você escolheu: ${escolhaUsuario}`);
    console.log(`O computador escolheu: ${escolhaComputador}`);
    
    if (escolhaUsuario === escolhaComputador) {
        console.log("Empate!");
    } else if ((escolhaUsuario === "pedra" && escolhaComputador === "tesoura") ||
               (escolhaUsuario === "papel" && escolhaComputador === "pedra") ||
               (escolhaUsuario === "tesoura" && escolhaComputador === "papel")) {
        console.log("Você venceu!");
    } else {
        console.log("O computador venceu!");
    }
}

// exemplo de uso
jogarPedraPapelTesoura("tesoura");