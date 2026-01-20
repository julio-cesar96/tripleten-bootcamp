# Material de Apoio: HTML e CSS Avançado

Este material complementa a aula prática e serve como referência para consulta sobre os conceitos fundamentais utilizados no desenvolvimento de landing pages modernas.

---

## 1. Formulários HTML

### O que são formulários?

Formulários são interfaces que permitem aos usuários enviar dados para um servidor ou aplicação. São compostos por diversos tipos de campos de entrada (inputs) que coletam informações específicas.

### Anatomia de um formulário

```html
<form action="destino-dos-dados" method="metodo-de-envio">
    <!-- campos do formulário -->
</form>
```

**Atributos principais:**
- `action`: Define para onde os dados serão enviados (URL de um servidor, email com mailto:, etc)
- `method`: Define como os dados serão enviados (GET ou POST)
- `enctype`: Define como os dados serão codificados (necessário para upload de arquivos)

### Tipos de input e seus usos

#### Input de texto (`type="text"`)
Campo genérico para texto curto (nome, endereço, etc).

```html
<input type="text" name="nome" placeholder="Digite seu nome">
```

#### Input de email (`type="email"`)
Campo otimizado para endereços de email. Navegadores validam automaticamente o formato (deve conter @ e domínio).

```html
<input type="email" name="email" placeholder="exemplo@email.com">
```

**Benefícios:**
- Validação automática do formato
- Teclado otimizado em dispositivos móveis (mostra @ facilmente)
- Preenchimento automático de emails salvos

#### Input de telefone (`type="tel"`)
Campo para números de telefone.

```html
<input type="tel" name="telefone" placeholder="(00) 00000-0000">
```

**Nota:** Não valida formato automaticamente. Para validar, use o atributo `pattern`.

#### Input de senha (`type="password"`)
Campo que oculta o texto digitado.

```html
<input type="password" name="senha">
```

#### Input de número (`type="number"`)
Campo para valores numéricos com controles de incremento/decremento.

```html
<input type="number" name="idade" min="18" max="120" step="1">
```

**Atributos úteis:**
- `min`: valor mínimo aceito
- `max`: valor máximo aceito
- `step`: incremento dos controles (ex: step="0.5" permite decimais)

#### Textarea
Campo para texto longo/múltiplas linhas.

```html
<textarea name="mensagem" rows="5" cols="50"></textarea>
```

**Atributos:**
- `rows`: número de linhas visíveis
- `cols`: largura em caracteres
- `resize`: controla se usuário pode redimensionar (via CSS)

#### Select (dropdown)
Menu suspenso com opções predefinidas.

```html
<select name="estado">
    <option value="">Selecione...</option>
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
    <option value="mg">Minas Gerais</option>
</select>
```

#### Checkbox
Caixas de seleção (múltiplas opções possíveis).

```html
<input type="checkbox" name="newsletter" id="newsletter" value="sim">
<label for="newsletter">Quero receber newsletter</label>
```

#### Radio buttons
Botões de opção (apenas uma seleção possível por grupo).

```html
<input type="radio" name="plano" value="basico" id="basico">
<label for="basico">Básico</label>

<input type="radio" name="plano" value="premium" id="premium">
<label for="premium">Premium</label>
```

**Importante:** Todos os radio buttons do mesmo grupo devem ter o mesmo `name`.

### Validação HTML5

A validação HTML5 permite criar regras sem JavaScript, diretamente nos elementos HTML.

#### Atributo `required`
Torna o campo obrigatório.

```html
<input type="text" name="nome" required>
```

**Comportamento:** Navegador impede envio do formulário se campo estiver vazio.

#### Atributo `minlength` e `maxlength`
Define quantidade mínima e máxima de caracteres.

```html
<input type="text" name="usuario" minlength="3" maxlength="20">
```

#### Atributo `min` e `max`
Define valores mínimos e máximos para campos numéricos e datas.

```html
<input type="number" name="idade" min="18" max="100">
<input type="date" name="nascimento" min="1900-01-01" max="2006-01-01">
```

#### Atributo `pattern`
Valida o valor usando expressões regulares (regex).

```html
<!-- Valida telefone brasileiro (11 dígitos) -->
<input type="tel" pattern="[0-9]{11}" title="Digite 11 dígitos">

<!-- Valida CEP -->
<input type="text" pattern="[0-9]{5}-[0-9]{3}" title="Formato: 00000-000">

<!-- Valida CPF -->
<input type="text" pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}" title="Formato: 000.000.000-00">
```

