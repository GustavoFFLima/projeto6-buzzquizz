
let todosQuizzes = [];



pegarQuizzes();


function pegarQuizzes() {

    let promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    // console.log("enviou")

    promiseQuizzes.then(respostaQuizzes);

};


function respostaQuizzes(resposta) {

    todosQuizzes = resposta.data;
    // console.log(resposta.data);


    renderizar();
};


function renderizar() {

    console.log(todosQuizzes);

    let rend = document.querySelector(".todosQuizzes");

    for (let i = 0; i < todosQuizzes.length; i++) {
        let objeto = todosQuizzes[i];

        rend.innerHTML += `<div class="gameQuizzes" onclick = "segundaTela (${objeto.id})"> <img class="img-quizz" src="${objeto.image}"/>  <p> ${objeto.title} </p> </div> </div>`;

    };
};


function segundaTela(id) {
    console.log(id);

}
function teste2(id) {
    axios
        .get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
        .then()
}

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
            questions: '',
            levels: '',
        };

        carregarTelaPerguntaQuizz();
    } else {
        alert("Informação errada! Ajuste para prosseguir.")
    }

    console.log(informacoesQuizz);
}

function carregarTelaPerguntaQuizz() {
    const paginaAtual = document.querySelector(".infoQuizz");
    const paginaDesejada = document.querySelector(".perguntaQuizz");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

}
