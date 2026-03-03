# Sprint 7 - JavaScript Básico e Trabalho com o DOM - Semana I

---

## 1. Como o JavaScript Funciona no Navegador

### 1.1 O Navegador Não É Mágico

Antes de escrever uma linha de JS, você precisa ter um modelo mental do que acontece quando o navegador abre uma página. O navegador é basicamente um conjunto de **máquinas especializadas** que trabalham em sequência.

Quando você acessa uma URL, o navegador:

1. Baixa o HTML
2. **Faz o parsing do HTML** — lê o texto e constrói a árvore do DOM
3. Encontra referências a CSS e JS — baixa esses arquivos
4. **Executa o JavaScript** usando a engine JS

### 1.2 A Engine JavaScript

O navegador tem um componente específico para executar JS. No Chrome e no Node.js, essa engine se chama **V8**. No Firefox, é o **SpiderMonkey**.

A engine faz duas coisas principais:

- **Parsing:** Lê o texto do seu arquivo `.js` e transforma em uma estrutura interna chamada AST (Abstract Syntax Tree)
- **Execução:** Roda o código linha por linha, da primeira à última

> **Modelo mental:** Pense na engine como um leitor muito obediente. Ele lê seu código de cima para baixo, sem pular nada, sem adivinhar intenção. Se você errar a ordem, ele vai travar ou se comportar de forma inesperada.

### 1.3 Execução Linha a Linha

```javascript
// O JavaScript executa isso na ordem exata abaixo:

console.log("Linha 1 executada");   // 1º: imprime no console
console.log("Linha 2 executada");   // 2º: imprime no console
console.log("Linha 3 executada");   // 3º: imprime no console

// Se você colocar uma variável antes de declarar (com let/const), vai dar erro:
console.log(nome); // ReferenceError: Cannot access 'nome' before initialization
let nome = "Ana";
```

### 1.4 A Tag `<script>` e o Carregamento

A `<script>` diz ao navegador: *"pare de processar o HTML agora e execute este JS"*.

Isso cria um problema clássico:

```html
<!-- ❌ PROBLEMA: JS tenta acessar o botão antes dele existir no DOM -->
<head>
  <script>
    // Neste momento, o <body> ainda não foi lido pelo parser.
    // O elemento #btn simplesmente não existe ainda.
    document.getElementById("btn").addEventListener("click", function() {
      alert("clicou!");
    });
    // TypeError: Cannot read properties of null
  </script>
</head>
<body>
  <button id="btn">Clique aqui</button>
</body>
```

```html
<!-- ✅ SOLUÇÃO 1: Colocar o script no final do body -->
<body>
  <button id="btn">Clique aqui</button>

  <!-- Aqui o HTML já foi todo lido. O botão existe. -->
  <script>
    document.getElementById("btn").addEventListener("click", function() {
      alert("clicou!");
    });
  </script>
</body>
```

```html
<!-- ✅ SOLUÇÃO 2: Usar o atributo defer no <head> -->
<!-- defer = "execute este script SÓ depois que o HTML terminar de ser parseado" -->
<head>
  <script defer src="script.js"></script>
</head>
<body>
  <button id="btn">Clique aqui</button>
</body>
```

> **Erro comum de iniciante:** Colocar o `<script>` no `<head>` sem `defer` e tentar manipular elementos do `<body>`. O resultado é sempre `null` — o elemento não existe ainda quando o JS roda.

**Regra prática para esta aula:** Coloque sempre o `<script>` antes do `</body>`.

---

## 2. Fundamentos Essenciais (Somente o Necessário para DOM)

### 2.1 Variáveis: `let` vs `const`

A diferença real entre `let` e `const` **não é sobre ser "constante"** no sentido matemático. É sobre **intenção e escopo de mutabilidade**.

```javascript
// const: o binding (a ligação entre nome e valor) não pode ser refeito
const cor = "azul";
cor = "vermelho"; // TypeError: Assignment to constant variable.

// let: o binding pode ser refeito
let pontos = 0;
pontos = 10; // ✅ funciona

// ATENÇÃO: const com objeto não impede mutação interna
const pessoa = { nome: "Ana" };
pessoa.nome = "Carlos"; // ✅ funciona — você não trocou o objeto, mudou dentro dele
pessoa = {};            // ❌ TypeError — isso troca o binding

// Regra prática:
// - Use const por padrão
// - Use let quando precisar reatribuir (ex: contador em loop)
// - Nunca use var (tem comportamento de escopo confuso)
```

