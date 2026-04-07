# 📋 Validação de Formulários com JavaScript

---

## 🎯 Objetivos de Aprendizagem

Ao final desta aula, o aluno será capaz de:

- Entender **por que** validação de formulários existe e onde ela se aplica
- Usar os **atributos HTML nativos** de validação com consciência das limitações
- **Capturar e interceptar** o envio de um formulário com JavaScript
- **Validar campos** (vazio, e-mail, senha) com lógica própria
- **Exibir mensagens de erro** dinâmicas na interface
- Aplicar **boas práticas de UX** com feedback em tempo real

---

## 💡 Contexto Inicial

### Por que validar formulários?

Antes de qualquer código, pense: *o que acontece se o usuário deixar o campo de e-mail em branco e clicar em "Enviar"?*

Existem **3 razões principais** para validar:

**1. UX (Experiência do Usuário)**
O usuário precisa de feedback claro. Sem validação, ele não sabe o que errou.

**2. Dados corretos no banco**
Sem validação, um campo "idade" pode receber `"banana"`. Isso quebra sistemas.

**3. Segurança** *(atenção: isso é só a primeira linha de defesa!)*
Validação no front-end não substitui validação no back-end. Mas evita envios inúteis e protege contra erros comuns.

> 🧠 **Pergunta para a turma:** "Vocês já preencheram um formulário, clicaram em enviar e nada aconteceu? Como foi essa experiência?"

---

## 🧩 Parte 1 — Validação com HTML Nativo

O HTML já possui atributos prontos para validação. São rápidos e fáceis, mas têm limites.

### Principais atributos

```html
<!-- required: campo obrigatório -->
<input type="text" required>

<!-- minlength / maxlength: controle de tamanho de texto -->
<input type="text" minlength="3" maxlength="50">

<!-- type: define o tipo do dado esperado -->
<input type="email">   <!-- valida formato de e-mail -->
<input type="number">  <!-- aceita só números -->
<input type="date">    <!-- exibe seletor de data -->

<!-- pattern: expressão regular customizada -->
<!-- Exemplo: apenas letras, sem espaço, 3 a 10 caracteres -->
<input type="text" pattern="[A-Za-z]{3,10}">
```

### Exemplo prático completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Validação HTML</title>
</head>
<body>

  <form>
    <label for="nome">Nome:</label>
    <input
      type="text"
      id="nome"
      name="nome"
      required
      minlength="3"
      maxlength="50"
      placeholder="Seu nome completo"
    >

    <label for="email">E-mail:</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="seu@email.com"
    >

    <label for="idade">Idade:</label>
    <input
      type="number"
      id="idade"
      name="idade"
      min="1"
      max="120"
    >

    <button type="submit">Enviar</button>
  </form>

</body>
</html>
```

> 🔍 **Demonstração ao vivo:** Abrir no navegador, tentar enviar com campos inválidos e mostrar as mensagens padrão do browser.

### ⚠️ Limitações da validação nativa

| Limitação | Motivo |
|---|---|
| Mensagens de erro padrão do browser | Cada navegador exibe de um jeito diferente |
| Sem customização visual | Não dá para estilizar os balões de erro facilmente |
| Sem lógica condicional | Não dá para validar "confirmar senha" ou dependências entre campos |
| Pode ser burlada | O atributo `novalidate` no form ou via DevTools desativa tudo |

**Conclusão:** HTML nativo é ótimo para um primeiro filtro, mas precisamos de JavaScript para validações robustas e com boa UX.

---

## ⚙️ Parte 2 — Introdução à Validação com JavaScript

### Capturando o formulário

```html
<form id="meuForm">
  <input type="text" id="nome" placeholder="Seu nome">
  <button type="submit">Enviar</button>
</form>
```

```javascript
// 1. Selecionar o formulário pelo ID
const form = document.getElementById('meuForm');

