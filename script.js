let lista = [];
let paginaAtual = 1;
const itensPorPagina = 15;

function adicionarItem(){

    let nomeInput = document.getElementById("nome");
    let qtdInput = document.getElementById("quantidade");

    let nome = nomeInput.value.trim();
    let qtd = qtdInput.value.trim();

    if(nome !== "" && qtd !== ""){

        lista.push({nome: nome, qtd: qtd});
        nomeInput.value = "";
        qtdInput.value = "";

        renderizarLista();
    }
}

function renderizarLista(){

    const ul = document.getElementById("lista");
    ul.innerHTML = "";

    let inicio = (paginaAtual - 1) * itensPorPagina;
    let fim = inicio + itensPorPagina;

    let itensPagina = lista.slice(inicio, fim);

    itensPagina.forEach((item, index) => {

        let li = document.createElement("li");

        // NOME
        let spanNome = document.createElement("span");
        spanNome.classList.add("nome-produto");
        spanNome.textContent = item.nome;

        // QUANTIDADE
        let spanQtd = document.createElement("span");
        spanQtd.classList.add("quantidade");
        spanQtd.textContent = item.qtd + "x";

        // EDITAR
        let botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';

        botaoEditar.onclick = function(){

            li.classList.add("editando");

            spanNome.contentEditable = true;
            spanQtd.contentEditable = true;

            spanNome.focus();

            function finalizarEdicao(){
                item.nome = spanNome.textContent.trim();
                item.qtd = spanQtd.textContent.replace("x","").trim();

                spanNome.contentEditable = false;
                spanQtd.contentEditable = false;

                spanQtd.textContent = item.qtd + "x";

                li.classList.remove("editando");

                spanNome.removeEventListener("blur", finalizarEdicao);
                spanQtd.removeEventListener("blur", finalizarEdicao);
            }

            spanNome.addEventListener("blur", finalizarEdicao);
            spanQtd.addEventListener("blur", finalizarEdicao);
        };

        // REMOVER
        let botaoRemover = document.createElement("button");
        botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';

        botaoRemover.onclick = function(){
            lista.splice(inicio + index, 1);
            renderizarLista();
        };

        li.appendChild(spanNome);
        li.appendChild(spanQtd);
        li.appendChild(botaoEditar);
        li.appendChild(botaoRemover);

        ul.appendChild(li);
    });

    atualizarInfoPagina();
}

function atualizarInfoPagina(){
    const totalPaginas = Math.ceil(lista.length / itensPorPagina) || 1;
    document.getElementById("infoPagina").textContent =
        `Página ${paginaAtual} de ${totalPaginas}`;
}

function proximaPagina(){
    const totalPaginas = Math.ceil(lista.length / itensPorPagina);
    if(paginaAtual < totalPaginas){
        paginaAtual++;
        renderizarLista();
    }
}

function paginaAnterior(){
    if(paginaAtual > 1){
        paginaAtual--;
        renderizarLista();
    }
}

renderizarLista();