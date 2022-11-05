
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
    const paginaAtual = document.querySelector(".atual");
    const paginaDesejada = document.querySelector(".segundaTela");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

    axios
        .get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
        .then(renderizarSegundaTela)
}

function renderizarSegundaTela(resposta){

    let rend = document.querySelector(".segundaTela");
    rend.innerHTML = 
    `<div class="partida">   
        <img class="imagemLogo" src="${resposta.data.image}"/>  
        <p class="tituloLogo">${resposta.data.tittle}</p> 
    </div>
    <div class="questoesQuizz"></div>`;

    for(let i = 0; i < resposta.data.questions.length; i++) {
        let rend2 = document.querySelector(".questoesQuizz");
        rend2.innerHTML += 
        `<div class="questaoPartida">   
            <div class="imagemQuestao" style="background color: ${resposta.data.questions[i].color}">
                <p class="tituloQuestao">${resposta.data.questions[i].title}</p> 
            </div>  
            <div class="respostasQuizz"></div>
        </div>`;
        console.log(resposta.data.questions);
        console.log(resposta.data.questions[i].answers.length);
        for(let g = 0; g < resposta.data.questions[i].answers.length; g++) {
            let rend3 = document.querySelector(".questoesQuizz");
            rend3.children[i].children[1].innerHTML += 
            `<div class="respostaPartida" data-charactes="${resposta.data.questions[i].answers[g].isCorrectAnswer}" onclick="respostaCorreta(this)">
                <img class="imagemResposta" src="${resposta.data.questions[i].answers[g].image}"/>
                <p class="tituloResposta">${resposta.data.questions[i].answers[g].text}</p>
            </div>`;
        };
    };

};

function respostaCorreta(selecionada) {
    // function prato(itemClicado) {
    //     const botaoSel = document.querySelector('.prato2');
    //     if ( botaoSel !== null) {
    //         botaoSel.classList.remove('prato2');
    //         botaoSel.children[3].children[1].classList.add('prato1');
    //     }
    //     itemClicado.children[3].children[1].classList.toggle('prato1');
    //     itemClicado.classList.toggle('prato2');
    //     if (document.querySelector('.prato2') && document.querySelector('.bebida2') && document.querySelector('.sobremesa2')) {
    //         document.querySelector('.botao').children[0].classList.add('comprafechada');
    //     }
    // }
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