// 2. Escutar o evento 'submit'
form.addEventListener('submit', function(event) {

  // 3. Impedir o comportamento padrão (recarregar a página)
  event.preventDefault();

  console.log('Formulário interceptado! Agora posso validar.');
});
```

> 🧠 **Por que `preventDefault()`?**
> Por padrão, ao clicar em "Enviar", o browser recarrega a página. Com `preventDefault()`, você assume o controle e pode rodar sua lógica antes.

### Acessando os valores dos campos

```javascript
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Capturando o valor de um input
  const nome = document.getElementById('nome').value;

  // .value retorna sempre uma string
  console.log('Nome digitado:', nome);

  // Remover espaços extras das bordas (boa prática!)
  const nomeFormatado = nome.trim();
  console.log('Nome sem espaços extras:', nomeFormatado);
});
```

> 🔍 **Demonstração:** Abrir console do browser e mostrar os valores sendo capturados em tempo real.

---

## 🔎 Parte 3 — Validação Prática com JavaScript

Agora vamos validar de verdade. A estrutura será sempre a mesma:

1. Pegar o valor do campo
2. Verificar se está válido
3. Mostrar ou esconder mensagem de erro

### Estrutura base do HTML

```html
<form id="meuForm" novalidate>

  <div class="campo">
    <label for="nome">Nome:</label>
    <input type="text" id="nome" placeholder="Seu nome">
    <!-- Elemento onde a mensagem de erro vai aparecer -->
    <span class="erro" id="erro-nome"></span>
  </div>

  <div class="campo">
    <label for="email">E-mail:</label>
    <input type="email" id="email" placeholder="seu@email.com">
    <span class="erro" id="erro-email"></span>
  </div>

  <div class="campo">
    <label for="senha">Senha:</label>
    <input type="password" id="senha" placeholder="Mínimo 6 caracteres">
    <span class="erro" id="erro-senha"></span>
  </div>

  <button type="submit">Cadastrar</button>

</form>
```

> 💡 `novalidate` no form desativa a validação nativa do HTML — assim só o JS controla.

### Validando campo vazio

```javascript
function validarNome() {
  const input = document.getElementById('nome');
  const erro = document.getElementById('erro-nome');
  const valor = input.value.trim(); // trim() remove espaços das bordas

  if (valor === '') {
    // Exibir erro
    erro.innerText = 'O nome é obrigatório.';
    input.classList.add('input-invalido');
    input.classList.remove('input-valido');
    return false; // campo inválido
  }

  if (valor.length < 3) {
    erro.innerText = 'O nome deve ter pelo menos 3 caracteres.';
    input.classList.add('input-invalido');
    input.classList.remove('input-valido');
    return false;
  }

  // Tudo certo: limpar erro e marcar como válido
  erro.innerText = '';
  input.classList.remove('input-invalido');
  input.classList.add('input-valido');
  return true; // campo válido
}
```

### Validando e-mail com regex

```javascript
function validarEmail() {
  const input = document.getElementById('email');
  const erro = document.getElementById('erro-email');
  const valor = input.value.trim();

  // Expressão regular para e-mail (padrão simples e eficaz)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor === '') {
    erro.innerText = 'O e-mail é obrigatório.';
    input.classList.add('input-invalido');
    input.classList.remove('input-valido');
    return false;
  }

  if (!regexEmail.test(valor)) {
    // .test() retorna true se o valor bate com o padrão, false se não bate
    erro.innerText = 'Digite um e-mail válido. Ex: nome@dominio.com';
    input.classList.add('input-invalido');
    input.classList.remove('input-valido');
    return false;
  }

  erro.innerText = '';
  input.classList.remove('input-invalido');
  input.classList.add('input-valido');
  return true;
}
```

### Validando senha com regras

```javascript
function validarSenha() {
  const input = document.getElementById('senha');
  const erro = document.getElementById('erro-senha');
  const valor = input.value; // Senha: NÃO usar trim() — espaços podem ser intencionais

  if (valor === '') {
    erro.innerText = 'A senha é obrigatória.';
    input.classList.add('input-invalido');
    input.classList.remove('input-valido');
    return false;
  }

  if (valor.length < 6) {
    erro.innerText = 'A senha deve ter pelo menos 6 caracteres.';
    input.classList.add('input-invalido');
    input.classList.remove('input-valido');
    return false;
  }

  erro.innerText = '';
  input.classList.remove('input-invalido');
  input.classList.add('input-valido');
  return true;
}
```

### Unindo tudo no submit

```javascript
const form = document.getElementById('meuForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Executar todas as validações
  const nomeValido = validarNome();
  const emailValido = validarEmail();
  const senhaValida = validarSenha();

  // Só prosseguir se TUDO for válido
  if (nomeValido && emailValido && senhaValida) {
    console.log('Formulário válido! Pode enviar para o servidor.');
    alert('Cadastro realizado com sucesso!');
    form.reset(); // Limpar o formulário
  }
});
```

---

## ✨ Parte 4 — Melhorando a UX

Validar só no submit é funcional, mas não é a melhor experiência. O ideal é dar **feedback enquanto o usuário digita ou sai do campo**.

### Feedback em tempo real

```javascript
// 'input': dispara a cada tecla pressionada
document.getElementById('nome').addEventListener('input', validarNome);

