let lista = [];
let paginaAtual = 1;
const itensPorPagina = 8;
let itemEditando = null;

function adicionarItem(){

    let nomeInput = document.getElementById("nome");
    let qtdInput = document.getElementById("quantidade");
    let erro = document.getElementById("erro");

    let nome = nomeInput.value.trim();
    let qtd = qtdInput.value.trim();

    erro.style.display = "none";
    erro.textContent = "";

    if(nome === "" || qtd === ""){
        erro.textContent = "Preencha o nome do produto e a quantidade! ✏️";
        erro.style.display = "block";
        return;
    }

    let nomeLower = nome.toLowerCase();
    let existe = lista.some(item => item.nome.toLowerCase() === nomeLower);

    if(existe){
        erro.textContent = "Este produto já foi inserido! 🛒";
        erro.style.display = "block";
        return;
    }

    lista.push({
        nome: nome,
        qtd: qtd,
        checked: false
    });
    
    nomeInput.value = "";
    qtdInput.value = "";

    renderizarLista();
}

function toggleCheck(index) {
    lista[index].checked = !lista[index].checked;
    renderizarLista();
}

function renderizarLista(){

    const ul = document.getElementById("lista");
    ul.innerHTML = "";

    let inicio = (paginaAtual - 1) * itensPorPagina;
    let fim = inicio + itensPorPagina;
    let itensPagina = lista.slice(inicio, fim);

    itensPagina.forEach((item, indexLocal) => {
        let indexReal = inicio + indexLocal;

        let li = document.createElement("li");
        
        // Se item está sendo editado
        if (itemEditando === indexReal) {
            li.classList.add("editando");
            
            let inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.value = item.nome;
            inputNome.classList.add("input-edicao-nome");

            let inputQtd = document.createElement("input");
            inputQtd.type = "number";
            inputQtd.value = item.qtd;
            inputQtd.min = "1";
            inputQtd.classList.add("input-edicao-qtd");

            // SOMENTE a tecla Enter salva, BLUR foi REMOVIDO
            inputNome.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });
            
            inputQtd.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });

            // NÃO TEM MAIS O EVENTO BLUR!

            li.appendChild(inputNome);
            li.appendChild(inputQtd);
            
            let botaoConfirmar = document.createElement("button");
            botaoConfirmar.innerHTML = '<i class="fa-solid fa-check"></i>';
            botaoConfirmar.classList.add("botao-confirmar");
            botaoConfirmar.onclick = function() {
                salvarEdicao(indexReal, inputNome, inputQtd);
            };
            
            li.appendChild(botaoConfirmar);
            
        } else {
            // Modo normal com checkbox
            let checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add("checkbox-wrapper");
            
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.checked || false;
            checkbox.onchange = function() {
                toggleCheck(indexReal);
            };
            
            checkboxWrapper.appendChild(checkbox);

            let spanNome = document.createElement("span");
            spanNome.classList.add("nome-produto");
            spanNome.textContent = item.nome;

            let spanQtd = document.createElement("span");
            spanQtd.classList.add("quantidade");
            spanQtd.textContent = item.qtd + "x";

            if (item.checked) {
                li.classList.add("item-riscado");
            }

            let botaoEditar = document.createElement("button");
            botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
            botaoEditar.classList.add("botao-editar");
            botaoEditar.onclick = function() {
                itemEditando = indexReal;
                renderizarLista();
            };

            let botaoRemover = document.createElement("button");
            botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
            botaoRemover.classList.add("botao-remover");
            botaoRemover.onclick = function() {
                lista.splice(indexReal, 1);
                itemEditando = null;

                if((paginaAtual - 1) * itensPorPagina >= lista.length && paginaAtual > 1){
                    paginaAtual--;
                }

                renderizarLista();
            };

            li.appendChild(checkboxWrapper);
            li.appendChild(spanNome);
            li.appendChild(spanQtd);
            li.appendChild(botaoEditar);
            li.appendChild(botaoRemover);
        }

        ul.appendChild(li);
    });

    atualizarInfoPagina();
}

function salvarEdicao(index, inputNome, inputQtd) {
    if (!inputNome || !inputQtd) return;
    
    let novoNome = inputNome.value.trim();
    let novoQtd = inputQtd.value.trim();
    
    if (novoNome && novoQtd) {
        lista[index].nome = novoNome;
        lista[index].qtd = novoQtd;
    }
    
    itemEditando = null;
    renderizarLista();
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