class User {
    // o constructor é um método especial para criar e inicializar um objeto criado a partir de uma classe. Ele é chamado automaticamente quando um novo objeto é criado a partir da classe.
    constructor(nome, email) {
        this.nome = nome; // propriedade - dado armazenado dentro do objeto.
        this.email = email;
        this.ativo = true // propriedade com valor padrão, ou seja, não precisa ser passada como argumento na criação do objeto.
    }

    // método - função associada a um objeto. Ele define um comportamento ou ação que o objeto pode realizar.
    apresentar() {
        console.log(`Olá, meu nome é ${this.nome} e meu email é ${this.email}`);
    }

    desativar() {
        this.ativo = false;
        console.log(`O usuário ${this.nome} foi desativado.`);
    }

    ativar() {
        this.ativo = true;
        console.log(`O usuário ${this.nome} foi ativado.`);
    }
}

const usuarioMarcela = new User('Marcela', 'marcelarlkdops5@gmail.com');
usuarioMarcela.apresentar();

console.log(usuarioMarcela.nome); // Output: Marcela
console.log(usuarioMarcela.email); // Output: marcelarlkdops5@gmail.com
console.log(usuarioMarcela.ativo); // Output: true



class Timer {
    constructor() {
        this.tempo = 0; // propriedade para armazenar o tempo atual do timer
    }

    iniciar() {
        setInterval(() => {
            this.tempo++; // herda o "this" do contexto da classe Timer, ou seja, o "this" dentro da função de callback se refere ao objeto Timer.
            console.log(`Tempo: ${this.tempo} segundos`);
        }, 1000); // Executa a função a cada 1000 milissegundos (1 segundo)
    }
}

const meuTimer = new Timer();
meuTimer.iniciar();

