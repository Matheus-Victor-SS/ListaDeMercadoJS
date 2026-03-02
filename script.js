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

        let span = document.createElement("span");
        span.textContent = `${item.nome} - ${item.qtd}x`;

        // EDITAR
        let botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';

        botaoEditar.onclick = function(){

            li.classList.add("editando");

            span.contentEditable = true;
            span.focus();

            span.onblur = function(){

                let texto = span.textContent.split("-");
                if(texto.length >= 2){
                    item.nome = texto[0].trim();
                    item.qtd = texto[1].replace("x","").trim();
                }

                span.contentEditable = false;
                li.classList.remove("editando");
            };
        };

        // REMOVER
        let botaoRemover = document.createElement("button");
        botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';

        botaoRemover.onclick = function(){
            lista.splice(inicio + index, 1);
            renderizarLista();
        };

        li.appendChild(span);
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