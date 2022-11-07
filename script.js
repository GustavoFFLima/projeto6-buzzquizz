
let todosQuizzes = [];
let quizzSelecionado = [];
let niveldojogador = [];



pegarQuizzes();


function pegarQuizzes() {

    let promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    promiseQuizzes.then(respostaQuizzes);

};


function respostaQuizzes(resposta) {

    todosQuizzes = resposta.data;


    renderizar();
};


function renderizar() {

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
};

let contadorRespostaFeitas = 0;
let contadorAcerto = 0;
let contadorQuestoes = 0;

function renderizarSegundaTela(resposta){
    contadorQuestoes = resposta.data.questions.length;
    quizzSelecionado = resposta.data;
    niveldojogador = quizzSelecionado.levels;

    let rend = document.querySelector(".segundaTela");
    rend.innerHTML =
        `<div class="partida">   
        <img class="imagemLogo" src="${resposta.data.image}"/>  
        <p class="tituloLogo">${resposta.data.title}</p> 
    </div>
    <div class="questoesQuizz"></div>`;

    for (let i = 0; i < resposta.data.questions.length; i++) {
        let rend2 = document.querySelector(".questoesQuizz");
        rend2.innerHTML +=
            `<div class="questaoPartida">   
            <div class="imagemQuestao" style="background-color: ${resposta.data.questions[i].color}">
                <p class="tituloQuestao">${resposta.data.questions[i].title}</p> 
            </div>  
            <div class="respostasQuizz"></div>
        </div>`;
        for(let g = 0; g < resposta.data.questions[i].answers.length; g++) {
            let rend3 = document.querySelector(".questoesQuizz");
            rend3.children[i].children[1].innerHTML += 
            `<div class="respostaPartida" data-charactes="${resposta.data.questions[i].answers[g].isCorrectAnswer}" onclick="respostaCorreta(this)" disabled="false">
                <img class="imagemResposta" src="${resposta.data.questions[i].answers[g].image}"/>
                <p class="tituloResposta">${resposta.data.questions[i].answers[g].text}</p>
            </div>`;
        };
    };
    rend.innerHTML+= `<div class="resultadoTela desativada"></div>`

};

function respostaCorreta(selecionada) {
    if(selecionada.getAttribute('data-charactes') == "true") {
        contadorAcerto++;
    }
    contadorRespostaFeitas++;
    //Andre coloca o chamado da sua fenção;
    if(contadorRespostaFeitas == contadorQuestoes) {
        setTimeout(resultados, 2000);
    }
};

function resultados(){
    const paginaDesejada = document.querySelector(".resultadoTela");

    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

    let resultado =  (contadorAcerto / contadorQuestoes) * 100;
    paginaDesejada.innerHTML += 
    `<div>
        <div class="tituloResultado">
            <p class="resultadoNivel">Você acertou ${parseInt(resultado)}%, quer tentar mais uma vez?</p>
        </div>
        <div class"itensNivel">
            <div>
                <img class="imagemNivel" src="${niveldojogador[0].image}" />
            </div>
            <div>
                <p class="tituloNivel">${niveldojogador[0].title}</p>
                <p class="textoNivel">${niveldojogador[0].text}</p>
            </div>
        </div> 
        <div class="retorno">
            <button class="reiniciar" onclick="reiniciar()">Reiniciar Quizz</button>
            <button class="home" onclick="home()">Voltar pra home</button>
        </div> 
    </div>`

    const elementoQueQueroQueApareca = document.querySelector('.home');
    elementoQueQueroQueApareca.scrollIntoView();
};

function reiniciar() { 
    contadorRespostaFeitas = 0;
    contadorAcerto = 0;
    contadorQuestoes = 0;

    let apagar = document.querySelector(".todosQuizzes");
    apagar.innerHTML =``;
    renderizar();
    segundaTela(quizzSelecionado.id);
};