// 'blur': dispara quando o usuário sai do campo (perde o foco)
// Ideal para não frustrar enquanto ainda está digitando
document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('senha').addEventListener('blur', validarSenha);
```

> 🧠 **Quando usar `input` vs `blur`?**
> - `input`: bom para feedback imediato em campos simples (ex: "campo obrigatório")
> - `blur`: melhor para validações complexas (ex: e-mail, senha) — não interrompe enquanto a pessoa escreve

### CSS para feedback visual

```css
/* Estado padrão */
input {
  border: 2px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
}

/* Campo com erro */
input.input-invalido {
  border-color: #e53e3e; /* vermelho */
  background-color: #fff5f5;
}

/* Campo válido */
input.input-valido {
  border-color: #38a169; /* verde */
  background-color: #f0fff4;
}

/* Mensagem de erro */
.erro {
  display: block;
  color: #e53e3e;
  font-size: 13px;
  margin-top: 4px;
  min-height: 18px; /* evita "pulo" no layout quando aparece */
}
```

### Boas práticas de usabilidade

- ✅ **Sempre** mostrar mensagens de erro próximas ao campo com problema
- ✅ **Nunca** só usar cor para indicar erro (adicionar ícone ou texto também)
- ✅ **Limpar** o erro quando o usuário corrigir o campo
- ✅ Usar `aria-describedby` para acessibilidade (usuários de leitores de tela)
- ❌ **Não** limpar os campos já preenchidos corretamente quando der erro em outro
- ❌ **Não** exibir todos os erros de uma vez logo no carregamento da página

---

## 💻 Parte 5 — Exercício Guiado (Live Coding)

### Proposta da atividade

Construir do zero um formulário de cadastro com:
- Campo **Nome** (obrigatório, mínimo 3 caracteres)
- Campo **E-mail** (obrigatório, formato válido)
- Campo **Senha** (obrigatório, mínimo 6 caracteres)

### Passo a passo

**Passo 1 — Estrutura HTML**
```html
<!-- Criar o arquivo index.html com o form base -->
<!-- Adicionar os spans de erro -->
<!-- Adicionar novalidate no form -->
```

**Passo 2 — CSS básico**
```css
/* Adicionar estilos para .erro, .input-valido, .input-invalido */
```

**Passo 3 — JavaScript: capturar o submit**
```javascript
// Selecionar o form
// Adicionar addEventListener('submit', ...)
// Testar com console.log e preventDefault()
```

**Passo 4 — Criar a função validarNome()**
```javascript
// Verificar vazio
// Verificar length
// Mostrar/esconder erro
// Retornar true/false
```

**Passo 5 — Criar validarEmail() e validarSenha()**
```javascript
// Mesmo padrão da função anterior
// Adicionar regex para e-mail
```

**Passo 6 — Unir no submit**
```javascript
// Chamar as 3 funções
// Verificar se todas retornam true
// Exibir mensagem de sucesso
```

**Passo 7 — Adicionar feedback no blur**
```javascript
// Adicionar eventos blur nos campos
// Testar a experiência
```

> ⏱️ **Tempo estimado por passo:** 5–8 minutos cada. Pausar e tirar dúvidas entre os passos.

---

## 🚀 Parte 6 — Desafios Extras (se sobrar tempo)

### Desafio 1: Confirmar senha

```javascript
function validarConfirmarSenha() {
  const senha = document.getElementById('senha').value;
  const confirmacao = document.getElementById('confirmar-senha').value;
  const erro = document.getElementById('erro-confirmar-senha');

  if (confirmacao === '') {
    erro.innerText = 'Confirme sua senha.';
    return false;
  }

  if (senha !== confirmacao) {
    erro.innerText = 'As senhas não coincidem.';
    return false;
  }

  erro.innerText = '';
  return true;
}
```

### Desafio 2: Senha mais forte com regex

```javascript
function validarSenhaForte() {
  const valor = document.getElementById('senha').value;
  const erro = document.getElementById('erro-senha');

  // Regras:
  // - Pelo menos 8 caracteres
  // - Pelo menos uma letra maiúscula
  // - Pelo menos um número

  if (valor.length < 8) {
    erro.innerText = 'Mínimo de 8 caracteres.';
    return false;
  }

  if (!/[A-Z]/.test(valor)) {
    // /[A-Z]/ verifica se existe pelo menos uma letra maiúscula
    erro.innerText = 'Deve conter pelo menos uma letra maiúscula.';
    return false;
  }

  if (!/[0-9]/.test(valor)) {
    // /[0-9]/ verifica se existe pelo menos um número
    erro.innerText = 'Deve conter pelo menos um número.';
    return false;
  }

  erro.innerText = '';
  return true;
}
```

### Desafio 3: Desabilitar botão até o form estar válido

```javascript
const btn = document.getElementById('btn-submit');