> **Erro comum:** Usar `let` para tudo "por segurança". Na prática, `const` comunica a outros desenvolvedores (e ao seu eu futuro) que aquele valor não muda — isso é informação valiosa.

### 2.2 Tipos Primitivos

JavaScript tem tipos que você precisa conhecer agora:

```javascript
// String: texto
const titulo = "JavaScript e DOM";
const subtitulo = 'Aula técnica';
const interpolado = `Bem-vindo à ${titulo}`; // template literal — prefira este

// Number: todos os números (inteiros e decimais são o mesmo tipo)
const idade = 25;
const preco = 9.99;

// Boolean: verdadeiro ou falso
const estaLogado = true;
const temErro = false;

// null: ausência de valor (você atribui intencionalmente)
const usuarioAtual = null; // "não tem usuário"

// undefined: ausência de atribuição (JS coloca automaticamente)
let resultado; // resultado === undefined — você declarou mas não atribuiu

// Como checar o tipo:
console.log(typeof titulo);       // "string"
console.log(typeof idade);        // "number"
console.log(typeof estaLogado);   // "boolean"
console.log(typeof null);         // "object" ← bug histórico do JS, ignore o tipo aqui
```

### 2.3 Funções

Existem duas formas principais de declarar funções. A diferença importa — não é apenas sintaxe.

```javascript
// Forma 1: Declaração de função (function declaration)
// Pode ser chamada ANTES de ser declarada (hoisting)
saudar("Ana"); // ✅ funciona mesmo estando antes da declaração

function saudar(nome) {
  console.log("Olá, " + nome);
}

// Forma 2: Arrow function (atribuída a uma const)
// NÃO pode ser chamada antes de ser declarada
const calcularArea = (largura, altura) => {
  return largura * altura;
};

// Versão curta de arrow function (quando tem só uma expressão de retorno)
const dobrar = (numero) => numero * 2;

// Chamando as funções:
saudar("Carlos");                // "Olá, Carlos"
console.log(calcularArea(5, 3)); // 15
console.log(dobrar(7));          // 14
```

> **Modelo mental:** Uma função é uma caixa com um nome. Você coloca a caixa em algum lugar do código, e depois a chama pelo nome sempre que quiser executar o que está dentro.

> **Erro comum:** Esquecer os parênteses ao chamar a função. `saudar` referencia a função sem executar. `saudar()` a executa.

### 2.4 Condicionais

```javascript
const temperatura = 35;

// if / else if / else
if (temperatura > 30) {
  console.log("Está quente");       // ← entra aqui
} else if (temperatura > 20) {
  console.log("Temperatura agradável");
} else {
  console.log("Está frio");
}

// Operadores de comparação:
// ===  igual em valor E tipo (sempre prefira este)
// !==  diferente em valor ou tipo
// >    maior que
// <    menor que
// >=   maior ou igual
// <=   menor ou igual

// ⚠️ Nunca use == (dois iguais) — ele faz coerção de tipo e causa bugs sutis
console.log(0 == false);   // true  ← confuso
console.log(0 === false);  // false ← correto
```

### 2.5 Escopo Básico

Escopo define **onde uma variável existe**. Este conceito é crítico para trabalhar com eventos no DOM.

```javascript
// Variável fora da função: escopo global (existe em todo o arquivo)
const mensagem = "Olá mundo";

function mostrarMensagem() {
  // Aqui dentro, mensagem existe — está no escopo externo
  console.log(mensagem); // "Olá mundo"

  // Variável dentro da função: escopo local (só existe aqui dentro)
  const resposta = "Recebido";
  console.log(resposta); // "Recebido"
}

mostrarMensagem();
console.log(resposta); // ❌ ReferenceError: resposta is not defined
                        // A variável morreu quando a função terminou
```

> **Erro comum em DOM:** Tentar acessar dentro de um evento uma variável que foi declarada dentro de outra função. Se não está no escopo, não existe.

---

## 3. Modelo Mental do DOM

### 3.1 O DOM Não É HTML

Este é o ponto mais importante desta aula. **O DOM não é o seu arquivo HTML.**

O HTML é um texto. Um arquivo. Uma sequência de caracteres em disco.

