let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroSecreto ();
let tentativas = 1;

function abrirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial() {
    abrirTextoNaTela('h1', 'Jogo do numero secreto');
    abrirTextoNaTela('p', 'Escolha um numero de 1 a 10');   
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value

    if (chute == numeroSecreto) {
        abrirTextoNaTela ('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Voce acertou o numero secreto com ${tentativas} ${palavraTentativa}.`
        abrirTextoNaTela ('p', mensagensTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if (chute > numeroSecreto) {
            abrirTextoNaTela ('p', 'O numero secreto é menor.');
        }else {
            abrirTextoNaTela ('p', 'O numero secreto é maior.');
        }
    }tentativas++;
    limparCampo();
}

function gerarNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroSecreto();
    }else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}