**Explicação do pattern:**
- `[0-9]` = qualquer dígito de 0 a 9
- `{11}` = exatamente 11 ocorrências
- `\.` = ponto literal (\ escapa caracteres especiais)
- `-` = hífen literal

#### Atributo `title`
Define mensagem de ajuda que aparece ao usuário quando validação falha.

```html
<input type="text" pattern="[A-Z]{2}[0-9]{4}" 
       title="Digite 2 letras maiúsculas seguidas de 4 números">
```

### Labels e acessibilidade

Labels conectam texto descritivo aos campos do formulário.

```html
<!-- Método 1: usando atributo 'for' -->
<label for="email">E-mail:</label>
<input type="email" id="email" name="email">

<!-- Método 2: envolvendo o input -->
<label>
    E-mail:
    <input type="email" name="email">
</label>
```

**Benefícios:**
- Usuários podem clicar no label para focar no campo
- Leitores de tela associam o texto ao campo
- Melhora UX em dispositivos touch (área clicável maior)

### Placeholder vs Label

```html
<!-- ❌ Errado: apenas placeholder -->
<input type="text" placeholder="Digite seu nome">

<!-- ✅ Correto: label + placeholder -->
<label for="nome">Nome:</label>
<input type="text" id="nome" placeholder="Ex: João Silva">
```

**Diferença:**
- **Label:** Descrição permanente do campo, sempre visível
- **Placeholder:** Dica/exemplo que desaparece ao digitar

**Regra:** Sempre use label. Placeholder é opcional e complementar.

### Formulário funcional com apenas HTML

Para criar um formulário que funcione apenas com HTML (sem backend), a opção mais simples é usar `mailto:`:

```html
<form action="mailto:seuemail@exemplo.com" method="post" enctype="text/plain">
    <input type="text" name="nome" required>
    <input type="email" name="email" required>
    <textarea name="mensagem" required></textarea>
    <button type="submit">Enviar</button>
</form>
```

**Limitações do mailto:**
- Abre o cliente de email do usuário (Outlook, Gmail, etc)
- Não funciona se usuário não tiver cliente configurado
- Formato dos dados não é amigável
- Não é profissional para sites reais

**Alternativas sem backend:**
- Formspree (serviço gratuito/pago)
- Netlify Forms (para sites hospedados na Netlify)
- Google Forms (incorporado via iframe)
- EmailJS (JavaScript para envio via email)

---

## 2. Metodologia BEM (Block Element Modifier)

### O que é BEM?

BEM é uma convenção de nomenclatura para classes CSS que torna o código mais organizado, escalável e fácil de manter. Foi criada pela equipe do Yandex (Google russo).

### Estrutura BEM

BEM divide a interface em três conceitos:

#### 1. Block (Bloco)
Componente independente e reutilizável.

```html
<div class="card">...</div>
<nav class="menu">...</nav>
<form class="form">...</form>
```

**Características:**
- Nome descreve seu propósito (card, menu, button)
- Pode existir sozinho em qualquer lugar da página
- Não depende de outros elementos

#### 2. Element (Elemento)
Parte do bloco que não faz sentido sozinha.

```html
<div class="card">
    <h3 class="card__title">Título</h3>
    <p class="card__text">Texto</p>
    <button class="card__button">Ação</button>
</div>
```

**Nomenclatura:** `bloco__elemento` (dois underscores)

**Características:**
- Sempre está dentro de um bloco
- Nome descreve seu propósito, não aparência (card__title não card__big-text)
- Não deve ter elementos aninhados (card__header__title ❌)

#### 3. Modifier (Modificador)
Variação do bloco ou elemento.

```html
<!-- Modificador no bloco -->
<div class="card card--destaque">...</div>
<button class="button button--large">...</button>

<!-- Modificador no elemento -->
<div class="card">
    <button class="card__button card__button--primary">Confirmar</button>
    <button class="card__button card__button--secondary">Cancelar</button>
</div>
```

**Nomenclatura:** `bloco--modificador` (dois hifens)

**Características:**
- Define aparência, estado ou comportamento
- Usado junto com a classe base (card card--destaque)
- Exemplos comuns: --active, --disabled, --large, --hidden

### Exemplo completo

