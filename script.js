

let todosQuizzes = [];



pegarQuizzes();


function pegarQuizzes() {
    
    let promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    // console.log("enviou")
  
    promiseQuizzes.then(respostaQuizzes);
   
};


function respostaQuizzes(resposta){
   
    todosQuizzes = resposta.data;
    // console.log(resposta.data);
    

    renderizar ();
};


function renderizar () {

    console.log(todosQuizzes);

    let rend = document.querySelector(".todosQuizzes");

    for (let i=0; i<todosQuizzes.length; i++) {
        let objeto = todosQuizzes[i];
  
        rend.innerHTML +=  `<div class="gameQuizzes" onclick = "segundaTela (${objeto.id})"> <img class="img-quizz" src="${objeto.image}"/>  <p> ${objeto.title} </p> </div> </div>`;
            
    };
};


    function segundaTela(id) {
        console.log(id);

    }






function terceiraTela(){
    const paginaAtual = document.querySelector(".atual");
    const paginaDesejada = document.querySelector(".terceiraTela");

    paginaAtual.classList.add("desativada");
    paginaAtual.classList.remove("atual");
    paginaDesejada.classList.add("atual");
    paginaDesejada.classList.remove("desativada");
}

function telaPerguntaQuizz(){
    const titulo = document.querySelector(".infoTitulo").value;
    const url = document.querySelector(".infoUrl").value;
    const perguntas = Number(document.querySelector(".infoPerguntas").value);
    const niveis = Number(document.querySelector(".infoNiveis").value);

    if(titulo.length >= 20 || titulo.length <=65 || perguntas >= 3 || niveis >= 2 ){
        alert("tem coisa errada");
    }

    const informacoesQuizz = {
        titulo:titulo,
        url:url,
        perguntas:perguntas,
        niveis:niveis
    };

    console.log(informacoesQuizz);
    
    
}
