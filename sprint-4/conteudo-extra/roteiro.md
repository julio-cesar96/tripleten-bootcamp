# Roteiro de Aula: Landing Page com HTML e CSS Avançado

## Objetivo da Aula

Desenvolver uma landing page completa aplicando conceitos avançados de HTML e CSS, incluindo formulários, organização BEM, recursos avançados e incorporação de conteúdo multimídia.

---

## 1. Estrutura de Pastas e Arquivos

Primeiro, vamos organizar nosso projeto seguindo boas práticas:

```folder
landing-page/
│
├── index.html
├── css/
│   ├── base.css
│   ├── components.css
│   └── layout.css
├── images/
│   └── hero-image.jpg
└── fonts/
```

---

## 2. HTML - Estrutura Base (index.html)

### Configuração Inicial com Fontes Personalizadas

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechFlow - Soluções em Automação</title>
    
    <!-- Importando fonte do Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- Importando CSS (ordem importa!) -->
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
</head>
<body>
    <!-- Conteúdo aqui -->
</body>
</html>
```

**Explicação**: 

- `preconnect` otimiza o carregamento de fontes externas
- Importamos 3 arquivos CSS separados seguindo BEM
- A ordem dos imports é importante: base → layout → components

---

### Menu de Navegação

```html
<header class="header">
    <nav class="nav">
        <div class="nav__logo">TechFlow</div>
        <ul class="nav__menu">
            <li class="nav__item"><a href="#home" class="nav__link">Início</a></li>
            <li class="nav__item"><a href="#beneficios" class="nav__link">Benefícios</a></li>
            <li class="nav__item"><a href="#demo" class="nav__link">Demo</a></li>
            <li class="nav__item"><a href="#contato" class="nav__link">Contato</a></li>
        </ul>
    </nav>
</header>
```

**Explicação BEM**:

- `nav` = Bloco (componente principal)
- `nav__menu`, `nav__item`, `nav__link` = Elementos (partes do bloco)
- Estrutura clara e sem conflitos de CSS

---

### Seção Hero

```html
<section class="hero" id="home">
    <div class="hero__content">
        <h1 class="hero__title">Automatize seu negócio com inteligência</h1>
        <p class="hero__subtitle">Aumente sua produtividade em até 300% com nossas soluções em automação</p>
        <a href="#contato" class="hero__cta">Solicite uma Demo Gratuita</a>
    </div>
    <div class="hero__image">
        <img src="images/hero-image.jpg" alt="Automação empresarial">
    </div>
</section>
```

---

### Seção de Benefícios

```html
<section class="beneficios" id="beneficios">
    <div class="beneficios__container">
        <h2 class="beneficios__title">Por que escolher a TechFlow?</h2>
        <p class="beneficios__description">
            Nossa plataforma foi desenvolvida para empresas que buscam otimizar processos 
            e reduzir custos operacionais através da automação inteligente.
        </p>
        
        <div class="beneficios__grid">
            <div class="card">
                <h3 class="card__title">⚡ Rapidez</h3>
                <p class="card__text">Automatize tarefas repetitivas em minutos</p>
            </div>
            <div class="card">
                <h3 class="card__title">💰 Economia</h3>
                <p class="card__text">Reduza custos operacionais em até 60%</p>
            </div>
            <div class="card">
                <h3 class="card__title">📊 Análises</h3>
                <p class="card__text">Dashboards em tempo real para decisões rápidas</p>
            </div>
            <div class="card">
                <h3 class="card__title">🔒 Segurança</h3>
                <p class="card__text">Criptografia de ponta e conformidade LGPD</p>
            </div>
        </div>
    </div>
</section>
```

**Explicação BEM**:

- `card` é um novo bloco reutilizável
- `beneficios__grid` organiza os cards

---

### Seção de Vídeo Demo

```html
<section class="demo" id="demo">
    <div class="demo__container">
        <h2 class="demo__title">Veja nossa solução em ação</h2>
        
        <!-- Incorporando vídeo do YouTube -->
        <div class="demo__video">
            <iframe 
                width="100%" 
                height="500" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Demo TechFlow" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    </div>
