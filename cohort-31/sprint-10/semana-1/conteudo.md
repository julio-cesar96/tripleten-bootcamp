# 🧑‍💻 Programação Orientada a Objetos em JavaScript
### Webinário ao vivo — Módulo 1 de 3

> **Projeto da série:** Vamos construir um sistema de gerenciamento de tarefas (`TaskManager`) ao longo de 3 aulas. Hoje criamos a base: modelagem de usuários e tarefas com POO.

---

## 📋 Agenda da Aula

| # | Tópico | Tipo |
|---|--------|------|
| 1 | O que é POO? Por que usar? | Teoria rápida |
| 2 | Classes e objetos na prática | Demo + ao vivo |
| 3 | Métodos e propriedades | Ao vivo |
| 4 | O `this` e suas armadilhas | Demo + exercício |
| 5 | `function` vs arrow function | Demo |
| 6 | Introdução a interfaces (TypeScript) | Demo |
| 7 | Exercício final guiado | Ao vivo |

---

## 1. O que é POO?

POO é uma forma de organizar o código em torno de **objetos** — estruturas que agrupam **dados** (propriedades) e **comportamentos** (métodos).

```
Classe  →  molde / blueprint
Objeto  →  instância criada a partir da classe
```

**Analogia:** A classe `User` é a planta de um apartamento. Cada usuário criado é um apartamento diferente construído com essa planta.

---

## 2. Classes e Objetos

### 🎬 DEMO — O instrutor mostra (não copiar ainda)

```javascript
// Forma antiga: função construtora (você vai ver isso em código legado)
function UserAntigo(nome, email) {
  this.nome = nome;
  this.email = email;
}

const u = new UserAntigo('Ana', 'ana@email.com');
console.log(u.nome); // 'Ana'
```

---

### 🛠️ AO VIVO — Construir junto

> **Instrutor:** Abrir o arquivo `user.js` no VS Code. Alunos abrem o mesmo arquivo localmente.

```javascript
// user.js

class User {
  // O constructor é chamado automaticamente ao usar "new"
  constructor(nome, email) {
    this.nome = nome;    // propriedade
    this.email = email;  // propriedade
  }
}

// Criando instâncias (objetos)
const usuario1 = new User('Ana Silva', 'ana@email.com');
const usuario2 = new User('Carlos Melo', 'carlos@email.com');

console.log(usuario1.nome);  // 'Ana Silva'
console.log(usuario2.email); // 'carlos@email.com'
```

> **Perguntar para a turma:** O que acontece se chamarmos `User('Ana', 'ana@email.com')` sem o `new`?

---

## 3. Métodos e Propriedades

**Propriedade** = dado armazenado no objeto  
**Método** = função que pertence ao objeto

### 🛠️ AO VIVO — Adicionar métodos à classe User

```javascript
class User {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
    this.ativo = true; // propriedade com valor padrão
  }

  // Método: ação que o objeto pode executar
  apresentar() {
    return `Olá, sou ${this.nome} e meu email é ${this.email}.`;
  }

  desativar() {
    this.ativo = false;
    console.log(`Usuário ${this.nome} foi desativado.`);
  }

  estaAtivo() {
    return this.ativo;
  }
}

const ana = new User('Ana Silva', 'ana@email.com');

console.log(ana.apresentar());  // "Olá, sou Ana Silva..."
console.log(ana.estaAtivo());   // true

ana.desativar();
console.log(ana.estaAtivo());   // false
```

> ⚠️ **Atenção:** Métodos são definidos **dentro da classe**, sem a palavra `function`.

---

## 4. O `this` — O Conceito Mais Importante (e Perigoso)

> `this` dentro de uma classe sempre aponta para **a instância atual** do objeto.

### 🎬 DEMO — Problema clássico com `this`

```javascript
class Timer {
  constructor() {
    this.contagem = 0;
  }

  iniciar() {
    // ❌ ERRADO: "this" perde o contexto dentro do callback
    setInterval(function () {
      this.contagem++; // TypeError: Cannot set properties of undefined
      console.log(this.contagem);
    }, 1000);
  }
}

const t = new Timer();
t.iniciar(); // 💥 Erro!
```

> **Perguntar:** Por que isso acontece? Porque `function` cria seu próprio `this`. Dentro do `setInterval`, `this` não é mais o objeto `Timer`.

---

### 🎬 DEMO — Solução com arrow function