```html
<!-- Bloco de navegação -->
<nav class="nav nav--fixed">
    <!-- Elemento logo -->
    <div class="nav__logo">Marca</div>
    
    <!-- Elemento menu -->
    <ul class="nav__menu">
        <!-- Elemento item -->
        <li class="nav__item">
            <!-- Elemento link com modificador ativo -->
            <a href="#" class="nav__link nav__link--active">Início</a>
        </li>
        <li class="nav__item">
            <a href="#" class="nav__link">Sobre</a>
        </li>
    </ul>
    
    <!-- Elemento button com modificador -->
    <button class="nav__button nav__button--primary">Entrar</button>
</nav>
```

### CSS correspondente

```css
/* Bloco */
.nav {
    display: flex;
    padding: 1rem;
}

/* Modificador do bloco */
.nav--fixed {
    position: fixed;
    top: 0;
}

/* Elementos */
.nav__logo {
    font-size: 1.5rem;
}

.nav__menu {
    display: flex;
    list-style: none;
}

.nav__item {
    margin: 0 1rem;
}

.nav__link {
    color: #333;
}

/* Modificador do elemento */
.nav__link--active {
    color: #0066cc;
    font-weight: bold;
}

.nav__button {
    padding: 0.5rem 1rem;
}

.nav__button--primary {
    background-color: #0066cc;
    color: white;
}
```

### Por que usar BEM?

**1. Especificidade previsível**
```css
/* ❌ Sem BEM - especificidade confusa */
.header .menu ul li a.active { }

/* ✅ Com BEM - especificidade plana */
.nav__link--active { }
```

**2. Evita conflitos**
```css
/* ❌ Sem BEM - .title pode conflitar */
.card .title { }
.article .title { }

/* ✅ Com BEM - nomes únicos */
.card__title { }
.article__title { }
```

**3. Facilita manutenção**
- Apenas olhando o HTML, você sabe qual CSS procurar
- Modificar um componente não afeta outros
- Fácil de deletar código não usado

**4. Componentes reutilizáveis**
```html
<!-- O mesmo bloco card funciona em qualquer lugar -->
<div class="sidebar">
    <div class="card">...</div>
</div>

<div class="content">
    <div class="card">...</div>
</div>
```

### Boas práticas BEM

**✅ Fazer:**
- Usar nomes descritivos: `.form__submit-button` não `.form__btn`
- Manter elementos no primeiro nível: `.menu__item` não `.menu__list__item`
- Criar novos blocos quando necessário: se um elemento é complexo, vire um bloco

**❌ Evitar:**
- Aninhamento profundo: `.block__element__subelement__another`
- Nomes baseados em aparência: `.card__blue-text` (prefira `.card__subtitle`)
- Modificadores sem classe base: apenas `.button--large` (sempre `.button button--large`)

### Quando NÃO usar BEM?

- Classes utilitárias genéricas: `.text-center`, `.mt-2`, `.hidden`
- Estilos globais: `body`, `h1`, `p`
- Protótipos rápidos ou páginas muito simples

---

## 3. Organização de Arquivos CSS

### Por que separar CSS em múltiplos arquivos?

**Benefícios:**
- **Organização:** Cada arquivo tem um propósito claro
- **Manutenção:** Mais fácil encontrar e modificar estilos
- **Reutilização:** Componentes podem ser usados em outros projetos
- **Colaboração:** Múltiplas pessoas podem trabalhar sem conflitos
- **Performance:** Possibilidade de carregar apenas CSS necessário

### Estrutura de arquivos recomendada

```
projeto/
│
├── css/
│   ├── base.css          # Reset, variáveis, estilos globais
│   ├── layout.css        # Grid, containers, estrutura da página
│   ├── components.css    # Componentes reutilizáveis (botões, cards)
│   ├── pages.css         # Estilos específicos de páginas
│   └── utilities.css     # Classes utilitárias (.text-center, .mt-2)
│
├── index.html
└── sobre.html
```

### Importação de CSS no HTML

A ordem importa! CSS é aplicado de cima para baixo.

```html
<head>
    <!-- 1. Primeiro: reset e base -->
    <link rel="stylesheet" href="css/base.css">
    
    <!-- 2. Depois: layout -->
    <link rel="stylesheet" href="css/layout.css">
    
    <!-- 3. Depois: componentes -->
    <link rel="stylesheet" href="css/components.css">
    
    <!-- 4. Por último: específicos e overrides -->
    <link rel="stylesheet" href="css/pages.css">
</head>
```

