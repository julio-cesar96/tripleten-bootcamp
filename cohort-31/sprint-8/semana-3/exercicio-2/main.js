const catalogo = [
  { id: 1, nome: 'Teclado Mecânico', preco: 350,  qtd: 1 },
  { id: 2, nome: 'Mouse Gamer',      preco: 180,  qtd: 1 },
  { id: 3, nome: 'Monitor 24"',      preco: 1200, qtd: 1 },
  { id: 4, nome: 'Headset',          preco: 250,  qtd: 1 },
]

let carrinho = []

const calcularTotal = (itens) => itens.reduce((acc, item) => acc + item.preco * item.qtd, 0)
const aplicarDesconto = (itens, pct) => calcularTotal(itens) * (1 - pct / 100)
const removerItem = (itens, id) => itens.filter(item => item.id !== id)
const itensCaros = (itens, limite) => itens.filter(item => item.preco > limite)

function fmt(n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }

function renderProdutos() {
  const el = document.getElementById('produtos')
  el.innerHTML = catalogo.map(p => {
    const noCart = carrinho.find(i => i.id === p.id)
    return `<button class="produto-btn${noCart ? ' no-cart' : ''}" onclick="toggleItem(${p.id})" style="${noCart ? 'border-color:var(--accent);background:var(--accent-dim)' : ''}">
      <strong>${p.nome}</strong>
      <span>${fmt(p.preco)}</span>
      <small style="color:var(--muted)">${noCart ? '✔ no carrinho' : '+ adicionar'}</small>
    </button>`
  }).join('')
}

function renderCarrinho() {
  const el = document.getElementById('carrinho')
  if (carrinho.length === 0) {
    el.innerHTML = '<p class="empty">Carrinho vazio — adicione produtos acima</p>'
    return
  }
  const total = calcularTotal(carrinho)
  const totalDesc = aplicarDesconto(carrinho, 10)
  const caros = itensCaros(carrinho, 200)

  el.innerHTML = `
    ${carrinho.map(i => `
      <div class="carrinho-item">
        <span>${i.nome}</span>
        <span style="display:flex;align-items:center;gap:8px">
          <span style="color:var(--accent)">${fmt(i.preco)}</span>
          <button onclick="toggleItem(${i.id})">✕</button>
        </span>
      </div>`).join('')}
    <div class="totais">
      <div><span>Subtotal</span><span>${fmt(total)}</span></div>
      <div class="desconto"><span>Com 10% de desconto</span><span>${fmt(totalDesc)}</span></div>
      <div style="color:var(--muted);font-size:.8rem"><span>Itens acima de R$200</span><span>${caros.length} item(ns)</span></div>
      <div class="total-final"><span>Total a pagar</span><span>${fmt(totalDesc)}</span></div>
    </div>
  `
}

function toggleItem(id) {
  const existe = carrinho.find(i => i.id === id)
  if (existe) {
    carrinho = removerItem(carrinho, id)
  } else {
    carrinho = [...carrinho, catalogo.find(p => p.id === id)]
  }
  renderProdutos()
  renderCarrinho()
}

renderProdutos()
renderCarrinho()