O DOM é uma **estrutura de dados em memória** que o navegador constrói a partir desse texto. São coisas distintas.

Quando você abre o DevTools e vê a aba "Elements", você está vendo **o DOM**, não o HTML original. Se o JS modificar o DOM, o DevTools mostra a mudança. O arquivo `.html` em disco continua igual.

### 3.2 Por Que o DOM É uma API

API significa *Application Programming Interface* — uma interface para você interagir com algo que não criou diretamente.

O DOM é uma API porque:

1. O navegador criou a árvore de objetos internamente
2. Você não tem acesso direto à memória do navegador
3. O navegador expõe um conjunto de métodos e propriedades para você acessar e modificar essa árvore
4. Esses métodos são o que chamamos de **DOM API**

`document.getElementById`, `element.textContent`, `element.style` — tudo isso são métodos e propriedades da API do DOM.

### 3.3 Fluxo: Do HTML à Tela

```
Arquivo .html (texto em disco)
        │
        ▼
   HTML Parser
   (lê o texto, identifica tags
    e constrói a estrutura)
        │
        ▼
   DOM Tree em memória
   (objetos JavaScript que representam
    cada tag como um nó da árvore)
        │
        ├──────────────────────┐
        ▼                      ▼
  JavaScript acessa       CSSOM Tree
  e modifica os nós       (árvore de estilos)
        │                      │
        └──────────┬───────────┘
                   ▼
             Render Tree
         (DOM + estilos combinados)
                   │
                   ▼
          Renderização na tela
          (o que o usuário vê)
```

### 3.4 Representação da Árvore do DOM

Dado este HTML:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <h1 id="titulo">Bem-vindo</h1>
    <p class="descricao">Aprendendo DOM</p>
    <button>Clique aqui</button>
  </body>
</html>
```

O DOM gerado tem esta estrutura em árvore:

```
Document
 └── html  (Element node)
      ├── head  (Element node)
      │    └── title  (Element node)
      │         └── "Minha Página"  (Text node)
      └── body  (Element node)
           ├── h1  (Element node)  [atributo: id="titulo"]
           │    └── "Bem-vindo"  (Text node)
           ├── p  (Element node)  [atributo: class="descricao"]
           │    └── "Aprendendo DOM"  (Text node)
           └── button  (Element node)
                └── "Clique aqui"  (Text node)
```

**Lendo o diagrama:**

- Cada linha é um **nó** (node)
- Os nós de tag (`h1`, `p`, `button`) são **Element nodes**
- O texto dentro de cada tag é um **Text node** — filho do element
- Os atributos (`id`, `class`) não são nós filhos: são propriedades do Element node
- `Document` é o nó raiz — o ponto de entrada de tudo

### 3.5 Como o JavaScript Enxerga Essa Árvore

```javascript
// Quando você faz isso:
const titulo = document.querySelector("#titulo");

// Você recebe um objeto JavaScript que representa o nó <h1>
// Esse objeto tem propriedades que correspondem à estrutura do nó:

console.log(titulo.tagName);          // "H1"         — o tipo do Element node
console.log(titulo.id);               // "titulo"     — atributo do nó
console.log(titulo.textContent);      // "Bem-vindo"  — texto do Text node filho
console.log(titulo.parentElement);    // <body>       — o nó pai
console.log(titulo.children);         // HTMLCollection[] — os filhos Element nodes
console.log(titulo.childNodes);       // NodeList[] — todos os filhos incluindo Text nodes
```

> **Modelo mental:** Cada nó da árvore é um objeto JavaScript com propriedades e métodos. Quando você manipula esse objeto, o navegador atualiza o que o usuário vê na tela.

### 3.6 `document` vs `window`

```
window  (objeto global — representa a janela do navegador)
  ├── document  (porta de entrada para o DOM da página)
  ├── location  (URL atual, navegação)
  ├── history   (histórico do navegador)
  ├── console   (ferramentas de debug)
  └── setTimeout, fetch, alert...
```

- `window` é o escopo global. Toda variável declarada no topo do arquivo pertence a ele.
- `document` é a propriedade que dá acesso à árvore do DOM.
- `console.log` é `window.console.log` — o `window.` é implícito e pode ser omitido.

### 3.7 Seleção de Elementos — Diferenças Técnicas

Antes de manipular qualquer elemento, você precisa obter a referência ao nó correspondente na árvore.

#### `getElementById`

```javascript
// Seleciona UM elemento pelo valor exato do atributo id
// Retorna: o Element node, ou null se não encontrar