// Começa desabilitado
btn.disabled = true;

// A cada tecla em qualquer campo, verificar se tudo está ok
form.addEventListener('input', function() {
  const nomeOk = document.getElementById('nome').value.trim().length >= 3;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value);
  const senhaOk = document.getElementById('senha').value.length >= 6;

  // Habilitar botão somente se tudo estiver válido
  btn.disabled = !(nomeOk && emailOk && senhaOk);
});
```

---

## 📄 Código Completo Final

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulário com Validação JS</title>
  <style>
    /* === Reset e base === */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f0f4f8;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    /* === Card do formulário === */
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    h1 {
      font-size: 22px;
      color: #1a202c;
      margin-bottom: 24px;
      text-align: center;
    }

    /* === Campos === */
    .campo {
      margin-bottom: 20px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 6px;
    }

    input {
      width: 100%;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    input:focus {
      border-color: #667eea;
    }

    /* === Estados de validação === */
    input.input-invalido {
      border-color: #fc8181;
      background-color: #fff5f5;
    }

    input.input-valido {
      border-color: #68d391;
      background-color: #f0fff4;
    }

    /* === Mensagens de erro === */
    .erro {
      display: block;
      color: #e53e3e;
      font-size: 12px;
      margin-top: 5px;
      min-height: 18px;
    }

    /* === Botão === */
    button {
      width: 100%;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
      margin-top: 8px;
    }

    button:hover:not(:disabled) {
      background: #5a67d8;
    }

    button:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }

    /* === Mensagem de sucesso === */
    .sucesso {
      display: none;
      background: #c6f6d5;
      color: #276749;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      font-weight: 600;
      margin-top: 16px;
    }
  </style>
</head>
<body>

  <div class="card">
    <h1>📋 Cadastro</h1>

    <form id="meuForm" novalidate>

      <div class="campo">
        <label for="nome">Nome</label>
        <input type="text" id="nome" placeholder="Seu nome completo">
        <span class="erro" id="erro-nome"></span>
      </div>

      <div class="campo">
        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="seu@email.com">
        <span class="erro" id="erro-email"></span>
      </div>

      <div class="campo">
        <label for="senha">Senha</label>
        <input type="password" id="senha" placeholder="Mínimo 6 caracteres">
        <span class="erro" id="erro-senha"></span>
      </div>

      <button type="submit" id="btn-submit">Cadastrar</button>

    </form>

    <div class="sucesso" id="msg-sucesso">
      ✅ Cadastro realizado com sucesso!
    </div>
  </div>

  <script>
    // =============================================
    // REFERÊNCIAS AOS ELEMENTOS
    // =============================================
    const form = document.getElementById('meuForm');
    const btnSubmit = document.getElementById('btn-submit');
    const msgSucesso = document.getElementById('msg-sucesso');

    // =============================================
    // FUNÇÕES DE VALIDAÇÃO
    // =============================================

    function validarNome() {
      const input = document.getElementById('nome');
      const erro = document.getElementById('erro-nome');
      const valor = input.value.trim();

      if (valor === '') {
        mostrarErro(input, erro, 'O nome é obrigatório.');
        return false;
      }

      if (valor.length < 3) {
        mostrarErro(input, erro, 'O nome deve ter pelo menos 3 caracteres.');
        return false;
      }

      limparErro(input, erro);
      return true;
    }

    function validarEmail() {
      const input = document.getElementById('email');
      const erro = document.getElementById('erro-email');
      const valor = input.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (valor === '') {
        mostrarErro(input, erro, 'O e-mail é obrigatório.');
        return false;
      }

      if (!regex.test(valor)) {
        mostrarErro(input, erro, 'Digite um e-mail válido. Ex: nome@dominio.com');
        return false;
      }

      limparErro(input, erro);
      return true;
    }

    function validarSenha() {
      const input = document.getElementById('senha');
      const erro = document.getElementById('erro-senha');
      const valor = input.value;

      if (valor === '') {
        mostrarErro(input, erro, 'A senha é obrigatória.');
        return false;
      }

      if (valor.length < 6) {
        mostrarErro(input, erro, 'A senha deve ter pelo menos 6 caracteres.');
        return false;
      }

      limparErro(input, erro);
      return true;
    }

    // =============================================
    // FUNÇÕES AUXILIARES (reutilizadas por todos os campos)
    // =============================================

    function mostrarErro(input, erroEl, mensagem) {
      erroEl.innerText = mensagem;
      input.classList.add('input-invalido');
      input.classList.remove('input-valido');
    }

    function limparErro(input, erroEl) {
      erroEl.innerText = '';
      input.classList.remove('input-invalido');
      input.classList.add('input-valido');
    }

    // =============================================
    // FEEDBACK EM TEMPO REAL (evento blur)
    // =============================================
    document.getElementById('nome').addEventListener('blur', validarNome);
    document.getElementById('email').addEventListener('blur', validarEmail);
    document.getElementById('senha').addEventListener('blur', validarSenha);

    // =============================================
    // ENVIO DO FORMULÁRIO
    // =============================================
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Validar todos os campos
      const nomeValido   = validarNome();
      const emailValido  = validarEmail();
      const senhaValida  = validarSenha();

      if (nomeValido && emailValido && senhaValida) {
        // Exibir mensagem de sucesso
        msgSucesso.style.display = 'block';
        form.reset();

        // Limpar classes de validação após reset
        document.querySelectorAll('input').forEach(function(el) {
          el.classList.remove('input-valido', 'input-invalido');
        });

        // Esconder mensagem após 4 segundos
        setTimeout(function() {
          msgSucesso.style.display = 'none';
        }, 4000);
      }
    });
  </script>

</body>
</html>
```

