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