const titulo = document.getElementById("titulo");
//                                      ↑
//                    Não usa # aqui — é o valor do id, não um seletor CSS

console.log(titulo); // <h1 id="titulo">Bem-vindo</h1>

// Erro comum de iniciante:
const errado = document.getElementById("#titulo"); // ← com # não funciona
console.log(errado); // null — não encontrou nada
```

**Quando usar:** Quando você conhece o `id` exato do elemento. É o método mais rápido — o navegador mantém internamente um índice por id, como um dicionário.

#### `querySelector`

```javascript
// Seleciona o PRIMEIRO elemento que casa com o seletor CSS
// Retorna: o Element node, ou null se não encontrar

const titulo    = document.querySelector("#titulo");          // por id
const paragrafo = document.querySelector(".descricao");       // por classe
const botao     = document.querySelector("button");           // por tag
const especifico = document.querySelector("p.descricao");     // combinado
const aninhado  = document.querySelector("nav > ul > li");    // descendência

// A sintaxe é IDÊNTICA ao CSS.
// Se o seletor funciona no CSS, funciona aqui.
```

**Quando usar:** Quando você precisa de flexibilidade — classes, combinações, atributos, pseudo-classes. É o método mais versátil.

#### `querySelectorAll`

```javascript
// Seleciona TODOS os elementos que casam com o seletor CSS
// Retorna: uma NodeList (coleção de nós)

const paragrafos = document.querySelectorAll("p");
const itens      = document.querySelectorAll(".item-lista");

// Para operar sobre todos, use forEach:
paragrafos.forEach(function(paragrafo) {
  console.log(paragrafo.textContent);
});

// Erro comum de iniciante: tentar usar métodos de Array
paragrafos.map(p => p.textContent);  // ❌ TypeError: .map is not a function
// NodeList tem forEach, mas não tem map, filter, reduce...
// Se precisar de métodos de Array, converta:
Array.from(paragrafos).map(p => p.textContent); // ✅
```

**Quando usar:** Quando você precisa aplicar a mesma operação em vários elementos.

#### Tabela Comparativa

| Método              | Retorna           | Seletor CSS?  | Se não encontrar  |
|---------------------|-------------------|---------------|-------------------|
| `getElementById`    | Element ou `null` | Não (só id)   | `null`            |
| `querySelector`     | Element ou `null` | Sim, completo | `null`            |
| `querySelectorAll`  | NodeList          | Sim, completo | NodeList vazia    |

> **Erro comum universal:** Não verificar se o elemento existe antes de usá-lo. Se `querySelector` retorna `null` e você faz `null.textContent`, o JS lança `TypeError: Cannot read properties of null`. Quando houver dúvida sobre se o elemento existe, verifique antes de usar.

---

## 4. Manipulação do DOM

### 4.1 Alterar Texto

O que acontece internamente: você está sobrescrevendo o conteúdo do Text node filho do element. O navegador detecta a mudança na árvore e re-renderiza aquela região da tela.

```javascript
const titulo = document.querySelector("#titulo");

// textContent: define texto puro — não interpreta HTML
titulo.textContent = "Novo título da página";

// innerHTML: interpreta o conteúdo como markup HTML
// ⚠️ Use com cuidado — pode abrir vulnerabilidade XSS se o conteúdo vier do usuário
titulo.innerHTML = "Título com <strong>negrito</strong>";

// Regra: se o texto vem de input do usuário, SEMPRE use textContent, nunca innerHTML
```

> **Erro comum:** Usar `innerHTML` para inserir texto simples sem HTML. Além de desnecessário, cria risco de segurança.

### 4.2 Alterar Atributos

```javascript
const imagem = document.querySelector("img");

// Forma explícita — funciona para qualquer atributo
imagem.setAttribute("src", "nova-foto.jpg");
imagem.setAttribute("alt", "Descrição atualizada");
console.log(imagem.getAttribute("src")); // "nova-foto.jpg"

// Propriedade direta — funciona para atributos HTML padrão
imagem.src = "outra-foto.jpg";  // equivalente ao setAttribute acima
imagem.alt = "Descrição";

