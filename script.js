function terceiraTela() {
    const paginaAtual = document.querySelector(".atual");
    const paginaDesejada = document.querySelector(".terceiraTela");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");
}

let perguntas = 0;
let niveis = 0;
function telaPerguntaQuizz() {
    const titulo = document.querySelector(".infoTitulo").value;
    const url = document.querySelector(".infoUrl").value;
    perguntas = Number(document.querySelector(".infoPerguntas").value);
    niveis = Number(document.querySelector(".infoNiveis").value);
    let informacoesQuizz = {};

    if (titulo.length >= 20 && titulo.length <= 65 && perguntas >= 3 && niveis >= 2) {
        informacoesQuizz = {
            title: titulo,
            image: url,
            questions:'',
            levels:'',
        };

        carregarTelaPerguntaQuizz();
    } else {
        alert("Informação errada! Ajuste para prosseguir.")
    }

    console.log(informacoesQuizz);
}

function carregarTelaPerguntaQuizz(){
    const paginaAtual = document.querySelector(".infoQuizz");
    const paginaDesejada = document.querySelector(".perguntaQuizz");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

}