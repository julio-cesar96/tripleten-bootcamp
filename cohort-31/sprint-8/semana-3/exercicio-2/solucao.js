const products = [
  { id: 1, nome: 'Teclado Mecânico', preco: 350,  qtd: 1 },
  { id: 2, nome: 'Mouse Gamer',      preco: 180,  qtd: 1 },
  { id: 3, nome: 'Monitor 24"',      preco: 1200, qtd: 1 },
  { id: 4, nome: 'Headset',          preco: 250,  qtd: 1 },
]

const totalPrice = (itens) => {
    return itens.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
}

const applyDiscount = (itens, pct) => {
    return totalPrice(itens) * (1 - pct / 100);
}

const removeItem = (itens, id) => {
    return itens.filter(item => item.id !== id);
}

const carItens = (itens, limite) => {
    return itens.filter(item => item.preco > limite);
}