// Atributos personalizados (data-*):
const card = document.querySelector(".card");
card.setAttribute("data-id", "42");
console.log(card.dataset.id); // "42" — acesse via .dataset em camelCase
// data-user-name → dataset.userName
```

### 4.3 Alterar Estilo Inline

```javascript
const caixa = document.querySelector(".caixa");

// A propriedade .style acessa os estilos inline do elemento
// Propriedades CSS com hífen viram camelCase em JS
caixa.style.backgroundColor = "coral";   // background-color → backgroundColor
caixa.style.fontSize = "24px";            // font-size → fontSize
caixa.style.marginTop = "16px";           // margin-top → marginTop

// Erro comum: esquecer a unidade
caixa.style.width = 200;      // ❌ Não funciona — valor sem unidade é ignorado
caixa.style.width = "200px";  // ✅

// Por que alterar .style diretamente tem limitações:
// - Mistura apresentação com comportamento no JS
// - Difícil de sobrescrever com CSS externo (estilo inline tem alta especificidade)
// - Não é reutilizável
// Prefira a abordagem com classes (próximo tópico)
```

### 4.4 Adicionar e Remover Classes

Esta é a abordagem correta. O CSS define a aparência. O JS apenas controla quais classes estão ativas no elemento.

```javascript
const botao = document.querySelector("#meu-botao");

botao.classList.add("ativo");        // adiciona a classe "ativo"
botao.classList.remove("ativo");     // remove a classe "ativo"
botao.classList.toggle("ativo");     // adiciona se não tem; remove se tem
botao.classList.contains("ativo");   // retorna true ou false

// Exemplo real — alternar tema escuro:
const btnTema = document.querySelector("#btn-tema");

btnTema.addEventListener("click", function() {
  document.body.classList.toggle("tema-escuro");
  // O CSS define: .tema-escuro { background: #1a1a1a; color: white; }
  // O JS só decide se a classe está ou não no elemento
});

// Erro comum de iniciante:
botao.className = "ativo";         // ❌ SOBRESCREVE todas as classes existentes
botao.classList.add("ativo");      // ✅ ADICIONA sem remover as outras
```

### 4.5 Criar Elementos Dinamicamente

O que acontece internamente: `createElement` cria um nó em memória — ele ainda não faz parte da árvore do DOM, portanto não aparece na tela. Somente após a inserção com `appendChild` ou equivalente o nó entra na árvore e o navegador o renderiza.

```javascript
// Passo 1: criar o elemento (existe só na memória)
const novoItem = document.createElement("li");

// Passo 2: configurar o elemento
novoItem.textContent = "Nova tarefa";
novoItem.classList.add("item-lista");

// Passo 3: inserir na árvore (agora aparece na tela)
const lista = document.querySelector("#minha-lista");
lista.appendChild(novoItem);   // insere como último filho

// Outros métodos de inserção:
lista.prepend(novoItem);       // insere como primeiro filho
lista.insertBefore(novoItem, lista.firstChild); // antes do primeiro filho

// Para remover:
novoItem.remove();             // remove o nó da árvore

// Erro comum:
const paragrafo = document.createElement("p");
paragrafo.textContent = "Por que não aparece?";
// ← Faltou o appendChild ou equivalente.
// O parágrafo existe em memória, mas não está no DOM. Não aparece na tela.
```

### 4.6 Eventos com `addEventListener`

Eventos conectam o que o usuário faz à lógica do seu código. Este é o mecanismo central de interatividade no navegador.

```
Usuário age (clica, digita, move o mouse)
        │
        ▼
Navegador gera um objeto Event
        │
        ▼
addEventListener detecta o tipo de evento no elemento alvo
        │
        ▼
Executa a função callback passando o objeto Event
        │
        ▼
Callback manipula o DOM conforme a lógica
```

```javascript
const botao = document.querySelector("#btn-acao");

// Sintaxe: addEventListener(tipoDoEvento, funcaoCallback)
botao.addEventListener("click", function() {
  console.log("Botão clicado!");
});

// O callback recebe o objeto evento com informações sobre o que ocorreu:
botao.addEventListener("click", function(evento) {
  console.log(evento.target);              // o elemento que disparou o evento
  console.log(evento.target.textContent);  // texto do elemento clicado
  evento.preventDefault();                 // cancela comportamento padrão do navegador
                                           // (útil em links e formulários)
});

