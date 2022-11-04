

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
  
        rend.innerHTML +=  `<div class="teste" onclick = "teste2 (${objeto.id})"> <img class="img-quizz" src="${objeto.image}"/>  <p> ${objeto.title} </p> </div> </div>`;
            
    };
};


    function teste2(id) {
        console.log(id);

    }















    // const nQuizzes = quizzes.length;
    // let isYourQuizz = false;
    
    //percorrer lista de quizzes e imprimir a preview de cada um
//     for(let i = 0; i < quizzes; i++){
        
//         const img = quizzes[i].image;
//         const title = quizzes[i].title;
//         const id = quizzes[i].id;
        
//         // if(your_ids_array !== null){
//         //     for(let j = 0; j < your_ids_array.length; j++){
//         //         if(quizzes[i].id === your_ids_array[j]){
//         //             renderQuizz(todosQuizzes, img, title, id);
//         //             isYourQuizz = true;
//         //         }
//         //     }
//         // }
//         // if(!isYourQuizz){
//         //     renderQuizz(todosQuizzes, img, title, id);
//         // }
//         // isYourQuizz = false;
        
//     }
// }

// function renderizarQuizz(span, img, title, id) {
//     span.innerHTML +=
//     `
//     <div class="quizz-preview" id="${id}" onclick="takeThisQuizz(this)" data-identifier="quizz-card">
//         <img src="${img}" alt="quizz preview">
//         <p>${title}</p>
//     </div>
//     `;
    
    //onclick directs user to that quizz
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
