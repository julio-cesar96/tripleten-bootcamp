# 🧠 Sprint 9 - Semana II

---

## 📋 Índice

1. [Introdução](#1-introdução)
2. [Referência vs Valor](#2-referência-vs-valor)
3. [Encadeamento Opcional (Optional Chaining)](#3-encadeamento-opcional-optional-chaining)
4. [Shallow Copy vs Deep Copy](#4-shallow-copy-vs-deep-copy)
5. [Introdução a Big O](#5-introdução-a-big-o)
6. [Exercícios Distribuídos](#6-exercícios-distribuídos)
7. [Gabarito Comentado](#7-gabarito-comentado)
8. [Conclusão](#8-conclusão)

---

## 1. Introdução

### O Problema Real

Imagine que você está trabalhando num sistema de e-commerce. Você tem um objeto `usuario` com dados do cliente. Em algum ponto do código, você passa esse objeto para uma função para "formatar" os dados — e quando você olha de volta, **o objeto original foi alterado sem você querer**.

Ou então você acessa `usuario.endereco.cidade` e de repente o JavaScript te joga um erro:

```
TypeError: Cannot read properties of undefined (reading 'cidade')
```

Ou ainda: você tem uma lista com 10 produtos e seu código funciona perfeitamente. Com 10.000 produtos, o sistema trava. Por quê?

Esses não são bugs aleatórios. São sintomas de conceitos específicos que a maioria dos tutoriais iniciais **não ensina com profundidade**.

---

## O Que Você Vai Aprender Hoje

| Conceito | Por que importa |
|---|---|
| **Referência vs Valor** | Entender por que objetos se comportam diferente de números e strings |
| **Optional Chaining (`?.`)** | Nunca mais tomar `TypeError` ao acessar propriedades aninhadas |
| **Shallow vs Deep Copy** | Copiar dados sem criar bugs silenciosos |
| **Big O (introdução)** | Prever se seu código vai aguentar em produção |

> 💡 **Mentalidade da aula:** Não estamos aqui para decorar sintaxe. Estamos aqui para **entender o porquê** — porque quem entende o porquê resolve problemas que quem decorou a sintaxe não consegue.

---

## 2. Referência vs Valor

### 2.1 A Diferença Fundamental

JavaScript armazena dados de duas formas completamente diferentes dependendo do **tipo** do dado.

#### Tipos Primitivos (armazenados por VALOR)

- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- `symbol`
- `bigint`

#### Tipos por Referência (armazenados por REFERÊNCIA)

- `object` (inclui `{}` e `[]`)
- `function`

---

### 2.2 O que "por valor" significa?

Quando você cria uma variável com um primitivo, o JavaScript guarda **o valor em si** naquela variável. Pense como se fosse uma caixa que contém o número diretamente.

```js
let a = 10;
let b = a; // b recebe uma CÓPIA do valor 10

b = 20;

console.log(a); // 10
console.log(b); // 20
```

`a` não mudou. Isso é óbvio aqui — mas o comportamento oposto com objetos pega muita gente de surpresa.

---

## 2.3 O que "por referência" significa?

Quando você cria um objeto, o JavaScript **não guarda o objeto diretamente** na variável. Ele guarda um **endereço de memória** — um ponteiro que aponta para onde o objeto está guardado.

Pense assim:

> A variável não é a caixa com o objeto dentro.
> A variável é um **papel com o endereço** de onde a caixa está.

```js
let usuario = { nome: "Ana", idade: 25 };
let copia = usuario; // copia recebe o MESMO endereço

copia.nome = "Carlos";

console.log(usuario.nome); // "Carlos" 😱
console.log(copia.nome);   // "Carlos"
```

`usuario` e `copia` apontam para o **mesmo objeto na memória**. Você não copiou o objeto — você copiou o endereço dele.

---

## 2.4 Visualizando a Memória

```
// Primitivos:
let a = 10     →   [a: 10]
let b = a      →   [a: 10] [b: 10]   ← valores independentes

// Objetos:
let usuario = { nome: "Ana" }   →   [usuario: 🔗] ──→ { nome: "Ana" } (na memória)
let copia = usuario              →   [copia: 🔗] ──→ { nome: "Ana" } (mesmo lugar!)
```

---

## 2.5 Comparação de Objetos

Isso também explica um comportamento que confunde muita gente:

```js
let obj1 = { x: 1 };
let obj2 = { x: 1 };

console.log(obj1 === obj2); // false ❓
```

Por quê `false`? Afinal, eles têm o mesmo conteúdo!

Porque o JavaScript **não compara o conteúdo** de objetos. Ele compara os **endereços de memória**. `obj1` e `obj2` são dois objetos diferentes na memória, com endereços diferentes — mesmo que o conteúdo seja idêntico.

```js
let obj3 = obj1;
console.log(obj1 === obj3); // true ✅ (mesmo endereço)
```

---

## 2.6 O Bug Clássico com Arrays

Arrays são objetos. O mesmo comportamento se aplica:

```js
function adicionarItem(lista, item) {
  lista.push(item);
  return lista;
}

let carrinho = ["camisa", "tênis"];
let novoCarrinho = adicionarItem(carrinho, "boné");

console.log(carrinho);     // ["camisa", "tênis", "boné"] 😱 modificou o original!
console.log(novoCarrinho); // ["camisa", "tênis", "boné"]
```

Você não queria modificar `carrinho`. Mas como passou a referência, a função modificou o objeto original.

---

## 📝 Exercício 1

**Preveja a saída antes de rodar:**

```js
// Parte A
let x = 5;
let y = x;
y++;
console.log(x); // ??? (A1)
console.log(y); // ??? (A2)

// Parte B
let produto = { nome: "Notebook", preco: 3000 };
let desconto = produto;
desconto.preco = 2500;
console.log(produto.preco);  // ??? (B1)
console.log(desconto.preco); // ??? (B2)

// Parte C
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1.length); // ??? (C1)
console.log(arr2.length); // ??? (C2)
```

> 🔎 Anote suas respostas. Não olhe o gabarito ainda. As respostas estão na [seção 7](#7-gabarito-comentado).

---

## 3. Encadeamento Opcional (Optional Chaining)

### 3.1 O Problema

Você está buscando dados de uma API. Nem sempre todos os campos vêm preenchidos. Às vezes um usuário não tem endereço cadastrado. Às vezes o endereço existe, mas não tem CEP. Quando você tenta acessar propriedades aninhadas em um objeto que pode ser `undefined` ou `null`, o JavaScript explode:

```js
let usuario = {
  nome: "João",
  // endereco não existe aqui
};

console.log(usuario.endereco.cidade);
// TypeError: Cannot read properties of undefined (reading 'cidade')
```

---

## 3.2 A Solução Antiga (verbosa e chata)

Antes do Optional Chaining, a gente precisava fazer verificações manuais:

```js
// Jeito antigo — feio, mas funciona
let cidade;
if (usuario && usuario.endereco && usuario.endereco.cidade) {
  cidade = usuario.endereco.cidade;
} else {
  cidade = undefined;
}

// Ou com operador ternário encadeado (ainda pior de ler)
let cidade2 = usuario && usuario.endereco ? usuario.endereco.cidade : undefined;
```

Isso funciona, mas é verboso e difícil de ler — especialmente em objetos mais profundos.

---

## 3.3 A Solução com `?.`

O operador `?.` diz ao JavaScript:

> "Tente acessar essa propriedade. Se o que está antes for `null` ou `undefined`, para aqui e retorna `undefined` — não jogue erro."

```js
let usuario1 = { nome: "João" };
let usuario2 = { nome: "Maria", endereco: { cidade: "São Paulo" } };

console.log(usuario1.endereco?.cidade); // undefined (sem erro!)
console.log(usuario2.endereco?.cidade); // "São Paulo"
```

Limpo, seguro, elegante.

---

## 3.4 Usos do Optional Chaining

### Em objetos aninhados

```js
let empresa = {
  nome: "TechCorp",
  ceo: {
    nome: "Sandra",
    contato: {
      email: "sandra@techcorp.com"
    }
  }
};

console.log(empresa.ceo?.contato?.email);     // "sandra@techcorp.com"
console.log(empresa.cto?.contato?.email);     // undefined (cto não existe)
```

### Em arrays

```js
let usuarios = null;

console.log(usuarios?.[0]?.nome); // undefined (sem erro!)
```

### Em chamadas de função

```js
let config = {
  // callback não foi fornecido
};

config.onSuccess?.("dados"); // não faz nada, sem erro
config.onError?.("erro");    // não faz nada, sem erro
```

---

## 3.5 Combinando com Nullish Coalescing (`??`)

O `??` retorna o lado direito quando o lado esquerdo é `null` ou `undefined`. É o par perfeito do `?.`:

```js
let usuario = { nome: "Bia" };

let cidade = usuario.endereco?.cidade ?? "Cidade não informada";
console.log(cidade); // "Cidade não informada"
```

---

## 3.6 ⚠️ Pegadinhas Importantes

### Pegadinha 1: `?.` não protege de `null` explícito no meio do caminho quando o problema está antes

```js
let obj = null;
console.log(obj?.propriedade); // undefined ✅

// Mas:
let obj2 = { nivel1: null };
console.log(obj2.nivel1.nivel2); // TypeError! 💥 (nivel1 existe mas é null)
console.log(obj2.nivel1?.nivel2); // undefined ✅ (usa ?. no lugar certo)
```

### Pegadinha 2: Não abuse — código com muitos `?.` pode esconder bugs reais

```js
// Isso pode estar escondendo um bug de lógica:
resultado?.dados?.items?.[0]?.valor?.toFixed(2)
// Se algo deu errado antes, você vai receber undefined silenciosamente
// em vez de um erro que te ajudaria a encontrar o problema
```

Use `?.` quando a ausência de uma propriedade é **esperada e normal**. Não use para suprimir erros de lógica.

### Pegadinha 3: Não funciona para atribuição

```js
usuario?.nome = "Novo Nome"; // SyntaxError! ❌
// Optional chaining é só para leitura
```

---

## 📝 Exercício 2

**Preveja a saída:**

```js
let pedido = {
  id: 101,
  cliente: {
    nome: "Lucas"
    // sem endereço
  },
  itens: [
    { produto: "Camiseta", quantidade: 2 }
  ]
};

// A
console.log(pedido.cliente?.nome);              // ??? (A)
// B
console.log(pedido.cliente?.endereco?.rua);     // ??? (B)
// C
console.log(pedido.pagamento?.cartao?.numero);  // ??? (C)
// D
console.log(pedido.itens?.[0]?.produto);        // ??? (D)
// E
console.log(pedido.itens?.[5]?.produto);        // ??? (E)

// F — com nullish coalescing:
let cep = pedido.cliente?.endereco?.cep ?? "CEP não cadastrado";
console.log(cep); // ??? (F)
```

> 🔎 Respostas na [seção 7](#7-gabarito-comentado).

---

# 4. Shallow Copy vs Deep Copy

## 4.1 Retomando o Problema

Lembra do bug com referências? Agora sabemos que:

```js
let original = { nome: "Ana", idade: 30 };
let copia = original; // NÃO é uma cópia, é outra referência
```

Então, como **realmente copiar** um objeto?

---

## 4.2 Shallow Copy — Cópia Superficial

Uma shallow copy (cópia rasa) cria um **novo objeto** com os mesmos valores de primeiro nível. Mas se algum desses valores for um objeto aninhado, ele ainda é **compartilhado por referência**.

### Usando Spread Operator (`...`)

```js
let original = { nome: "Ana", idade: 30 };
let copia = { ...original };

copia.nome = "Carlos";

console.log(original.nome); // "Ana" ✅ — não foi modificado
console.log(copia.nome);    // "Carlos" ✅
```

Funcionou! Mas agora veja o que acontece com objetos aninhados:

```js
let usuario = {
  nome: "Ana",
  endereco: {
    cidade: "Curitiba",
    estado: "PR"
  }
};

let copia = { ...usuario };

copia.nome = "Carlos";             // ok, primitivo — não afeta o original
copia.endereco.cidade = "Manaus";  // 💥 problema!

console.log(usuario.nome);           // "Ana" ✅
console.log(usuario.endereco.cidade); // "Manaus" 😱 foi modificado!
```

O spread copiou a referência de `endereco`, não o objeto `endereco` em si.

---

## 4.3 Visualizando o Problema

```
// Antes do spread:
usuario  → { nome: "Ana", endereco: 🔗 } ──→ { cidade: "Curitiba" }

// Depois do spread:
usuario  → { nome: "Ana", endereco: 🔗 } ──→ { cidade: "Curitiba" }
                                                        ↑
copia    → { nome: "Ana", endereco: 🔗 } ─────────────┘
           (nova caixa pra nome)        (MESMO endereço!)
```

`nome` foi realmente copiado (primitivo). `endereco` foi copiado como referência — ambos apontam para o mesmo objeto.

---

## 4.4 O Bug Clássico com Arrays de Objetos

```js
let produtos = [
  { id: 1, nome: "Camisa", estoque: 10 },
  { id: 2, nome: "Calça", estoque: 5 }
];

let backup = [...produtos]; // shallow copy do array

backup[0].estoque = 0; // "só estou modificando o backup"...

console.log(produtos[0].estoque); // 0 😱 o original também mudou!
```

O spread copiou o array, mas os objetos dentro dele ainda são as mesmas referências.

---

## 4.5 Deep Copy — Cópia Profunda

Uma deep copy (cópia profunda) cria um **novo objeto independente em todos os níveis** — nenhuma referência é compartilhada.

### Solução 1: `structuredClone` (moderna e recomendada)

```js
let usuario = {
  nome: "Ana",
  endereco: {
    cidade: "Curitiba",
    estado: "PR"
  },
  hobbies: ["leitura", "viagem"]
};

let copia = structuredClone(usuario);

copia.nome = "Carlos";
copia.endereco.cidade = "Manaus";
copia.hobbies.push("cinema");

console.log(usuario.nome);            // "Ana" ✅
console.log(usuario.endereco.cidade); // "Curitiba" ✅
console.log(usuario.hobbies);         // ["leitura", "viagem"] ✅
```

`structuredClone` está disponível em todos os navegadores modernos e no Node.js 17+. É a forma mais simples e segura de fazer deep copy hoje.

---

### Solução 2: JSON (funciona, mas tem limitações)

```js
let copia = JSON.parse(JSON.stringify(usuario));
```

**Funciona para:** objetos com strings, números, booleans, arrays e objetos aninhados.

**Não funciona para:**
- Funções (são ignoradas)
- `undefined` (é ignorado)
- `Date` (vira string)
- `Map`, `Set`, `RegExp` (viram `{}`)
- Referências circulares (gera erro)

Use com cuidado. Prefira `structuredClone` sempre que possível.

---

### Solução 3: Recursão Manual (para entender o conceito)

```js
function deepCopy(obj) {
  // Caso base: se não é objeto, retorna o valor diretamente
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Se é array, cria novo array
  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item));
  }

  // Se é objeto, cria novo objeto copiando cada propriedade recursivamente
  let novoCopy = {};
  for (let chave in obj) {
    novoCopy[chave] = deepCopy(obj[chave]);
  }
  return novoCopy;
}
```

Não precisa usar isso em produção (use `structuredClone`), mas entender a lógica é valioso.

---

## 4.6 Quando usar Shallow vs Deep?

| Situação | Use |
|---|---|
| Objeto simples, sem aninhamento | Shallow (`...spread`) |
| Você só vai modificar propriedades do primeiro nível | Shallow |
| Objeto tem objetos/arrays aninhados | Deep (`structuredClone`) |
| Precisa de independência total | Deep |
| Performance crítica em objetos grandes e rasos | Shallow |

---

## 📝 Exercício 3

```js
let pedido = {
  id: 1,
  cliente: "Mariana",
  itens: [
    { nome: "Livro JS", qty: 1 },
    { nome: "Caneca Dev", qty: 2 }
  ]
};

// Cenário A — Shallow Copy com spread
let copiaA = { ...pedido };
copiaA.cliente = "Roberto";
copiaA.itens[0].qty = 99;

console.log(pedido.cliente);      // ??? (A1)
console.log(pedido.itens[0].qty); // ??? (A2)

// Cenário B — Deep Copy com structuredClone
let copiaB = structuredClone(pedido);
copiaB.cliente = "Fernanda";
copiaB.itens[0].qty = 50;

console.log(pedido.cliente);      // ??? (B1) — lembre que copiaA já mudou itens[0].qty!
console.log(pedido.itens[0].qty); // ??? (B2)
```

> ⚠️ Atenção: os cenários A e B são sequenciais! O estado de `pedido` no cenário B já foi afetado pelo cenário A.

> 🔎 Respostas na [seção 7](#7-gabarito-comentado).

---

# 5. Introdução a Big O

## 5.1 O Problema Prático

Você tem esse código:

```js
function buscarUsuario(usuarios, id) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      return usuarios[i];
    }
  }
  return null;
}
```

Com 100 usuários, funciona em milissegundos. Com 1.000.000 de usuários, pode travar a aplicação.

Por quê? E como prever isso antes de colocar em produção?

A resposta está em **Big O Notation** — uma forma de medir como um algoritmo **cresce** conforme a entrada aumenta.

---

## 5.2 O Conceito Central: Crescimento

Big O não mede o tempo absoluto de execução. Ele mede a **relação entre o tamanho da entrada e o número de operações**.

A pergunta é: **se eu dobrar a entrada, o que acontece com o trabalho do algoritmo?**

Pense numa cozinha:
- **Verificar se a geladeira está fechada:** não importa quantos itens têm dentro. É sempre uma operação. → **O(1)**
- **Procurar um ingrediente específico em ordem:** quanto mais itens, mais você procura. → **O(n)**
- **Comparar cada ingrediente com todos os outros:** explode muito rápido. → **O(n²)**

---

## 5.3 O(1) — Tempo Constante

**O algoritmo sempre faz a mesma quantidade de trabalho, independente do tamanho da entrada.**

```js
// Acessar elemento de array por índice: O(1)
function primeiroElemento(arr) {
  return arr[0]; // sempre 1 operação, não importa o tamanho
}

// Acessar propriedade de objeto: O(1)
function getNome(usuario) {
  return usuario.nome; // sempre 1 operação
}
```

Se você dobrar o array, o trabalho é **o mesmo**. Perfeito!

---

## 5.4 O(n) — Tempo Linear

**O algoritmo faz uma quantidade de trabalho proporcional ao tamanho da entrada.**

```js
// Percorrer um array: O(n)
function somarTodos(numeros) {
  let total = 0;
  for (let num of numeros) { // executa n vezes
    total += num;
  }
  return total;
}

// Buscar em lista não-ordenada: O(n)
function buscarPorNome(lista, nome) {
  for (let item of lista) { // no pior caso, percorre tudo
    if (item.nome === nome) return item;
  }
  return null;
}
```

10 itens → ~10 operações
100 itens → ~100 operações
1.000.000 itens → ~1.000.000 operações

Se dobrar a entrada, o trabalho **dobra**. Aceitável na maioria dos casos.

---

## 5.5 O(n²) — Tempo Quadrático

**O algoritmo faz trabalho proporcional ao quadrado da entrada. Loop dentro de loop.**

```js
// Comparar todos com todos: O(n²)
function encontrarDuplicatas(arr) {
  let duplicatas = [];
  for (let i = 0; i < arr.length; i++) {       // n vezes
    for (let j = i + 1; j < arr.length; j++) { // n vezes cada
      if (arr[i] === arr[j]) {
        duplicatas.push(arr[i]);
      }
    }
  }
  return duplicatas;
}
```

10 itens → ~100 operações
100 itens → ~10.000 operações
1.000 itens → ~1.000.000 operações

Se dobrar a entrada, o trabalho é **4x maior**. Perigoso com entradas grandes!

---

## 5.6 Comparação Visual

```
Entrada (n):      10      100     1.000   10.000
─────────────────────────────────────────────────
O(1)               1        1         1        1
O(n)              10      100     1.000   10.000
O(n²)            100   10.000 1.000.000 > 100M 😱
```

---

## 5.7 Regras Práticas para Analisar Código

### Loops simples = O(n)

```js
for (let i = 0; i < n; i++) { ... }   // O(n)
```

### Loops aninhados = multiplica

```js
for (let i = 0; i < n; i++) {         // O(n)
  for (let j = 0; j < n; j++) { ... } // O(n)
}
// Total: O(n * n) = O(n²)
```

### Operações em sequência = soma (mas só o maior importa)

```js
function exemplo(arr) {
  let soma = 0;
  for (let x of arr) soma += x;  // O(n)
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      // ...
    }
  }                                // O(n²)
}
// Total: O(n) + O(n²) = O(n²) — o maior domina
```

### Ignoramos constantes

```js
// Isso não é O(3n), é simplesmente O(n):
for (let i = 0; i < arr.length; i++) { ... }
for (let i = 0; i < arr.length; i++) { ... }
for (let i = 0; i < arr.length; i++) { ... }
```

---

## 5.8 Por Que Isso Importa na Prática?

```js
// ❌ Solução O(n²) — funciona, mas não escala
function temDuplicata_Ruim(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// ✅ Solução O(n) — usa um Set para busca O(1)
function temDuplicata_Boa(arr) {
  const vistos = new Set();
  for (let item of arr) {
    if (vistos.has(item)) return true; // busca em Set é O(1)
    vistos.add(item);
  }
  return false;
}
```

Com 10.000 itens:
- Versão ruim: ~100.000.000 operações 🐢
- Versão boa: ~10.000 operações 🚀

Mesma lógica, performance completamente diferente.

---

## 📝 Exercício 4

**Qual a complexidade de cada função? Justifique.**

```js
// Função 1
function multiplicar(a, b) {
  return a * b;
}

// Função 2
function encontrarMaximo(numeros) {
  let max = numeros[0];
  for (let num of numeros) {
    if (num > max) max = num;
  }
  return max;
}

// Função 3
function tabuadaDoArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j <= 10; j++) {
      console.log(arr[i] * j);
    }
  }
}

// Função 4
function contarPares(arr) {
  let count = 0;
  for (let num of arr) {
    if (num % 2 === 0) count++;
  }
  return count;
}

// Função 5 — DESAFIO
function misterio(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        console.log(arr[i], arr[j], arr[k]);
      }
    }
  }
}
```

> 🔎 Respostas na [seção 7](#7-gabarito-comentado).

---

# 6. Exercícios Distribuídos

> Esta seção reúne exercícios adicionais de integração entre os temas da aula. Tente resolver sem olhar o gabarito.

---

## 📝 Exercício 5 — Integração: Referência + Funções

```js
function aplicarDesconto(produto, percentual) {
  produto.preco = produto.preco * (1 - percentual / 100);
  return produto;
}

let notebook = { nome: "Dell XPS", preco: 5000 };
let promoção = aplicarDesconto(notebook, 10);

console.log(notebook.preco);   // ??? (A)
console.log(promoção.preco);   // ??? (B)
console.log(notebook === promoção); // ??? (C)
```

**Pergunta bônus:** Como você reescreveria `aplicarDesconto` para não modificar o objeto original?

---

## 📝 Exercício 6 — Optional Chaining + Nullish Coalescing

```js
let resposta = {
  status: 200,
  dados: {
    usuarios: [
      { id: 1, nome: "Alice", perfil: { bio: "Dev fullstack" } },
      { id: 2, nome: "Bob" } // sem perfil
    ]
  }
};

let bio1 = resposta.dados?.usuarios?.[0]?.perfil?.bio ?? "Sem bio";
let bio2 = resposta.dados?.usuarios?.[1]?.perfil?.bio ?? "Sem bio";
let bio3 = resposta.dados?.usuarios?.[5]?.perfil?.bio ?? "Sem bio";

console.log(bio1); // ??? (A)
console.log(bio2); // ??? (B)
console.log(bio3); // ??? (C)
```

---

## 📝 Exercício 7 — Shallow vs Deep: Identifique o Bug

Esse código tem um bug sutil. Identifique-o e proponha a correção:

```js
function adicionarFavorito(estadoAtual, novoFavorito) {
  // Intenção: retornar um NOVO estado sem modificar o original
  let novoEstado = { ...estadoAtual };
  novoEstado.favoritos.push(novoFavorito);
  return novoEstado;
}

let estado = {
  usuario: "Carlos",
  favoritos: ["JavaScript", "Node.js"]
};

let novoEstado = adicionarFavorito(estado, "TypeScript");

console.log(estado.favoritos);    // O que aparece aqui?
console.log(novoEstado.favoritos); // E aqui?
```

---

## 📝 Exercício 8 — Big O na Prática

Você precisa verificar se dois arrays têm algum elemento em comum. Alguém escreveu essa solução:

```js
function temElementoComum(arr1, arr2) {
  for (let item1 of arr1) {
    for (let item2 of arr2) {
      if (item1 === item2) return true;
    }
  }
  return false;
}
```

**Perguntas:**
1. Qual é a complexidade desta solução?
2. Como você a otimizaria para O(n)?
3. (Bônus) Se `arr1` tem 1.000 itens e `arr2` tem 2.000, quantas comparações pode fazer no pior caso?

---

# 7. Gabarito Comentado

---

## ✅ Exercício 1 — Referência vs Valor

**Parte A:**
```
A1: 5
A2: 6
```
**Por quê?** `y = x` copia o valor `5`. São variáveis independentes. Incrementar `y` não afeta `x`.

**Parte B:**
```
B1: 2500
B2: 2500
```
**Por quê?** `desconto = produto` copia a referência. Ambas apontam para o mesmo objeto. Modificar `desconto.preco` é modificar o objeto original.

**Parte C:**
```
C1: 4
C2: 4
```
**Por quê?** Arrays são objetos. `arr2 = arr1` copia a referência. `arr2.push(4)` modifica o mesmo array que `arr1` referencia. Ambos passam a ter 4 elementos.

---

## ✅ Exercício 2 — Optional Chaining

```
A: "Lucas"            // cliente.nome existe
B: undefined          // cliente.endereco não existe, ?. retorna undefined
C: undefined          // pagamento não existe
D: "Camiseta"         // itens[0].produto existe
E: undefined          // itens[5] não existe, ?. retorna undefined
F: "CEP não cadastrado" // endereco não existe → ?. retorna undefined → ?? usa o fallback
```

---

## ✅ Exercício 3 — Shallow vs Deep Copy

**Cenário A:**
```
A1: "Mariana"  // cliente é primitivo (string), spread copiou o valor — não afetado
A2: 99         // itens é array de objetos — spread copiou a referência do array
               // itens[0] ainda é o mesmo objeto → qty foi modificado no original!
```

**Cenário B** (lembrando que `pedido.itens[0].qty` já é `99` depois do cenário A):
```
B1: "Mariana"  // structuredClone é deep copy → modificar copiaB.cliente não afeta pedido
B2: 99         // structuredClone copia profundamente → copiaB.itens[0] é objeto independente
               // modificar copiaB.itens[0].qty = 50 NÃO afeta pedido.itens[0].qty
               // pedido.itens[0].qty ainda é 99 (modificado pelo cenário A, não pelo B)
```

> 💡 O exercício tem esse "pulo do gato" proposital: mostrar que o Cenário A deixou um rastro que afeta o estado de `pedido` para os testes seguintes.

---

## ✅ Exercício 4 — Big O

**Função 1:** O(1)
- Uma única operação matemática. Não depende de nenhum n.

**Função 2:** O(n)
- Um único `for` que percorre o array inteiro. Proporcional ao tamanho.

**Função 3:** O(n)
- Parece O(n²) por ter loop aninhado, mas o loop interno sempre executa **10 vezes** (constante). Não depende de `n`. `O(n * 10) = O(n)`.

**Função 4:** O(n)
- Um único `for`. Simples.

**Função 5 (desafio):** O(n³)
- Três loops aninhados, cada um de tamanho `n`. `O(n * n * n) = O(n³)`. Com 100 itens: 1.000.000 operações. Com 1.000: 1.000.000.000 operações. 🚨

---

## ✅ Exercício 5 — Referência + Funções

```
A: 4500  // produto.preco foi modificado DENTRO da função
B: 4500  // promoção é o mesmo objeto que notebook
C: true  // a função retornou o mesmo objeto que recebeu!
```

**Resposta bônus — como não modificar o original:**

```js
function aplicarDesconto(produto, percentual) {
  // Cria um novo objeto em vez de modificar o original
  return {
    ...produto,
    preco: produto.preco * (1 - percentual / 100)
  };
}
```

Agora `notebook` fica intacto e `promoção` é um objeto novo.

---

## ✅ Exercício 6 — Optional Chaining + Nullish Coalescing

```
A: "Dev fullstack"   // Alice tem perfil e bio
B: "Sem bio"         // Bob não tem perfil → perfil?.bio = undefined → ?? usa fallback
C: "Sem bio"         // usuarios[5] não existe → undefined → ?? usa fallback
```

---

## ✅ Exercício 7 — Bug no Shallow Copy

**O que aparece:**
```
estado.favoritos:    ["JavaScript", "Node.js", "TypeScript"] 😱
novoEstado.favoritos: ["JavaScript", "Node.js", "TypeScript"]
```

**O bug:** O spread `{ ...estadoAtual }` faz uma cópia rasa. `favoritos` é um array (objeto) — apenas a referência foi copiada. Quando `novoEstado.favoritos.push(...)` executa, modifica o mesmo array que `estado.favoritos` referencia.

**A correção:**

```js
function adicionarFavorito(estadoAtual, novoFavorito) {
  return {
    ...estadoAtual,
    favoritos: [...estadoAtual.favoritos, novoFavorito] // cria novo array
  };
}
```

Agora `favoritos` do novo estado é um array novo, não uma referência ao original.

---

## ✅ Exercício 8 — Big O na Prática

**Resposta 1:** O(n * m), onde n e m são os tamanhos dos dois arrays. No pior caso (sem elementos em comum), compara cada item de arr1 com cada item de arr2.

**Resposta 2 — Solução O(n):**

```js
function temElementoComum(arr1, arr2) {
  const set1 = new Set(arr1); // O(n) para criar
  for (let item of arr2) {    // O(m)
    if (set1.has(item)) return true; // O(1) para verificar no Set
  }
  return false;
}
// Total: O(n + m) — linear!
```

**Resposta 3 (bônus):** 1.000 × 2.000 = **2.000.000 comparações** no pior caso para a solução O(n²). Com a solução O(n): apenas ~3.000 operações.

---

# 8. Conclusão

## Conectando os Pontos

Os quatro temas de hoje não são ilhas separadas — eles se encontram constantemente no código real:

```js
// Exemplo que usa TUDO que aprendemos hoje:

function processarPedido(pedidoOriginal) {
  // 1. Deep copy para não modificar o original (Referência + Deep Copy)
  let pedido = structuredClone(pedidoOriginal);

  // 2. Optional chaining para acessar dados que podem não existir
  let desconto = pedido.cliente?.vip ? 0.15 : 0;
  let cep = pedido.cliente?.endereco?.cep ?? "não informado";

  // 3. Processar itens — O(n): proporcional ao número de itens
  let total = 0;
  for (let item of pedido.itens) {
    total += item.preco * item.quantidade;
  }

  // 4. Retorna novo objeto sem modificar o original
  return {
    ...pedido,
    cep,
    total: total * (1 - desconto),
    processadoEm: new Date().toISOString()
  };
}
```

---

## O Que Cada Conceito Resolve

| Conceito | Problema que resolve |
|---|---|
| **Referência vs Valor** | Bugs silenciosos de mutação acidental |
| **Optional Chaining** | Crashes ao acessar dados ausentes de APIs |
| **Deep Copy** | Estado corrompido em aplicações |
| **Big O** | Performance que não escala em produção |

---

## Reflexão Final

> "Todo programador iniciante escreve código que funciona. O programador experiente escreve código que **não quebra em condições inesperadas**, **não corrompe dados**, e **não trava com entradas grandes**."

Os conceitos de hoje são o que separa código que funciona no seu computador de código que funciona na produção — com dados reais, volumes reais e usuários reais.

---

## Próximos Passos Sugeridos

- Pratique criando funções **puras** (que não modificam os argumentos)
- Experimente os exemplos com `console.log` no seu ambiente
- Antes de otimizar, sempre meça: use `performance.now()` para comparar soluções
- Explore: `Array.prototype.map`, `filter`, `reduce` — todos retornam novos arrays (imutabilidade por design)