### Conteúdo de cada arquivo

#### base.css
```css
/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Variáveis globais */
:root {
    --cor-primaria: #0066cc;
    --cor-secundaria: #004999;
    --espacamento: 1rem;
}

/* Estilos de elementos HTML */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

h1, h2, h3 {
    line-height: 1.2;
}

a {
    text-decoration: none;
}
```

#### layout.css
```css
/* Container principal */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Grid system */
.grid {
    display: grid;
    gap: 1rem;
}

.grid--2-cols {
    grid-template-columns: repeat(2, 1fr);
}

/* Header e Footer */
.header {
    position: sticky;
    top: 0;
}

.footer {
    margin-top: auto;
}
```

#### components.css
```css
/* Botões */
.button {
    padding: 0.75rem 1.5rem;
    border: none;
    cursor: pointer;
}

.button--primary {
    background-color: var(--cor-primaria);
    color: white;
}

/* Cards */
.card {
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### CSS @import vs HTML link

Você também pode importar CSS dentro de outro arquivo CSS:

```css
/* Em um arquivo principal.css */
@import url('base.css');
@import url('layout.css');
@import url('components.css');
```

**Diferenças:**

| Característica | HTML `<link>` | CSS `@import` |
|----------------|---------------|---------------|
| Performance | ⚡ Melhor (paralelo) | 🐌 Pior (sequencial) |
| Compatibilidade | ✅ Total | ✅ Total |
| Controle | Mais flexível | Menos flexível |
| Uso recomendado | Produção | Desenvolvimento |

**Recomendação:** Use `<link>` no HTML para melhor performance.

### CSS Nesting (Aninhamento)

CSS moderno suporta aninhamento nativo (antes só em preprocessadores como Sass).

#### Sintaxe tradicional
```css
.card { }
.card__title { }
.card__text { }
.card:hover { }
```

#### Com nesting nativo
```css
.card {
    background: white;
    padding: 1rem;
    
    /* Elemento aninhado */
    & .card__title {
        font-size: 1.5rem;
        color: blue;
    }
    
    & .card__text {
        color: gray;
    }
    
    /* Pseudoclasse aninhada */
    &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        
        /* Aninhamento dentro de hover */
        & .card__title {
            color: darkblue;
        }
    }
}
```

**O símbolo `&`:** Representa o seletor pai.

**Compatibilidade (2024):**
- ✅ Chrome 112+
- ✅ Safari 16.5+
- ✅ Firefox 117+
- ❌ Navegadores antigos

**Alternativa para compatibilidade:** Use Sass/SCSS ou PostCSS.

---

## 4. Recursos Avançados de HTML e CSS

### Adicionando fontes personalizadas

#### Método 1: Google Fonts (recomendado para começar)

**Passo 1:** Vá em https://fonts.google.com

**Passo 2:** Escolha as fontes e pesos desejados

**Passo 3:** Copie o código de importação

```html
<head>
    <!-- Preconnect otimiza carregamento -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Import da fonte -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
