let lista = [];
let paginaAtual = 1;
const itensPorPagina = 10;

function adicionarItem(){

    let nomeInput = document.getElementById("nome");
    let qtdInput = document.getElementById("quantidade");
    let erro = document.getElementById("erro");

    let nome = nomeInput.value.trim().toLowerCase();
    let qtd = qtdInput.value.trim();

    erro.style.display = "none";
    erro.textContent = "";

    if(nome === "" || qtd === ""){
        erro.textContent = "Preencha o nome do produto e a quantidade.";
        erro.style.display = "block";
        return;
    }

    let existe = lista.some(item => item.nome.toLowerCase() === nome);

    if(existe){
        erro.textContent = "Este produto já foi inserido na lista. Não é permitido adicionar produtos repetidos.";
        erro.style.display = "block";
        return;
    }

    lista.push({nome: nomeInput.value.trim(), qtd: qtd});

    nomeInput.value = "";
    qtdInput.value = "";

    renderizarLista();
}

function renderizarLista(){

    const ul = document.getElementById("lista");
    ul.innerHTML = "";

    let inicio = (paginaAtual - 1) * itensPorPagina;
    let fim = inicio + itensPorPagina;

    let itensPagina = lista.slice(inicio, fim);

    itensPagina.forEach((item, index) => {

        let li = document.createElement("li");

        let spanNome = document.createElement("span");
        spanNome.classList.add("nome-produto");
        spanNome.textContent = item.nome;

        let spanQtd = document.createElement("span");
        spanQtd.classList.add("quantidade");
        spanQtd.textContent = item.qtd + "x";

        let botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';

        botaoEditar.onclick = function(){

            li.classList.add("editando");

            let inputNome = document.createElement("input");
            inputNome.value = item.nome;
            inputNome.classList.add("input-edicao");

            let inputQtd = document.createElement("input");
            inputQtd.type = "number";
            inputQtd.min = "1";
            inputQtd.value = item.qtd;
            inputQtd.classList.add("input-edicao-qtd");

            li.replaceChild(inputNome, spanNome);
            li.replaceChild(inputQtd, spanQtd);

            inputNome.focus();

            function salvarSeClicarFora(e){
                if(!li.contains(e.target)){
                    salvar();
                }
            }

            function salvar(){

                item.nome = inputNome.value.trim();
                item.qtd = inputQtd.value.trim();

                spanNome.textContent = item.nome;
                spanQtd.textContent = item.qtd + "x";

                li.replaceChild(spanNome, inputNome);
                li.replaceChild(spanQtd, inputQtd);

                li.classList.remove("editando");

                document.removeEventListener("click", salvarSeClicarFora);
            }

            setTimeout(() => {
                document.addEventListener("click", salvarSeClicarFora);
            }, 0);
        };

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