// Eventos mais usados:
// "click"     — clique do mouse
// "mouseover" — mouse entrou no elemento
// "mouseout"  — mouse saiu do elemento
// "keydown"   — tecla pressionada
// "keyup"     — tecla solta
// "input"     — valor de <input> mudou
// "submit"    — <form> foi enviado
// "load"      — página ou recurso terminou de carregar

// Exemplo com campo de texto:
const campo = document.querySelector("#busca");
campo.addEventListener("input", function(evento) {
  const textoBuscado = evento.target.value; // texto atual do campo
  console.log("Buscando por:", textoBuscado);
});

// Erro comum — chamar em vez de passar:
botao.addEventListener("click", minhaFuncao());  // ❌ executa imediatamente ao carregar
botao.addEventListener("click", minhaFuncao);    // ✅ passa a referência para ser chamada depois
```

---

## 5. Ferramentas Reais

### 5.1 VS Code — Estrutura Mínima de Projeto

Para esta aula, organize seus arquivos assim:

```
meu-projeto/
  ├── index.html      ← página principal
  ├── style.css       ← estilos separados
  └── script.js       ← JavaScript separado
```

**Template base do `index.html`:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projeto DOM</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Seu HTML aqui -->

  <!-- Script SEMPRE antes do </body> -->
  <script src="script.js"></script>
</body>
</html>
```

**Extensões recomendadas no VS Code:**
- **Live Server** (Ritwick Dey): abre um servidor local e recarrega o browser automaticamente ao salvar
- **ESLint**: destaca erros de JavaScript enquanto você digita

> Para abrir com Live Server: clique com botão direito no `index.html` → "Open with Live Server"

### 5.2 DevTools — Seu Ambiente de Debug

Abra com `F12` ou `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac).

#### Console

O console é um ambiente JavaScript interativo conectado diretamente à página que está aberta.

```javascript
// No console você pode digitar e executar JS na página atual:
document.querySelector("h1").textContent = "Mudei pelo console!";

// Ferramentas de investigação:
const el = document.querySelector("#titulo");
console.log(el);           // mostra o elemento HTML clicável
console.dir(el);           // mostra o objeto JS com todas as propriedades
console.log(typeof el);    // "object"

// Destaque visual para erros:
console.error("Algo deu errado"); // aparece em vermelho

// Agrupamento de logs relacionados:
console.group("Estado do contador");
console.log("valor atual:", 5);
console.log("máximo:", 10);
console.groupEnd();
```

#### Inspecionar Elemento

- Clique com botão direito em qualquer elemento na página → **"Inspecionar"**
- A aba **Elements** mostra o DOM atual (não o HTML original do arquivo)
- Você pode editar o HTML direto na aba Elements — mudanças são temporárias e se perdem ao recarregar
- Na barra lateral direita, a aba **Computed** mostra quais estilos CSS estão aplicados de fato ao elemento

#### Debug com Breakpoints

1. Vá para a aba **Sources**
2. Encontre seu `script.js` no painel esquerdo
3. Clique no número de uma linha para adicionar um breakpoint (bolinha azul)
4. Recarregue a página ou dispare o evento
5. O JS para exatamente naquela linha
6. Inspecione qualquer variável passando o mouse sobre ela
7. Use os controles de navegação:
   - **Step Over** (F10): executa a linha atual e vai para a próxima
   - **Step Into** (F11): entra dentro da função que está sendo chamada
   - **Resume** (F8): continua a execução até o próximo breakpoint

> **Dica prática:** Quando algo não funciona, a primeira pergunta é: *"qual é o valor desta variável neste momento?"*. Um `console.log` ou breakpoint responde isso imediatamente.

---

## 6. Demonstração Guiada ao Vivo

> Roteiro técnico para executar ao vivo com os alunos. Escreva o código junto, passo a passo.

### Setup Inicial

Crie os três arquivos na mesma pasta e abra com Live Server.

**`index.html`:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Demo DOM — Contador</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 id="titulo">Contador: 0</h1>
  <button id="btn-incrementar">Incrementar</button>
  <button id="btn-resetar">Resetar</button>

  <script src="script.js"></script>
</body>
</html>
```

**`style.css`:**
```css
body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 16px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #333;
  background: white;
  border-radius: 6px;
}

/* Esta classe será adicionada pelo JavaScript quando o valor for alto */
.contador-alto {
  color: crimson;
  font-size: 2.5rem;
  transition: all 0.2s ease;
}
```

---

