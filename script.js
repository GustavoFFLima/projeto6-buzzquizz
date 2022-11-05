
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

let titleImage = '';
let questions = '';
let levels = '';

// Quantidade de perguntas da criacao do Quizz
let perguntas = 0;

// Quantidade de niveis da criacao do Quizz
let niveis = 0;

// Funcao para armazenar os valores do titulo, imagem inicial, qtde de perguntas e niveis 3.1
function telaPerguntaQuizz() {
    // Buscando os inputs
    const titulo = document.querySelector(".infoTitulo").value;
    const url = document.querySelector(".infoUrl").value;
    perguntas = Number(document.querySelector(".infoPerguntas").value);
    niveis = Number(document.querySelector(".infoNiveis").value);

    // variavel para armazenar
    let informacoesQuizz = {};

    //Verificando condicoes dos inputs e armazenando na variavel
    if (titulo.length >= 20 && titulo.length <= 65 && perguntas >= 3 && niveis >= 2) {
        informacoesQuizz = {
            title: titulo,
            image: url,
        };

        // Funcao para chamar a proxima tela
        carregarTelaPerguntaQuizz();

        // Jogar a Array para fora da funcao para poder usar no Array para mandar para o axios
        titleImage = informacoesQuizz;
    } else {
        alert("Informação errada! Ajuste para prosseguir.")
    }
}

// funcao para chamar a tela 3.2
function carregarTelaPerguntaQuizz() {
    const paginaAtual = document.querySelector(".infoQuizz");
    const paginaDesejada = document.querySelector(".perguntaQuizz");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

    carregarPaginaPerguntaQuizz();

}

//funcao para carregar o layout da tela 3.2
function carregarPaginaPerguntaQuizz() {
    let telaAtual = document.querySelector(".todasPerguntas");

    for (let i = 0; i < perguntas; i++) {
        telaAtual.innerHTML += `<div class="perguntasInfo">
        <div class="caixaUm">
            <div class="textoPergunta">Pergunta ${i + 1}</div>
            <div><input class="perguntaTela3${i + 1} Tela32" type="text" placeholder="Texto da pergunta"></div>
            <div><input class="corTela3${i + 1} Tela32" type="text" placeholder="Cor de fundo da pergunta"></div>
        </div>
        <div class="caixaUm">
            <div class="textoPergunta">Resposta correta</div>
            <div><input class="respostaTela31${i + 1} Tela32" type="text" placeholder="Resposta correta"></div>
            <div><input class="imagemTela31${i + 1} Tela32" type="url" placeholder="URL da imagem"></div>
        </div>

        
        <div class="caixaDois">
            <div class="textoPergunta">Respostas incorretas</div>
            <div><input class="respostaTela32${i + 1} Tela32" type="text" placeholder="Resposta incorreta 1"></div>
            <div><input class="imagemTela32${i + 1} Tela32" type="url" placeholder="URL da imagem 1"></div>
        </div>
        <div class="caixaDois">
            <div><input class="respostaTela33${i + 1} Tela32" type="text" placeholder="Resposta incorreta 2"></div>
            <div><input class="imagemTela33${i + 1} Tela32" type="url" placeholder="URL da imagem 2"></div>
        </div>
        <div class="caixaDois">
            <div><input class="respostaTela34${i + 1} Tela32" type="text" placeholder="Resposta incorreta 3"></div>
            <div><input class="imagemTela34${i + 1} Tela32" type="url" placeholder="URL da imagem 3"></div>
        </div>
    </div>`
    }
}

