let itens = [];
let paginaAtual = 1;
const itensPorPagina = 10;

function adicionarItem() {
    const nome = document.getElementById("nome").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
    const erro = document.getElementById("erro");

    if (!nome || !quantidade) return;

    if (itens.some(item => item.nome.toLowerCase() === nome.toLowerCase())) {
        erro.style.display = "block";
        erro.textContent = "Este item já foi adicionado na lista.";
        return;
    }

    erro.style.display = "none";

    itens.push({ nome, quantidade });
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";

    renderizar();
}

function renderizar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPagina = itens.slice(inicio, fim);

    itensPagina.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="item-info">
                <span>${item.nome}</span>
                <span class="qtd">${item.quantidade}x</span>
            </div>
            <div class="acoes">
                <i class="fa-solid fa-pen" onclick="editarItem(${inicio + index})"></i>
                <i class="fa-solid fa-trash" onclick="removerItem(${inicio + index})"></i>
            </div>
        `;

        lista.appendChild(li);
    });

    document.getElementById("numeroPagina").textContent = paginaAtual;

    document.getElementById("btnVoltar").style.display =
        paginaAtual > 1 ? "block" : "none";

    document.getElementById("btnAvancar").style.display =
        fim < itens.length ? "block" : "none";
}

function removerItem(index) {
    itens.splice(index, 1);
    renderizar();
}

function editarItem(index) {
    const novoNome = prompt("Editar nome:", itens[index].nome);
    const novaQtd = prompt("Editar quantidade:", itens[index].quantidade);

    if (novoNome && novaQtd) {
        itens[index].nome = novoNome;
        itens[index].quantidade = novaQtd;
        renderizar();
    }
}

function proximaPagina() {
    if (paginaAtual * itensPorPagina < itens.length) {
        paginaAtual++;
        renderizar();
    }let lista = [];
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
        erro.textContent = "Este produto já foi inserido.";
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
        botaoEditar.classList.add("botao-editar");

        botaoEditar.onclick = function(){
            let inputNome = document.createElement("input");
            inputNome.value = item.nome;

            let inputQtd = document.createElement("input");
            inputQtd.type = "number";
            inputQtd.value = item.qtd;

            li.replaceChild(inputNome, spanNome);
            li.replaceChild(inputQtd, spanQtd);

            inputNome.focus();

            function salvar(){
                item.nome = inputNome.value.trim();
                item.qtd = inputQtd.value.trim();
                renderizarLista();
            }

            inputNome.addEventListener("blur", salvar);
            inputQtd.addEventListener("blur", salvar);
        };

        let botaoRemover = document.createElement("button");
        botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoRemover.classList.add("botao-remover");

        botaoRemover.onclick = function(){
            lista.splice(inicio + index, 1);

            if((paginaAtual - 1) * itensPorPagina >= lista.length && paginaAtual > 1){
                paginaAtual--;
            }

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
    document.getElementById("numeroPagina").textContent = paginaAtual;

    document.getElementById("btnVoltar").style.display = paginaAtual > 1 ? "flex" : "none";
    document.getElementById("btnAvancar").style.display = paginaAtual < totalPaginas ? "flex" : "none";
}

function proximaPagina(){
    const totalPaginas = Math.ceil(lista.length / itensPorPagina);

    if(paginaAtual < totalPaginas){
        const container = document.querySelector(".container");

        container.classList.add("pagina-animando");

        setTimeout(() => {
            paginaAtual++;
            renderizarLista();
            container.classList.remove("pagina-animando");
        }, 350);
    }
}

function paginaAnterior(){
    if(paginaAtual > 1){
        const container = document.querySelector(".container");

        container.classList.add("pagina-animando");

        setTimeout(() => {
            paginaAtual--;
            renderizarLista();
            container.classList.remove("pagina-animando");
        }, 350);
    }
}

renderizarLista();
}

function paginaAnterior() {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderizar();
    }
}