### Passo 1 — Selecionar os Elementos

```javascript
// script.js — escreva junto com os alunos

// Passo 1: selecionar os elementos que vamos manipular
// Fazemos isso UMA VEZ ao iniciar, não a cada clique
const titulo         = document.querySelector("#titulo");
const btnIncrementar = document.querySelector("#btn-incrementar");
const btnResetar     = document.querySelector("#btn-resetar");

// Verifique no console que os elementos foram encontrados:
console.log("titulo:", titulo);
console.log("btn:", btnIncrementar);
```

**Pause: abra o console. Os elementos devem aparecer. Explique o que cada linha retornou.**

---

### Passo 2 — Criar o Estado

```javascript
// Passo 2: variável para guardar o estado atual (o valor do contador)
// Estado = dado que muda ao longo do tempo e precisa ser refletido na tela
let contador = 0;
```

**Pause: explique a diferença entre o estado (a variável) e a representação visual (o texto no h1). São coisas separadas.**

---

### Passo 3 — Criar a Função de Atualização

```javascript
// Passo 3: função que sincroniza o DOM com o estado
// Toda vez que o contador mudar, chamamos esta função
function atualizarTela() {
  titulo.textContent = `Contador: ${contador}`;

  // Muda a aparência se o contador estiver alto
  if (contador >= 10) {
    titulo.classList.add("contador-alto");
  } else {
    titulo.classList.remove("contador-alto");
  }
}
```

**Pause: explique que o CSS já define o visual. O JS só decide quando aquela classe está ativa.**

---

### Passo 4 — Conectar os Eventos

```javascript
// Passo 4: ouvir os cliques e modificar o estado
btnIncrementar.addEventListener("click", function() {
  contador = contador + 1; // 1. modifica o estado
  atualizarTela();          // 2. atualiza o DOM para refletir o estado
});

btnResetar.addEventListener("click", function() {
  contador = 0;    // 1. reseta o estado
  atualizarTela(); // 2. atualiza o DOM
});
```

**Mostre o fluxo completo ao clicar:**

```
Usuário clica em "Incrementar"
        │
        ▼
addEventListener detecta o evento "click"
        │
        ▼
Callback é executado
        │
        ▼
contador passa de 0 para 1 (estado modificado)
        │
        ▼
atualizarTela() é chamada
        │
        ▼
titulo.textContent muda para "Contador: 1"
        │
        ▼
Navegador re-renderiza aquela parte da tela
```

**Mostre no DevTools: clique em Incrementar várias vezes e observe o DOM mudando na aba Elements em tempo real.**

---

## 7. Exercício Prático Guiado

### Enunciado

Você vai criar uma **lista de tarefas (to-do list) mínima**.

Funcionalidades a implementar:

1. O usuário digita uma tarefa no campo de texto
2. Ao clicar no botão "Adicionar", a tarefa aparece como item na lista
3. Se o campo estiver vazio, a tarefa **não deve ser adicionada**
4. Ao clicar em uma tarefa na lista, ela deve ser marcada como concluída (texto riscado, opacidade reduzida)
5. Clicar novamente na tarefa concluída deve desmarcar
6. O campo de texto deve ser limpo após cada adição

---

### HTML Base

Crie `index.html` com o conteúdo abaixo. **Não modifique o HTML.** Todo o comportamento será implementado apenas em JavaScript.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lista de Tarefas</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 480px;
      margin: 60px auto;
      padding: 0 20px;
    }

    .input-area {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }

    #campo-tarefa {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 6px;
    }

    #btn-adicionar {
      padding: 10px 20px;
      font-size: 16px;
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    #lista-tarefas {
      list-style: none;
      padding: 0;
    }

    #lista-tarefas li {
      padding: 12px;
      margin-bottom: 8px;
      background: #f5f5f5;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
    }

    /* Esta classe será adicionada pelo JavaScript */
    .concluida {
      text-decoration: line-through;
      opacity: 0.5;
    }
  </style>
</head>
<body>

  <h1>Minhas Tarefas</h1>

  <div class="input-area">
    <input type="text" id="campo-tarefa" placeholder="Digite uma tarefa...">
    <button id="btn-adicionar">Adicionar</button>
  </div>

  <ul id="lista-tarefas">
    <!-- Os itens serão adicionados aqui pelo JavaScript -->
  </ul>

  <script src="script.js"></script>
