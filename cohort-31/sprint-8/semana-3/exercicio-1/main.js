function validarSenha(senha) {
    const temTamanho = senha.length >= 8;
    const temNumero = /[0-9]/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temEspecial = /[!@#$%^&*]/.test(senha);
    const pontos = [temTamanho, temNumero, temMaiuscula, temEspecial].filter(
        Boolean
    ).length;
    const forca = pontos === 4 ? 'forte' : pontos >= 2 ? 'média' : 'fraca';
    return { temTamanho, temNumero, temMaiuscula, temEspecial, forca };
}

function icon(ok) {
    return ok ? '<span class="ok">✔</span>' : '<span class="fail">✘</span>';
}

function testar() {
    const senha = document.getElementById('senhaInput').value;
    if (!senha) return;
    const r = validarSenha(senha);
    const forcaClass =
        r.forca === 'forte' ? 'strong' : r.forca === 'média' ? 'medium' : 'weak';
    document.getElementById('resultado').innerHTML = `
            ${icon(r.temTamanho)} Mínimo 8 caracteres (tem ${senha.length})<br>
${icon(r.temNumero)} Contém número<br>
${icon(r.temMaiuscula)} Contém letra maiúscula<br>
${icon(r.temEspecial)} Contém caractere especial<br><br>
Força: <span class="${forcaClass}">${r.forca.toUpperCase()}</span>
  `;
    document.getElementById('resultado').classList.add('show');
}