</head>
```

**Passo 4:** Use no CSS

```css
body {
    font-family: 'Roboto', sans-serif;
}
```

**Explicação dos parâmetros:**
- `family=Roboto:wght@300;400;700` = Fonte Roboto, pesos 300, 400 e 700
- `display=swap` = Mostra fonte padrão enquanto carrega a customizada

#### Método 2: @font-face (fontes locais)

```css
@font-face {
    font-family: 'MinhaFonte';
    src: url('../fonts/minhafonte.woff2') format('woff2'),
         url('../fonts/minhafonte.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

body {
    font-family: 'MinhaFonte', sans-serif;
}
```

**Formatos de fonte:**
- **WOFF2:** Melhor compressão, suporte moderno (use primeiro)
- **WOFF:** Fallback para navegadores mais antigos
- **TTF/OTF:** Maior tamanho, use apenas se necessário

**Onde baixar fontes:**
- Google Fonts (gratuitas)
- Font Squirrel (gratuitas)
- Adobe Fonts (pago)
- DaFont (gratuitas, verifique licença)

### Propriedade overflow

A propriedade `overflow` controla o que acontece quando o conteúdo excede o tamanho do container.

#### Valores principais

**`overflow: visible`** (padrão)
```css
.box {
    width: 200px;
    height: 100px;
    overflow: visible; /* Conteúdo ultrapassa os limites */
}
```
Conteúdo que não cabe fica visível fora da caixa.

**`overflow: hidden`**
```css
.box {
    overflow: hidden; /* Esconde conteúdo excedente */
}
```
Conteúdo que excede é cortado e invisível.

**Casos de uso:**
- Forçar elemento a conter filhos flutuantes
- Aplicar border-radius em containers com imagens
- Criar efeito de recorte

**`overflow: scroll`**
```css
.box {
    overflow: scroll; /* Sempre mostra scrollbar */
}
```
Sempre exibe barras de rolagem, mesmo se não necessário.

**`overflow: auto`**
```css
.box {
    overflow: auto; /* Scrollbar apenas se necessário */
}
```
Mostra scrollbar apenas quando conteúdo excede.

#### Overflow por eixo

```css
.box {
    overflow-x: auto;    /* Scroll horizontal se necessário */
    overflow-y: hidden;  /* Sem scroll vertical */
}
```

**Casos de uso:**
- Tabelas largas: `overflow-x: auto`
- Chat com mensagens: `overflow-y: scroll`
- Galeria horizontal: `overflow-x: scroll; overflow-y: hidden`

#### text-overflow (para texto)

```css
.texto-cortado {
    width: 200px;
    white-space: nowrap;      /* Não quebra linha */
    overflow: hidden;          /* Esconde excesso */
    text-overflow: ellipsis;   /* Adiciona ... no final */
}
```

Resultado: "Este é um texto muito lo..."

### Pseudoclasses

Pseudoclasses selecionam elementos em estados específicos.

#### :hover
Aplica estilo quando mouse passa sobre elemento.

```css
.button:hover {
    background-color: darkblue;
    transform: scale(1.05);
}
```

#### :active
Aplica estilo quando elemento está sendo clicado.

```css
.button:active {
    transform: scale(0.95);
}
```

#### :focus
Aplica estilo quando elemento recebe foco (clique ou tab).

```css
input:focus {
    border-color: blue;
    outline: 2px solid lightblue;
}
```

**Importante para acessibilidade!** Usuários de teclado dependem de `:focus`.

#### :disabled
Estiliza elementos desabilitados.

```css
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

#### :checked
Estiliza checkboxes e radios marcados.

```css
input[type="checkbox"]:checked {
    background-color: green;
}
```

#### :valid e :invalid
Estilizam campos de formulário baseado em validação.

```css
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}
```

#### :not()
Seleciona elementos que NÃO correspondem ao seletor.

```css
/* Todos inputs exceto checkboxes */
input:not([type="checkbox"]) {
    padding: 0.5rem;
}
```

#### :first-child e :last-child
Selecionam primeiro e último filho.

```css
.menu__item:first-child {
    margin-left: 0;
}

.menu__item:last-child {
    margin-right: 0;
}
```

#### :nth-child()
Seleciona filho específico ou padrão.

```css
/* Linhas alternadas de tabela */
tr:nth-child(odd) {
    background-color: #f5f5f5;
}

tr:nth-child(even) {
    background-color: white;
}

/* Cada 3º elemento */
.item:nth-child(3n) {
    color: red;
}

/* Segundo elemento */
.item:nth-child(2) {
    font-weight: bold;
}
```

#### :placeholder-shown
Seleciona input quando placeholder está visível.

```css
input:placeholder-shown {
    border-color: gray;
}

input:not(:placeholder-shown) {
    border-color: blue;
}
```

### Pseudoelementos

Pseudoelementos criam elementos "virtuais" para estilização.

**Sintaxe:** `::` (dois dois-pontos)

#### ::before e ::after
Inserem conteúdo antes/depois do elemento.

```css
.card::before {
    content: "★ ";
    color: gold;
}

.card::after {
    content: " ►";
    color: blue;
}
```

**Usos comuns:**
```css
/* Ícones decorativos */
.destaque::before {
    content: "→ ";
    font-weight: bold;
}

/* Clearfix para floats */
.container::after {
    content: "";
    display: table;
    clear: both;
}

/* Overlay em imagens */
.image-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
}
```

#### ::placeholder
Estiliza o texto placeholder de inputs.

```css
input::placeholder {
    color: #999;
    font-style: italic;
    opacity: 0.7;
}
```

#### ::first-letter
Estiliza primeira letra (letras capitulares).

```css
p::first-letter {
    font-size: 3rem;
    font-weight: bold;
    float: left;
    margin-right: 0.5rem;
}
```

#### ::first-line
Estiliza primeira linha.

```css
p::first-line {
    font-weight: bold;
    color: darkblue;
}
```

#### ::selection
Estiliza texto selecionado pelo usuário.

```css
::selection {
    background-color: yellow;
    color: black;
}
```

### Diferença: Pseudoclasse vs Pseudoelemento

**Pseudoclasse (`:`):** Estado do elemento
- `:hover` = quando mouse está em cima
- `:focus` = quando elemento tem foco
- `:checked` = quando checkbox está marcado

**Pseudoelemento (`::`):** Parte específica do elemento
- `::before` = antes do conteúdo
- `::placeholder` = texto placeholder
- `::first-letter` = primeira letra

---

## 5. Incorporação de Conteúdo

### O que é incorporação?

Incorporação (embedding) é incluir conteúdo de outras fontes diretamente em sua página HTML, como vídeos, mapas, posts de redes sociais, etc.

### Tag `<iframe>`

`<iframe>` (inline frame) cria uma "janela" para outro documento HTML.

```html
<iframe src="url-da-página" width="600" height="400"></iframe>
```

**Atributos principais:**
- `src`: URL do conteúdo a ser exibido
- `width` / `height`: Dimensões (pixels ou %)
- `frameborder`: Borda ao redor (0 = sem borda)
- `allowfullscreen`: Permite modo tela cheia
- `loading`: Controla carregamento (`lazy` = carrega sob demanda)
- `title`: Descrição para acessibilidade

### Incorporando vídeos do YouTube

**Passo 1:** Vá ao vídeo no YouTube

**Passo 2:** Clique em "Compartilhar" → "Incorporar"

**Passo 3:** Copie o código do iframe

```html
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    title="Título do vídeo" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

**Parâmetros úteis da URL:**
```html
<!-- Iniciar em tempo específico (90 segundos) -->
src="https://www.youtube.com/embed/VIDEO_ID?start=90"

<!-- Autoplay (inicia automaticamente) -->
src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"

<!-- Sem controles -->
src="https://www.youtube.com/embed/VIDEO_ID?controls=0"

<!-- Loop (repetir) -->
src="https://www.youtube.com/embed/VIDEO_ID?loop=1&playlist=VIDEO_ID"

<!-- Combinando parâmetros -->
src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&controls=0"
```

**Tornando responsivo:**
```css
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* Proporção 16:9 */
    height: 0;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

```html
<div class="video-container">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
</div>
```

### Incorporando vídeos do Vimeo

Similar ao YouTube:

```html
<iframe 
    src="https://player.vimeo.com/video/VIDEO_ID" 
    width="640" 
    height="360" 
    frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture" 
    allowfullscreen>
</iframe>
```

### Tag `<video>` para vídeos locais

Para vídeos hospedados no seu servidor:

```html
<video width="640" height="360" controls>
    <source src="videos/meu-video.mp4" type="video/mp4">
    <source src="videos/meu-video.webm" type="video/webm">
    Seu navegador não suporta vídeos HTML5.
</video>
```

**Atributos:**
- `controls`: Mostra controles de play/pause
- `autoplay`: Inicia automaticamente
- `loop`: Repete infinitamente
- `muted`: Sem som (necessário para autoplay em muitos navegadores)
- `poster`: Imagem mostrada antes de dar play

**Exemplo com todos atributos:**
```html
<video 
    width="100%" 
    controls 
    autoplay 
    muted 
    loop 
    poster="thumbnail.jpg">
    <source src="video.mp4" type="video/mp4">
</video>
```

### Incorporando Google Maps

**Método 1: Iframe gerado pelo Google Maps**

**Passo 1:** Acesse Google Maps (maps.google.com)

**Passo 2:** Busque o endereço desejado

**Passo 3:** Clique em "Compartilhar" → "Incorporar mapa"

**Passo 4:** Copie o código HTML

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=..." 
    width="600" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

**Método 2: URL simplificada**

```html
<iframe 
    width="100%" 
    height="400" 
    frameborder="0" 
    src="https://maps.google.com/maps?q=Av.+Paulista,+São+Paulo&t=&z=13&ie=UTF8&iwloc=&output=embed">
</iframe>
```

**Parâmetros da URL:**
- `q=`: Endereço ou coordenadas
- `z=`: Nível de zoom (1-20)
- `t=`: Tipo de mapa (m=mapa, k=satélite, h=híbrido, p=terreno)

**Exemplos:**
```html
<!-- Coordenadas específicas -->
src="https://maps.google.com/maps?q=-23.561414,-46.656334&z=15&output=embed"

<!-- Satélite -->
src="https://maps.google.com/maps?q=Cristo+Redentor&t=k&z=16&output=embed"
```

**Tornando responsivo:**
```css
.mapa-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}

.mapa-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

### Incorporando áudio

```html
<audio controls>
    <source src="audio/musica.mp3" type="audio/mp3">
    <source src="audio/musica.ogg" type="audio/ogg">
    Seu navegador não suporta áudio HTML5.
</audio>
```

**Atributos:**
- `controls`: Mostra controles
- `autoplay`: Toca automaticamente
- `loop`: Repete
- `muted`: Sem som

### Incorporando PDFs

```html
<iframe 
    src="documentos/catalogo.pdf" 
    width="100%" 
    height="600px">
</iframe>
```

**Nota:** Visualização pode variar entre navegadores. Alguns móveis não exibem PDFs em iframe.

**Alternativa:**
```html
<a href="documentos/catalogo.pdf" target="_blank">
    Ver PDF em nova aba
</a>
```

### Incorporando posts de redes sociais

#### Instagram

Acesse o post → "..." → "Incorporar" → Copie o código

```html
<blockquote class="instagram-media">
    <!-- Código gerado pelo Instagram -->
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

#### Twitter/X

```html
<blockquote class="twitter-tweet">
    <!-- Código gerado pelo Twitter -->
</blockquote>
<script async src="https://platform.twitter.com/widgets.js"></script>
```

### Segurança com iframes

**Atributo sandbox:**

```html
<iframe src="conteudo-externo.html" sandbox></iframe>
```

**Restrições do sandbox:**
- `sandbox=""`: Todas restrições ativadas
- `sandbox="allow-scripts"`: Permite JavaScript
- `sandbox="allow-forms"`: Permite formulários
- `sandbox="allow-same-origin"`: Permite mesmo origin

**Exemplo seguro:**
```html
<iframe 
    src="https://exemplo.com" 
    sandbox="allow-scripts allow-same-origin">
</iframe>
```

---

## 6. Boas Práticas e Dicas

### Acessibilidade

**Labels em formulários:**
```html
<!-- ✅ Correto -->
<label for="email">E-mail:</label>
<input type="email" id="email" name="email">

<!-- ❌ Errado -->
<input type="email" placeholder="E-mail">
```

**Alt em imagens:**
```html
<!-- ✅ Correto -->
<img src="produto.jpg" alt="Notebook Dell Inspiron 15">

<!-- ❌ Errado -->
<img src="produto.jpg">
```

**Contraste de cores:**
- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Use ferramentas como WebAIM Contrast Checker

**Navegação por teclado:**
- Teste com Tab, Enter, Espaço
- Mantenha indicadores de `:focus` visíveis
- Use `tabindex` para controlar ordem de foco

### Performance

**Otimização de imagens:**
- Use formatos modernos (WebP, AVIF)
- Comprima imagens antes de upload
- Use `loading="lazy"` em imagens abaixo da dobra

```html
<img src="imagem.jpg" loading="lazy" alt="Descrição">
```

**Carregamento de fontes:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**CSS crítico inline:**
Para páginas maiores, coloque CSS essencial no `<head>`:

```html
<style>
    /* CSS crítico para primeira renderização */
    body { font-family: sans-serif; }
    .header { background: #333; }
</style>
```

### SEO (Search Engine Optimization)

**Meta tags importantes:**
```html
<head>
    <title>Título da Página - até 60 caracteres</title>
    <meta name="description" content="Descrição até 160 caracteres">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Open Graph para redes sociais -->
    <meta property="og:title" content="Título para compartilhamento">
    <meta property="og:description" content="Descrição para compartilhamento">
    <meta property="og:image" content="https://site.com/imagem.jpg">
</head>
```

**Estrutura semântica:**
```html
<!-- ✅ Correto -->
<header>
    <nav>...</nav>
</header>
<main>
    <article>
        <h1>Título principal</h1>
        <section>...</section>
    </article>
</main>
<footer>...</footer>

<!-- ❌ Evitar -->
<div class="header">
    <div class="nav">...</div>
</div>
```

### Responsividade

**Mobile-first:**
```css
/* Estilos base para mobile */
.container {
    padding: 1rem;
}

/* Ajustes para tablets e desktop */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

**Unidades flexíveis:**
```css
/* ❌ Evitar valores fixos */
font-size: 16px;
width: 300px;

/* ✅ Preferir valores relativos */
font-size: 1rem;
width: 100%;
max-width: 300px;
```

---

## 7. Recursos para Estudo

### Documentação oficial
- **MDN Web Docs:** https://developer.mozilla.org
- **W3C:** https://www.w3.org
- **Can I Use:** https://caniuse.com (compatibilidade)

### Ferramentas
- **CodePen:** https://codepen.io (praticar online)
- **CSS Tricks:** https://css-tricks.com (tutoriais)
- **BEM:** https://getbem.com (metodologia)

### Validadores
- **HTML:** https://validator.w3.org
- **CSS:** https://jigsaw.w3.org/css-validator
- **Acessibilidade:** https://wave.webaim.org

### Geradores úteis
- **Google Fonts:** https://fonts.google.com
- **CSS Gradient:** https://cssgradient.io
- **Box Shadow:** https://box-shadow.dev
- **Flexbox:** https://flexboxfroggy.com (jogo)
- **Grid:** https://cssgridgarden.com (jogo)

---

## 8. Exercícios Práticos

### Exercício 1: Formulário de Cadastro Completo
Crie um formulário com:
- Nome, email, telefone, CPF
- Senha com requisitos (mínimo 8 caracteres)
- Data de nascimento (validar idade mínima 18 anos)
- Select de estado
- Checkbox de aceite de termos (obrigatório)
- Estilização com BEM
- Validação visual com :valid/:invalid

### Exercício 2: Card com Hover Effects
Desenvolva um card que:
- Use BEM para nomenclatura
- Tenha ::before com um ícone decorativo
- Aplique transform no :hover
- Mude cor do título no hover do card
- Tenha transições suaves

### Exercício 3: Galeria de Vídeos
Crie uma seção com:
- Grid de vídeos do YouTube
- Iframe responsivo
- Títulos e descrições usando BEM
- Hover effect nos containers

### Exercício 4: Mini Landing Page
Desenvolva uma página com:
- 3 arquivos CSS separados (base, layout, components)
- Fonte personalizada do Google Fonts
- Formulário de newsletter
- Vídeo incorporado
- Mapa de localização
- Tudo usando BEM

---

## Glossário

**API:** Interface de Programação de Aplicações - conjunto de regras para interação entre sistemas

**Backend:** Parte do site que roda no servidor (não visível ao usuário)

**CDN:** Content Delivery Network - rede de servidores que entrega conteúdo rapidamente

**Fallback:** Opção alternativa quando a principal não funciona

**Framework:** Estrutura de código reutilizável para desenvolvimento

**Frontend:** Parte visual do site que usuário interage

**Inline:** Dentro da mesma linha (inline CSS = CSS no HTML)

**LGPD:** Lei Geral de Proteção de Dados (Brasil)

**Preprocessador:** Ferramenta que processa código antes de virar CSS final (Sass, Less)

**Reset CSS:** Código que remove estilos padrão do navegador

**Responsive:** Design que se adapta a diferentes tamanhos de tela

**Semântico:** HTML que usa tags pelo seu significado, não aparência

**UX:** User Experience - experiência do usuário

**Validação:** Verificação se dados estão no formato correto

---

## Conclusão

Este material cobre os fundamentos avançados de HTML e CSS necessários para criar landing pages modernas e profissionais. A prática é essencial - experimente, teste, quebre o código e conserte. É assim que se aprende!

**Próximos passos sugeridos:**

1. Pratique criando variações dos exercícios propostos
2. Estude JavaScript para adicionar interatividade
3. Aprenda sobre frameworks CSS (Bootstrap, Tailwind)
4. Explore preprocessadores (Sass/SCSS)
5. Aprofunde em acessibilidade (WCAG)

Continue estudando, e lembre-se: todo desenvolvedor web profissional começou exatamente onde você está agora! 🚀