</section>
```

**Explicação**:

- `iframe` é a tag para incorporar conteúdo externo
- `allow` define permissões do vídeo
- `allowfullscreen` permite tela cheia
- Substitua o ID do vídeo (`dQw4w9WgXcQ`) pelo seu vídeo real

---

### Formulário de Contato

```html
<section class="contato" id="contato">
    <div class="contato__container">
        <h2 class="contato__title">Entre em contato</h2>
        
        <form class="form" action="mailto:contato@techflow.com" method="post" enctype="text/plain">
            <div class="form__group">
                <label for="nome" class="form__label">Nome Completo *</label>
                <input 
                    type="text" 
                    id="nome" 
                    name="nome" 
                    class="form__input" 
                    required 
                    minlength="3"
                    placeholder="Digite seu nome completo">
            </div>
            
            <div class="form__group">
                <label for="email" class="form__label">E-mail *</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    class="form__input" 
                    required
                    placeholder="seuemail@exemplo.com">
            </div>
            
            <div class="form__group">
                <label for="telefone" class="form__label">Telefone</label>
                <input 
                    type="tel" 
                    id="telefone" 
                    name="telefone" 
                    class="form__input"
                    pattern="[0-9]{10,11}"
                    placeholder="(00) 00000-0000">
            </div>
            
            <div class="form__group">
                <label for="empresa" class="form__label">Empresa *</label>
                <input 
                    type="text" 
                    id="empresa" 
                    name="empresa" 
                    class="form__input" 
                    required
                    placeholder="Nome da sua empresa">
            </div>
            
            <div class="form__group">
                <label for="mensagem" class="form__label">Mensagem *</label>
                <textarea 
                    id="mensagem" 
                    name="mensagem" 
                    class="form__textarea" 
                    required 
                    minlength="10"
                    rows="5"
                    placeholder="Conte-nos sobre seu projeto..."></textarea>
            </div>
            
            <button type="submit" class="form__button">Enviar Mensagem</button>
        </form>
    </div>
</section>
```

**Explicação - Validação HTML**:

- `required`: campo obrigatório
- `type="email"`: valida formato de e-mail
- `type="tel"`: otimizado para telefone
- `pattern`: valida formato com regex (10-11 dígitos)
- `minlength`: mínimo de caracteres
- `placeholder`: texto de exemplo
- `action="mailto:"`: abre cliente de e-mail (funcional mas limitado)

**Nota sobre formulários funcionais**:
Com apenas HTML/CSS, o `mailto:` é a opção mais simples. Para formulários reais, seria necessário backend (PHP, Node.js) ou serviços como Formspree, Netlify Forms.

---

### Incorporação de Mapa

```html
<section class="localizacao">
    <div class="localizacao__container">
        <h2 class="localizacao__title">Nossa Localização</h2>
        
        <!-- Incorporando Google Maps -->
        <div class="localizacao__mapa">
            <iframe 
                width="100%" 
                height="400" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://maps.google.com/maps?q=Av.+Paulista,+São+Paulo&t=&z=13&ie=UTF8&iwloc=&output=embed">
            </iframe>
        </div>
        
        <div class="localizacao__info">
            <p><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP</p>
            <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
        </div>
    </div>
</section>
```

**Explicação**:

- Para gerar o código do mapa: vá ao Google Maps, busque o endereço, clique em "Compartilhar" → "Incorporar mapa"
- Substitua a URL pelo seu endereço real

---

### Footer

```html
<footer class="footer">
    <div class="footer__container">
        <p class="footer__text">&copy; 2024 TechFlow - Todos os direitos reservados</p>
        <div class="footer__social">
            <a href="#" class="footer__link">LinkedIn</a>
            <a href="#" class="footer__link">Instagram</a>
            <a href="#" class="footer__link">Facebook</a>
        </div>
    </div>
</footer>
```

---

## 3. CSS - Arquivos Separados

### css/base.css - Estilos Base

```css
/* Reset e configurações globais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Variáveis CSS */
    --cor-primaria: #2563eb;
    --cor-secundaria: #1e40af;
    --cor-texto: #1f2937;
    --cor-texto-claro: #6b7280;
    --cor-fundo: #ffffff;
    --cor-fundo-alt: #f3f4f6;
    --espacamento: 2rem;
    --border-radius: 8px;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--cor-texto);
    line-height: 1.6;
    background-color: var(--cor-fundo);
}

/* Tipografia base */
h1, h2, h3 {
    font-weight: 700;
    line-height: 1.2;
}

h1 {
    font-size: 3rem;
}

h2 {
    font-size: 2.5rem;
}

h3 {
    font-size: 1.5rem;
}

p {
    margin-bottom: 1rem;
}

a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}

/* Utilitários */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--espacamento);
}
```

**Explicação**:
- `:root` define variáveis CSS reutilizáveis
- Reset CSS básico para consistência entre navegadores
- Definição de tipografia global usando a fonte importada

---

### css/layout.css - Estrutura e Layout

```css
/* Header e Navegação */
.header {
    background-color: var(--cor-fundo);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem var(--espacamento);
    max-width: 1200px;
    margin: 0 auto;
}

.nav__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--cor-primaria);
}

.nav__menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav__link {
    font-weight: 500;
    transition: color 0.3s ease;
}