---

## 🎓 Dicas de Professor

### Pontos de atenção durante a aula

- **Pausar no `preventDefault()`** — É o conceito mais confuso para iniciantes. Demonstrar na prática o que acontece com e sem ele (a página recarrega vs. não recarrega).
- **Mostrar o DevTools aberto** — Deixar o console sempre visível. Ajuda os alunos a visualizarem os `console.log()` sendo disparados.
- **Escrever as funções aos poucos** — Não colar o código completo de uma vez. Construir junto, linha por linha, explicando cada decisão.
- **O padrão "retornar true/false"** — Explicar bem essa convenção antes. É ela que permite unir as validações no submit com `if (a && b && c)`.

---

### ❌ Erros comuns dos alunos

| Erro | O que acontece | Como corrigir |
|---|---|---|
| Esquecer `.trim()` | `" "` (espaço) passa na validação de campo vazio | Sempre usar `.trim()` antes de verificar |
| Usar `.trim()` na senha | Senhas com espaços são cortadas | Senha é o único caso onde NÃO se usa trim |
| Esquecer `return false` | A função não comunica que falhou | Mostrar que o `if` no submit depende disso |
| Confundir `innerText` com `innerHTML` | Funciona, mas `innerHTML` pode abrir brechas de segurança | Preferir sempre `innerText` para textos simples |
| Não colocar `novalidate` no form | Validação nativa e do JS conflitam | Explicar o papel do atributo |

---

### 💬 Perguntas para engajar a turma

- *"Qual é a diferença entre validar no front-end e no back-end? Os dois são necessários?"*
- *"O que acontece se um usuário desabilitar o JavaScript no navegador? Nossas validações ainda funcionam?"*
- *"Vocês preferem ver o erro enquanto digitam ou só ao clicar em 'Enviar'? Depende do campo?"*
- *"Por que guardamos `true` ou `false` em variáveis antes do `if`? Por que não chamar as funções direto no `if`?"*
- *"Como faríamos para mostrar todos os erros de uma vez em vez de um por um?"*