```javascript
class Timer {
  constructor() {
    this.contagem = 0;
  }

  iniciar() {
    // ✅ CORRETO: arrow function herda o "this" do contexto externo
    setInterval(() => {
      this.contagem++;
      console.log(this.contagem); // funciona!
    }, 1000);
  }
}

const t = new Timer();
t.iniciar(); // 1, 2, 3...
```

---

## 5. `function` vs Arrow Function no contexto de `this`

| Característica | `function` | Arrow function `=>` |
|---|---|---|
| Tem seu próprio `this`? | ✅ Sim | ❌ Não — herda do escopo externo |
| Boa para métodos de classe? | ✅ Sim | ⚠️ Evitar (pode causar bugs sutis) |
| Boa para callbacks? | ❌ Cuidado com `this` | ✅ Preferida |

### 🎬 DEMO — Resumo visual

```javascript
class Exemplo {
  constructor() {
    this.valor = 42;
  }

  // ✅ Método normal: use function declaration (sintaxe de método)
  metodoNormal() {
    console.log(this.valor); // 42 — funciona
  }

  metodoComCallback() {
    // ❌ function comum perde o this
    setTimeout(function () {
      console.log(this.valor); // undefined
    }, 100);

    // ✅ arrow function mantém o this
    setTimeout(() => {
      console.log(this.valor); // 42
    }, 100);
  }
}
```

> 🏆 **Regra prática:** Use arrow function sempre que precisar de `this` dentro de callbacks e event listeners.

---

## 🧪 Exercício Guiado 1 — Classe Task

> **Instrutor:** Pausar a digitação. Alunos têm 8 minutos para tentar. Depois corrigir juntos.

**Enunciado:**
Crie uma classe `Task` com:
- Propriedades: `titulo`, `descricao`, `concluida` (começa como `false`)
- Método `concluir()`: muda `concluida` para `true` e exibe uma mensagem
- Método `resumo()`: retorna uma string com o título e o status da tarefa

**Saída esperada:**
```
Resumo: "Estudar POO" — Status: Pendente
Tarefa "Estudar POO" concluída!
Resumo: "Estudar POO" — Status: Concluída
```

### ✅ Solução

```javascript
// task.js

class Task {
  constructor(titulo, descricao) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.concluida = false;
  }

  concluir() {
    this.concluida = true;
    console.log(`Tarefa "${this.titulo}" concluída!`);
  }

  resumo() {
    const status = this.concluida ? 'Concluída' : 'Pendente';
    return `Resumo: "${this.titulo}" — Status: ${status}`;
  }
}

// Teste
const tarefa = new Task('Estudar POO', 'Aprender classes e objetos em JS');
console.log(tarefa.resumo()); // Pendente

tarefa.concluir();
console.log(tarefa.resumo()); // Concluída
```

---

## 6. Introdução a Interfaces com TypeScript

> **Contexto:** TypeScript é JavaScript com tipos. Interfaces definem o "contrato" de um objeto — quais propriedades e métodos ele **deve** ter.

### 🎬 DEMO — Interfaces básicas

```typescript
// Sem interface: qualquer objeto passa, erros aparecem tarde
function exibirUsuario(user: any) {
  console.log(user.nome); // pode quebrar em runtime se "nome" não existir
}

// ✅ Com interface: o TypeScript avisa ANTES de rodar
interface IUser {
  nome: string;
  email: string;
  ativo: boolean;
}

function exibirUsuario(user: IUser) {
  console.log(user.nome); // seguro!
}

// Uso com classe
class User implements IUser {
  nome: string;
  email: string;
  ativo: boolean;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
    this.ativo = true;
  }
}
```

> 💡 **`implements`** é como um "checklist": o TypeScript garante que sua classe tem tudo que a interface exige.

---

### 🎬 DEMO — Interface para Task

```typescript
interface ITask {
  titulo: string;
  descricao: string;
  concluida: boolean;
  concluir(): void;       // método que não retorna nada
  resumo(): string;       // método que retorna string
}

class Task implements ITask {
  titulo: string;
  descricao: string;
  concluida: boolean;

  constructor(titulo: string, descricao: string) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.concluida = false;
  }

  concluir(): void {
    this.concluida = true;
    console.log(`Tarefa "${this.titulo}" concluída!`);
  }

  resumo(): string {
    const status = this.concluida ? 'Concluída' : 'Pendente';
    return `"${this.titulo}" — ${status}`;
  }
}
```

