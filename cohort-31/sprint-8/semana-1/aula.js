// começar código

// . função - ação que precisa ser executada
// . função é um bloco de código que pode ser reutilizado

function raspagemItem(item) {
    console.log('Raspando o item ' + item);
}

function rasparPneu(pneu) {
    raspagemItem(pneu)
}

rasparPneu('pneu 1');

const ingredientes = ['farinha', 'água', 'fermento', 'sal', 'azeite', 'tomate', 'queijo', ''];


function fazerPizza(ingredientes) {
    console.log('Fazendo pizza com os seguintes ingredientes:');
    for (let i = 0; i < ingredientes.length; i++) {
        console.log(ingredientes[i]);
    }
}

fazerPizza(ingredientes);