// Verificar as condicoes dos inputs da tela 3.2
function verificacaoPerguntasQuizz() {

    // rodar todos os inputs de todas as perguntas
    for (let i = 0; i < perguntas; i++) {
        let title = document.querySelector(`.perguntaTela3${i + 1}`).value;
        let color = document.querySelector(`.corTela3${i + 1}`).value;
        let text1 = document.querySelector(`.respostaTela31${i + 1}`).value;
        let image1 = document.querySelector(`.imagemTela31${i + 1}`).value;
        let text2 = document.querySelector(`.respostaTela32${i + 1}`).value;
        let image2 = document.querySelector(`.imagemTela32${i + 1}`).value;
        let text3 = document.querySelector(`.respostaTela33${i + 1}`).value;
        let image3 = document.querySelector(`.imagemTela33${i + 1}`).value;
        let text4 = document.querySelector(`.respostaTela34${i + 1}`).value;
        let image4 = document.querySelector(`.imagemTela34${i + 1}`).value;
        let letras = ['g', "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


        //verificacao do titulo, da cor e do texto e imagem das perguntas
        if (title.length < 20) {
            return alert("Informação errada! Ajuste para prosseguir.");
        } else if (color[0] == '#' && color.length == 7) {
            for (let y = 1; y < 7; y++) {
                for (let x = 0; x < letras.length; x++) {
                    if (letras[x] == color[y].toLowerCase()) {
                        return alert("Informação errada! Ajuste para prosseguir.");
                    }
                }
            }

            if ((text1 !== '' && image1 !== '') && ((text2 !== '' && image2 !== '') || (text3 !== '' && image3 !== '') || (text4 !== '' && image4 !== ''))) {
                console.log(title);
                console.log(color);
            } else {
                return alert("Informação errada! Ajuste para prosseguir.");
            }
        }
    }

    //Chamar funcao para armazenar os dados dos inputs no Array
    telaNiveisQuizz();
}

// Funcao para armazenar os dados dos inputs na tela 3.2
function telaNiveisQuizz() {

    //Array com os titulos e cores de cada pergunta
    let titulosCores = [];

    let arrayInicial = {
        title: "",
        color: ""
    };


    // armazenar o titulo da pergunta e a cor de cada pergunta;
    for (let i = 0; i < perguntas; i++) {
        let title = document.querySelector(`.perguntaTela3${i + 1}`).value;
        let color = document.querySelector(`.corTela3${i + 1}`).value;
        arrayInicial = {
            title: title,
            color: color
        };

        titulosCores.push(arrayInicial);
    }

    // Array com todas as opcoes de cada pergunta
    let answers = [];

    let textoRespostas = [];

    // realizar um Array com as 4 opcoes de resposta, e depois fazer um push para jogar para a Array de cada pergunta
    for (let i = 0; i < perguntas; i++) {
        let verdadeiro = true;
        let falso = false;
        let text1 = document.querySelector(`.respostaTela31${i + 1}`).value;
        let image1 = document.querySelector(`.imagemTela31${i + 1}`).value;
        let text2 = document.querySelector(`.respostaTela32${i + 1}`).value;
        let image2 = document.querySelector(`.imagemTela32${i + 1}`).value;
        let text3 = document.querySelector(`.respostaTela33${i + 1}`).value;
        let image3 = document.querySelector(`.imagemTela33${i + 1}`).value;
        let text4 = document.querySelector(`.respostaTela34${i + 1}`).value;
        let image4 = document.querySelector(`.imagemTela34${i + 1}`).value;

        let arrayTemporario = {
            text: text1,
            image: image1,
            isCorrectAnswer: verdadeiro,
        };

        textoRespostas.push(arrayTemporario);

        arrayTemporario = {
            text: text2,
            image: image2,
            isCorrectAnswer: falso
        };

        textoRespostas.push(arrayTemporario);

        arrayTemporario = {
            text: text3,
            image: image3,
            isCorrectAnswer: falso
        };

        textoRespostas.push(arrayTemporario);

        arrayTemporario = {
            text: text4,
            image: image4,
            isCorrectAnswer: falso
        };

        textoRespostas.push(arrayTemporario);

        // Depois do textoRespostar obter as informacoes das 4 opcoes, joga para o Array answers
        answers.push(textoRespostas);

        // Zerar o array para ele rodar o proximo for sem elementos nele
        textoRespostas = [];
    }

    // Juntar as Arrays de titulo e cor com a das questoes
    let arrayFinal = [];

    for (let y = 0; y < perguntas; y++) {
        let testeFinal = {
            title: titulosCores[y].title,
            color: titulosCores[y].color,
            answer: answers[y]
        };

        arrayFinal.push(testeFinal);
    }

    console.log(arrayFinal);

    // Jogar a Array para fora da funcao para poder usar no Array para mandar para o axios
    questions = arrayFinal;

    //Chamar a pagina para carregar a Tela 3.3
    carregarPaginaNiveisQuizz();
}



function carregarPaginaNiveisQuizz() {
    const paginaAtual = document.querySelector(".perguntaQuizz");
    const paginaDesejada = document.querySelector(".niveisQuizz");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");
}
