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
    }
}

function paginaAnterior() {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderizar();
    }
}