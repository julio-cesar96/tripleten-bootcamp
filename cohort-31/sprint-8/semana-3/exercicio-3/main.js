let tabuleiro = Array(9).fill('')
let jogadorAtual = 'X'
let jogoAtivo = true
const placar = { X: 0, O: 0 }

const COMBINACOES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

const verificarVitoria = (j) => COMBINACOES.some(c => c.every(i => tabuleiro[i] === j))
const verificarEmpate = () => tabuleiro.every(c => c !== '')

const renderizarCelula = (i) => {
  const cel = document.querySelector(`[data-i="${i}"]`)
  cel.textContent = tabuleiro[i]
  cel.classList.add('taken', tabuleiro[i].toLowerCase())
}

const renderizarTabuleiro = () => {
  document.querySelectorAll('.cell').forEach(cel => { cel.textContent = ''; cel.className = 'cell' })
}

const destacarVitoria = (j) => {
  COMBINACOES.find(c => c.every(i => tabuleiro[i] === j))?.forEach(i => {
    document.querySelector(`[data-i="${i}"]`).classList.add('win')
  })
}

const mostrarMensagem = txt => { document.getElementById('msg').textContent = txt }

const atualizarStatus = () => {
  document.getElementById('msg').textContent = `Vez do jogador ${jogadorAtual}`
  document.getElementById('px').classList.toggle('ativo', jogadorAtual === 'X')
  document.getElementById('po').classList.toggle('ativo', jogadorAtual === 'O')
  document.getElementById('pts-x').textContent = `${placar.X} pts`
  document.getElementById('pts-o').textContent = `${placar.O} pts`
}

const jogar = (index) => {
  if (!jogoAtivo || tabuleiro[index] !== '') return
  tabuleiro[index] = jogadorAtual
  renderizarCelula(index)
  if (verificarVitoria(jogadorAtual)) {
    placar[jogadorAtual]++
    mostrarMensagem(`Jogador ${jogadorAtual} venceu! 🎉`)
    destacarVitoria(jogadorAtual)
    document.getElementById('pts-x').textContent = `${placar.X} pts`
    document.getElementById('pts-o').textContent = `${placar.O} pts`
    jogoAtivo = false
  } else if (verificarEmpate()) {
    mostrarMensagem('Empate! Ninguém ganhou.')
    jogoAtivo = false
  } else {
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
    atualizarStatus()
  }
}

const reiniciar = () => {
  tabuleiro = Array(9).fill('')
  jogadorAtual = 'X'
  jogoAtivo = true
  renderizarTabuleiro()
  atualizarStatus()
}

document.querySelectorAll('.cell').forEach(cel => {
  cel.addEventListener('click', () => jogar(Number(cel.dataset.i)))
})