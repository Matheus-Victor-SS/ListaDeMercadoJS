let lista = [];
let paginaAtual = 1;
const itensPorPagina = 10;
let itemEditando = null; // Controla qual item está sendo editado

function adicionarItem(){

    let nomeInput = document.getElementById("nome");
    let qtdInput = document.getElementById("quantidade");
    let erro = document.getElementById("erro");

    let nome = nomeInput.value.trim();
    let qtd = qtdInput.value.trim();

    erro.style.display = "none";
    erro.textContent = "";

    if(nome === "" || qtd === ""){
        erro.textContent = "Preencha o nome do produto e a quantidade.";
        erro.style.display = "block";
        return;
    }

    // Converte para minúsculo apenas para comparação
    let nomeLower = nome.toLowerCase();
    let existe = lista.some(item => item.nome.toLowerCase() === nomeLower);

    if(existe){
        erro.textContent = "Este produto já foi inserido.";
        erro.style.display = "block";
        return;
    }

    lista.push({nome: nome, qtd: qtd});
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

    itensPagina.forEach((item, indexLocal) => {
        let indexReal = inicio + indexLocal;

        let li = document.createElement("li");
        
        // Se este item está sendo editado, renderiza com inputs
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

            // Evento para salvar ao pressionar Enter
            inputNome.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });
            
            inputQtd.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });

            // Evento para salvar ao perder o foco (blur) com pequeno delay
            // para não conflitar com o clique no botão de editar
            inputNome.addEventListener("blur", function() {
                setTimeout(() => salvarEdicao(indexReal, inputNome, inputQtd), 200);
            });
            
            inputQtd.addEventListener("blur", function() {
                setTimeout(() => salvarEdicao(indexReal, inputNome, inputQtd), 200);
            });

            li.appendChild(inputNome);
            li.appendChild(inputQtd);
            
            // Botão de confirmar edição (opcional, mas útil)
            let botaoConfirmar = document.createElement("button");
            botaoConfirmar.innerHTML = '<i class="fa-solid fa-check"></i>';
            botaoConfirmar.classList.add("botao-editar");
            botaoConfirmar.style.color = "#27ae60";
            botaoConfirmar.onclick = function() {
                salvarEdicao(indexReal, inputNome, inputQtd);
            };
            
            li.appendChild(botaoConfirmar);
            
        } else {
            // Modo normal de visualização
            let spanNome = document.createElement("span");
            spanNome.classList.add("nome-produto");
            spanNome.textContent = item.nome;

            let spanQtd = document.createElement("span");
            spanQtd.classList.add("quantidade");
            spanQtd.textContent = item.qtd + "x";

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
                itemEditando = null; // Limpa edição ao remover

                // Ajusta página se necessário
                if((paginaAtual - 1) * itensPorPagina >= lista.length && paginaAtual > 1){
                    paginaAtual--;
                }

                renderizarLista();
            };

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

    // Mostra ou esconde as setas baseado na página atual
    document.getElementById("btnVoltar").style.display = paginaAtual > 1 ? "flex" : "none";
    document.getElementById("btnAvancar").style.display = paginaAtual < totalPaginas ? "flex" : "none";
}

function proximaPagina(){
    const totalPaginas = Math.ceil(lista.length / itensPorPagina);

    if(paginaAtual < totalPaginas){
        const container = document.querySelector(".container");
        
        // Remove classe anterior e adiciona nova
        container.classList.remove("virando-tras");
        container.classList.add("virando-frente");

        setTimeout(() => {
            paginaAtual++;
            renderizarLista();
            container.classList.remove("virando-frente");
        }, 300);
    }
}

function paginaAnterior(){

    if(paginaAtual > 1){
        const container = document.querySelector(".container");
        
        // Remove classe anterior e adiciona nova
        container.classList.remove("virando-frente");
        container.classList.add("virando-tras");

        setTimeout(() => {
            paginaAtual--;
            renderizarLista();
            container.classList.remove("virando-tras");
        }, 300);
    }
}

// Inicializa a lista
renderizarLista();