/* Pseudoclasse :hover */
.nav__link:hover {
    color: var(--cor-primaria);
}

/* Hero Section */
.hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    padding: 5rem var(--espacamento);
    max-width: 1200px;
    margin: 0 auto;
    min-height: 80vh;
}

.hero__content {
    padding-right: 2rem;
}

.hero__image img {
    width: 100%;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Benefícios Section */
.beneficios {
    background-color: var(--cor-fundo-alt);
    padding: 5rem var(--espacamento);
}

.beneficios__container {
    max-width: 1200px;
    margin: 0 auto;
}

.beneficios__title {
    text-align: center;
    margin-bottom: 1rem;
}

.beneficios__description {
    text-align: center;
    color: var(--cor-texto-claro);
    max-width: 700px;
    margin: 0 auto 3rem;
}

.beneficios__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

/* Demo Section */
.demo {
    padding: 5rem var(--espacamento);
}

.demo__container {
    max-width: 1000px;
    margin: 0 auto;
}

.demo__title {
    text-align: center;
    margin-bottom: 3rem;
}

.demo__video {
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Contato Section */
.contato {
    background-color: var(--cor-fundo-alt);
    padding: 5rem var(--espacamento);
}

.contato__container {
    max-width: 600px;
    margin: 0 auto;
}

.contato__title {
    text-align: center;
    margin-bottom: 2rem;
}

/* Localização Section */
.localizacao {
    padding: 5rem var(--espacamento);
}

.localizacao__container {
    max-width: 1000px;
    margin: 0 auto;
}

.localizacao__title {
    text-align: center;
    margin-bottom: 2rem;
}

.localizacao__mapa {
    border-radius: var(--border-radius);
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.localizacao__info {
    text-align: center;
    color: var(--cor-texto-claro);
}

/* Footer */
.footer {
    background-color: var(--cor-texto);
    color: white;
    padding: 2rem var(--espacamento);
}

.footer__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer__social {
    display: flex;
    gap: 1.5rem;
}

.footer__link:hover {
    color: var(--cor-primaria);
}
```

**Explicação - Recursos Avançados**:

- `position: sticky`: mantém header fixo ao rolar
- `grid-template-columns`: layout responsivo com Grid
- `repeat(auto-fit, minmax())`: grid que se adapta automaticamente
- `overflow: hidden`: esconde conteúdo que ultrapassa os limites (útil com `border-radius`)

---

### css/components.css - Componentes Reutilizáveis

```css
/* Card Component */
.card {
    background-color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Pseudoclasse :hover com transform */
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.card__title {
    margin-bottom: 0.5rem;
    color: var(--cor-primaria);
}

.card__text {
    color: var(--cor-texto-claro);
}

/* Hero CTA Button */
.hero__cta {
    display: inline-block;
    background-color: var(--cor-primaria);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    margin-top: 1.5rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Pseudoclasse :hover e :active */
.hero__cta:hover {
    background-color: var(--cor-secundaria);
    transform: scale(1.05);
}

.hero__cta:active {
    transform: scale(0.98);
}

/* Form Component */
.form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form__label {
    font-weight: 500;
    color: var(--cor-texto);
}

.form__input,
.form__textarea {
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

/* Pseudoclasse :focus */
.form__input:focus,
.form__textarea:focus {
    outline: none;
    border-color: var(--cor-primaria);
}

/* Pseudoclasse :invalid e :valid */
.form__input:invalid:not(:placeholder-shown) {
    border-color: #ef4444;
}

.form__input:valid:not(:placeholder-shown) {
    border-color: #10b981;
}

/* Pseudoelemento ::placeholder */
.form__input::placeholder,
.form__textarea::placeholder {
    color: #9ca3af;
    opacity: 0.7;
}

.form__textarea {
    resize: vertical;
    min-height: 120px;
}

.form__button {
    background-color: var(--cor-primaria);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.form__button:hover {
    background-color: var(--cor-secundaria);
}

.form__button:active {
    transform: scale(0.98);
}

/* Pseudoclasse :disabled */
.form__button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
}

/* Responsividade básica */
@media (max-width: 768px) {
    .hero {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero__content {
        padding-right: 0;
    }
    
    .nav__menu {
        flex-direction: column;
        gap: 1rem;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.75rem;
    }
}
```

**Explicação - Pseudoclasses e Pseudoelementos**:

- `:hover` - estilo quando mouse passa por cima
- `:active` - estilo quando elemento está sendo clicado
- `:focus` - estilo quando input está selecionado
- `:invalid` / `:valid` - validação visual de formulários
- `:not(:placeholder-shown)` - aplica estilo apenas quando campo não está vazio
- `:disabled` - estilo para botão desabilitado
- `::placeholder` - estiliza o texto de placeholder

**Explicação - Transform**:

- `translateY(-5px)` - move elemento 5px para cima
- `scale(1.05)` - aumenta elemento em 5%

---

## 4. Conceitos CSS Avançados Aplicados

### Overflow

```css
/* Exemplo de uso do overflow */
.demo__video {
    overflow: hidden; /* Esconde conteúdo que ultrapassar */
    border-radius: var(--border-radius);
}

/* Outros valores de overflow: */
/* overflow: visible; (padrão - mostra conteúdo que ultrapassa) */
/* overflow: scroll; (sempre mostra scrollbar) */
/* overflow: auto; (scrollbar apenas se necessário) */
/* overflow-x: hidden; (apenas horizontal) */
/* overflow-y: auto; (apenas vertical) */
```

### CSS Nesting (Nativo - Navegadores Modernos)

```css
/* CSS Nesting nativo - funciona em navegadores modernos */
.card {
    background-color: white;
    padding: 2rem;
    
    /* Aninhamento direto */
    & .card__title {
        margin-bottom: 0.5rem;
        color: var(--cor-primaria);
    }
    
    /* Pseudoclasse aninhada */
    &:hover {
        transform: translateY(-5px);
        
        /* Aninhamento dentro de hover */
        & .card__title {
            color: var(--cor-secundaria);
        }
    }
}
```

**Nota**: O CSS Nesting nativo ainda está sendo adotado. Se quiser usar hoje, pode precisar de um pré-processador como Sass/SCSS.

---

## 5. Metodologia BEM - Resumo

**B**lock **E**lement **M**odifier

### Estrutura:
- **Bloco**: `.nav` (componente independente)
- **Elemento**: `.nav__menu` (parte do bloco, usa `__`)
- **Modificador**: `.nav--dark` (variação do bloco, usa `--`)

### Benefícios:
- CSS organizado e previsível
- Evita conflitos de estilos
- Fácil manutenção
- Componentes reutilizáveis

### Exemplo completo:
```html
<div class="card card--destaque">
    <h3 class="card__title">Título</h3>
    <p class="card__text">Texto</p>
    <button class="card__button card__button--primario">Ação</button>
</div>
```

---

## 6. Checklist da Aula

✅ Estrutura de pastas organizada  
✅ Importação de fontes externas (Google Fonts)  
✅ Múltiplos arquivos CSS com imports  
✅ Metodologia BEM aplicada  
✅ Formulário com validação HTML5  
✅ Pseudoclasses (`:hover`, `:focus`, `:invalid`, `:valid`, `:active`)  
✅ Pseudoelementos (`::placeholder`)  
✅ Propriedade `overflow`  
✅ Incorporação de vídeo (YouTube)  
✅ Incorporação de mapa (Google Maps)  
✅ Grid e Flexbox para layout  
✅ Variáveis CSS  
✅ Transições e transformações  
✅ Responsividade básica  

---

## 7. Exercícios Práticos para Alunos

### Desafio 1: Personalize a landing page
- Mude as cores usando as variáveis CSS
- Adicione sua própria fonte do Google Fonts
- Troque as imagens e vídeos

### Desafio 2: Adicione novos componentes
- Crie um card com modificador BEM (ex: `card--destaque`)
- Adicione uma seção de depoimentos
- Crie um botão com efeito de loading usando pseudoelementos

### Desafio 3: Validação avançada
- Adicione mais campos ao formulário (CEP, CPF)
- Use `pattern` para validar formatos específicos
- Adicione mensagens de erro customizadas

### Desafio 4: Animações
- Adicione animação de entrada nas seções (usando `@keyframes`)
- Crie um menu hamburguer para mobile
- Faça o hero ter um efeito parallax

---

## 8. Recursos Adicionais

### Ferramentas úteis:
- **Google Fonts**: https://fonts.google.com
- **Gerador de embed do Google Maps**: google.com/maps
- **Validador HTML**: validator.w3.org
- **Can I Use**: caniuse.com (verificar compatibilidade de recursos CSS)

### Documentação:
- **MDN Web Docs**: developer.mozilla.org
- **CSS Tricks**: css-tricks.com
- **BEM Methodology**: getbem.com

---

## Observações Finais

Este roteiro cobre uma aula prática de 2 horas onde você construirá uma landing page profissional do zero. A estrutura permite expandir facilmente com novos componentes e funcionalidades.

**Dica de ensino**: Construa a página ao vivo com os alunos, explicando cada conceito conforme implementa. Incentive perguntas e experimente variações para demonstrar como cada propriedade CSS funciona na prática.