> **Benefício:** Se você esquecer de implementar `resumo()`, o TypeScript aponta o erro imediatamente — não em produção.

---

## 🚨 Erros Comuns e Boas Práticas

### ❌ Erros para evitar

```javascript
// 1. Esquecer o "new"
const u = User('Ana', 'ana@email.com'); // ❌ this será undefined

// 2. Usar "function" em callbacks que precisam de "this"
class Notificador {
  constructor() { this.mensagem = 'Olá!'; }
  iniciar() {
    setTimeout(function() {
      console.log(this.mensagem); // ❌ undefined
    }, 1000);
  }
}

// 3. Modificar propriedades diretamente em vez de usar métodos
tarefa.concluida = true; // ❌ funciona, mas ignora a lógica do método concluir()
tarefa.concluir();       // ✅ usa a lógica correta

// 4. Nomes de classes em minúsculo
class user { ... }  // ❌
class User { ... }  // ✅ sempre PascalCase
```

### ✅ Boas Práticas

```javascript
// ✅ Use métodos para mudar estado interno
// ✅ Nomes de classes em PascalCase
// ✅ Arrow functions em callbacks que precisam de "this"
// ✅ Propriedades inicializadas sempre no constructor
// ✅ Um arquivo por classe (user.js, task.js)
```

---

## 🧪 Exercício Final Guiado — TaskManager básico

> **Instrutor:** Construir ao vivo com participação da turma. Tempo: 12 minutos.

```javascript
// taskManager.js

class TaskManager {
  constructor() {
    this.tarefas = []; // array para guardar as tarefas
  }

  adicionarTarefa(titulo, descricao) {
    const novaTarefa = new Task(titulo, descricao);
    this.tarefas.push(novaTarefa);
    console.log(`✅ Tarefa "${titulo}" adicionada!`);
  }

  listarTarefas() {
    if (this.tarefas.length === 0) {
      console.log('Nenhuma tarefa cadastrada.');
      return;
    }

    this.tarefas.forEach((tarefa, index) => {
      // Note o uso de arrow function para preservar "this" se necessário
      console.log(`${index + 1}. ${tarefa.resumo()}`);
    });
  }

  concluirTarefa(index) {
    const tarefa = this.tarefas[index];
    if (!tarefa) {
      console.log('Tarefa não encontrada.');
      return;
    }
    tarefa.concluir();
  }
}

// Testando tudo junto
const manager = new TaskManager();

manager.adicionarTarefa('Estudar POO', 'Classes e objetos em JS');
manager.adicionarTarefa('Fazer PR', 'Revisar código do colega');

manager.listarTarefas();
// 1. "Estudar POO" — Pendente
// 2. "Fazer PR" — Pendente

manager.concluirTarefa(0);
manager.listarTarefas();
// 1. "Estudar POO" — Concluída
// 2. "Fazer PR" — Pendente
```

---

## 📦 Contexto do Projeto — O que vem nas próximas aulas

```
Módulo 1 (hoje): Classes User e Task, conceitos de POO, this, interfaces
     ↓
Módulo 2: Herança e polimorfismo — AdminUser extends User
          Encapsulamento — propriedades privadas (#campo)
     ↓
Módulo 3: Padrões de projeto básicos (Factory, Observer)
          Integração com APIs — fetch e async/await com POO
```

---

## 📝 Resumo da Aula

| Conceito | O que aprendemos |
|---|---|
| **Classe** | Molde para criar objetos (`class User {}`) |
| **Objeto** | Instância criada com `new` |
| **Propriedade** | Dado do objeto (`this.nome`) |
| **Método** | Função do objeto (`apresentar()`) |
| **`this`** | Aponta para a instância atual |
| **Arrow function** | Herda o `this` do contexto externo — ideal para callbacks |
| **Interface (TS)** | Contrato que garante a estrutura de um objeto |

---

## 🏠 Para Casa

1. Adicione à classe `Task` uma propriedade `prioridade` (`'alta'`, `'media'`, `'baixa'`)
2. Adicione ao `TaskManager` um método `filtrarPorPrioridade(prioridade)` que retorna só as tarefas daquela prioridade
3. **Desafio:** Crie uma interface `ITaskManager` em TypeScript com todos os métodos do `TaskManager`

---

> 📁 **Repositório da aula:** `github.com/seu-usuario/taskmanager-poo`  
> 💬 **Dúvidas:** Deixe no canal `#modulo-poo` do Discord