</body>
</html>
```

---

### Espaço para JavaScript

Crie `script.js` e use os comentários como roteiro:

```javascript
// =============================================
// PASSO 1: Selecionar os elementos necessários
// Selecione: campo de texto, botão e a lista <ul>
// Use document.querySelector com os ids corretos
// =============================================




// =============================================
// PASSO 2: Função para adicionar uma tarefa
//
// Esta função deve:
// a) Ler o valor do campo de texto (hint: elemento.value)
// b) Remover espaços em branco das bordas (hint: .trim())
// c) Verificar se o valor não está vazio — se estiver, interrompa (return)
// d) Criar um novo elemento <li> com document.createElement("li")
// e) Colocar o texto da tarefa no <li> (hint: .textContent)
// f) Adicionar evento de clique no <li> para alternar "concluida" (hint: classList.toggle)
// g) Inserir o <li> na lista (hint: lista.appendChild)
// h) Limpar o campo de texto (hint: campo.value = "")
// =============================================

function adicionarTarefa() {
  // seu código aqui
}


// =============================================
// PASSO 3: Conectar o botão à função
// Adicione um addEventListener de "click" no botão
// que chama adicionarTarefa
// =============================================




// =============================================
// DESAFIO EXTRA (opcional):
// Permitir adicionar tarefa ao pressionar Enter no campo
// Hint: campo.addEventListener("keydown", function(evento) { ... })
// Verifique: evento.key === "Enter"
// =============================================
```

---

### Resultado Esperado

Ao completar o exercício:

- Digitar e clicar em "Adicionar" insere a tarefa na lista
- Campo vazio não insere nada
- Campo é limpo automaticamente após adicionar
- Clicar em uma tarefa a marca como concluída (texto riscado)
- Clicar novamente a desmarca

---

### Critérios de Validação

| Critério | Como verificar |
|---|---|
| Campo vazio não adiciona | Clique "Adicionar" sem digitar nada |
| Campo limpa após adicionar | Observe o campo após clicar |
| Item aparece na lista | Aba Elements no DevTools — veja o `<ul>` |
| Clicar no item adiciona classe `concluida` | Elements → classe do `<li>` muda |
| Segundo clique remove a classe | Clique duas vezes no mesmo item |
| Console sem erros | Aba Console — deve estar limpa |

---

### Gabarito

<details>
<summary>Ver solução completa (consulte apenas após tentar)</summary>

```javascript
// PASSO 1: Seleção dos elementos
const campoTarefa  = document.querySelector("#campo-tarefa");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaTarefas = document.querySelector("#lista-tarefas");

// PASSO 2 + lógica de clique no item:
function adicionarTarefa() {
  // Lê o valor e remove espaços das extremidades
  const texto = campoTarefa.value.trim();

  // Guarda vazia — interrompe a função
  if (texto === "") {
    return;
  }

  // Cria e configura o item da lista
  const novoItem = document.createElement("li");
  novoItem.textContent = texto;

  // Marcar/desmarcar ao clicar no item
  novoItem.addEventListener("click", function() {
    novoItem.classList.toggle("concluida");
  });

  // Insere na lista e limpa o campo
  listaTarefas.appendChild(novoItem);
  campoTarefa.value = "";
}

// PASSO 3: Conectar botão
btnAdicionar.addEventListener("click", adicionarTarefa);

// DESAFIO EXTRA: adicionar com Enter
campoTarefa.addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});
```

</details>

---

## Resumo Técnico da Aula

| Conceito | O que é | Por que importa |
|---|---|---|
| Engine JS | Componente do navegador que executa JS | Define como e quando seu código roda |
| DOM | Árvore de objetos em memória | É o que JS manipula — não o arquivo HTML |
| `querySelector` | Seleciona elemento por seletor CSS | Porta de entrada para qualquer manipulação |
| `textContent` | Propriedade do nó de texto | Forma segura de alterar conteúdo |
| `classList` | API para gerenciar classes CSS | Separa corretamente estilo de comportamento |
| `addEventListener` | Registra reação a eventos | Conecta ação do usuário ao código |
| `createElement` | Cria um nó em memória | Constrói UI dinamicamente |
| `appendChild` | Insere nó na árvore do DOM | Faz o elemento aparecer na tela |

> **Próxima aula:** Fetch API — como buscar dados externos e atualizar o DOM com informações reais de uma API.