function home() {
    window.location.reload();
    const elementoQueQueroQueApareca = document.querySelector('.cabecalho');
    elementoQueQueroQueApareca.scrollIntoView();
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

        if (checkUrl(url) == false) {
            return alert("Informação errada! Ajuste para prosseguir.");
        }

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


function checkUrl(string) {
    try {
        new URL(string)
        return true;
    } catch (err) {
        return false;
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

            if ((text1 !== '' && checkUrl(image1) == true && image1!='') && ((text2 !== '' && checkUrl(image2) == true && image2!='') || (text3 !== '' && checkUrl(image3) == true && image3!='') || (text4 !== '' && checkUrl(image4) == true && image4!=''))) {

            } else {
                return alert("Informação errada! Ajuste para prosseguir.");
            }
        } else {
            return alert("Informação errada! Ajuste para prosseguir.");
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

    // Jogar a Array para fora da funcao para poder usar no Array para mandar para o axios
    questions = arrayFinal;

    //Chamar a pagina para carregar a Tela 3.3
    carregarTelaNiveisQuizz();
}



function carregarTelaNiveisQuizz() {
    const paginaAtual = document.querySelector(".perguntaQuizz");
    const paginaDesejada = document.querySelector(".niveisQuizz");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

    carregarPaginaNiveisQuizz();
}


function carregarPaginaNiveisQuizz() {
    let telaAtual = document.querySelector(".todosNiveis");

    for (let i = 0; i < niveis; i++) {
        telaAtual.innerHTML += `<div class="caixaNivel">
        <div class="caixaTeste">
            <div class="textoPergunta">Nivel ${i + 1}</div>
            <div><input class="tituloNivel${i + 1} Tela32" type="text" placeholder="Título do nível"></div>
            <div><input class="acertoNivel${i + 1} Tela32" type="number" placeholder="% de acerto mínima">
            </div>
            <div><input class="urlNivel${i + 1} Tela32" type="text" placeholder="URL da imagem do nível">
            </div>
            <div><input class="descricaoNivel${i + 1} Tela32" type="text" placeholder="Descrição do nível">
            </div>
        </div>
    </div>`}
}

let arrayLevels = [];
function verificacaoNiveisQuizz() {
    let verificarZero = '';

        for (y = 0;y < niveis; y++){
            let temZero = Number(document.querySelector(`.acertoNivel${y + 1}`).value);
            if(temZero == 0){
                verificarZero += 1;
            }
        }

        if(verificarZero ==1){

            for (let i = 0; i < niveis; i++) {
                let title = document.querySelector(`.tituloNivel${i + 1}`).value;
                let acerto = Number(document.querySelector(`.acertoNivel${i + 1}`).value);
                let url = document.querySelector(`.urlNivel${i + 1}`).value;
                let descricao = document.querySelector(`.descricaoNivel${i + 1}`).value;
                
                    if (title.length < 10 || acerto > 100 || acerto < 0 || checkUrl(url) == false || descricao < 30){
                        return alert("Informação errada! Ajuste para prosseguir.");
                    }
            
                    let arrayNivel = {
                        title:title,
                        image:url,
                        text:descricao,
                        minValue:acerto
                    };
            
                    arrayLevels.push(arrayNivel);
            }
        } else {
            return alert("Informação errada! Ajuste para prosseguir.")
        }

        realizarArrayPost();
}


function realizarArrayPost() {

    let arrayPost = {
        title:titleImage.title,
        image:titleImage.image,
        questions:questions,
        levels:arrayLevels
    };

    mandarArrayPost();
}

function mandarArrayPost(){

    let promisePost = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    

    promisePost.then(carregarTelaSucessoQuizz);
}

function carregarTelaSucessoQuizz(resposta) {
    localStorage.setItem("id", resposta.data.id);
    const paginaAtual = document.querySelector(".niveisQuizz");
    const paginaDesejada = document.querySelector(".sucessoQuizz");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");

    carregarPaginaSucessoQuizz();
}

function carregarPaginaSucessoQuizz(){

}

