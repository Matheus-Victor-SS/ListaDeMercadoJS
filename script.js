let lista = [];
let paginaAtual = 1;
const itensPorPagina = 8;
let itemEditando = null;

// Controle de música
let musicaTocando = false;
const audioMusica = document.getElementById('musicaFundo');
const controleMusica = document.getElementById('controleMusica');
const iconeMusica = document.getElementById('iconeMusica');

// Elementos de áudio para efeitos
const sons = {
    adicionar: document.getElementById('somAdicionar'),
    editar: document.getElementById('somEditar'),
    salvar: document.getElementById('somSalvar'),
    excluir: document.getElementById('somExcluir'),
    riscar: document.getElementById('somRiscar'),
    pagina: document.getElementById('somPagina')
};

// Configurar volumes e pré-carregar sons
for (let key in sons) {
    if (sons[key]) {
        sons[key].volume = 0.3;
        sons[key].load(); // Pré-carrega o som
    }
}
audioMusica.volume = 0.2;

// Função para tocar som (melhorada)
function tocarSom(tipo) {
    if (!musicaTocando) return; // Só toca se a música estiver ativa
    
    const som = sons[tipo];
    if (som) {
        // Tenta tocar o som
        som.currentTime = 0; // Reinicia
        som.play().catch(e => {
            console.log(`Erro ao tocar som ${tipo}:`, e);
            // Se falhar, tenta criar um som temporário
            try {
                const audioTemp = new Audio(som.querySelector('source').src);
                audioTemp.volume = 0.3;
                audioTemp.play().catch(err => console.log('Fallback também falhou'));
            } catch(err) {
                console.log('Não foi possível tocar som');
            }
        });
    }
}

// Controle da música de fundo
controleMusica.addEventListener('click', function() {
    if (musicaTocando) {
        audioMusica.pause();
        iconeMusica.className = 'fa-solid fa-volume-off';
        controleMusica.classList.add('musica-desligada');
        
        // Pausa todos os sons
        for (let key in sons) {
            if (sons[key]) sons[key].pause();
        }
    } else {
        audioMusica.play().catch(e => console.log("Erro ao tocar música"));
        iconeMusica.className = 'fa-solid fa-music';
        controleMusica.classList.remove('musica-desligada');
    }
    musicaTocando = !musicaTocando;
});

// Tenta tocar música automaticamente
window.addEventListener('load', function() {
    // Pré-carrega todos os áudios
    for (let key in sons) {
        if (sons[key]) sons[key].load();
    }
    
    audioMusica.play().then(() => {
        musicaTocando = true;
        iconeMusica.className = 'fa-solid fa-music';
    }).catch(e => {
        musicaTocando = false;
        iconeMusica.className = 'fa-solid fa-volume-off';
        controleMusica.classList.add('musica-desligada');
    });
});

function adicionarItem(){
    tocarSom('adicionar');

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

    if (nome.length > 30) {
        erro.textContent = "Nome muito longo! Máximo 30 caracteres.";
        erro.style.display = "block";
        return;
    }

    if (parseInt(qtd) > 999) {
        erro.textContent = "Quantidade máxima é 999!";
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
    
    // Toca som de riscar apenas se estiver marcando
    if (lista[index].checked) {
        tocarSom('riscar');
    }
    
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
            inputNome.maxLength = 30;

            let inputQtd = document.createElement("input");
            inputQtd.type = "number";
            inputQtd.value = item.qtd;
            inputQtd.min = "1";
            inputQtd.max = "999";
            inputQtd.classList.add("input-edicao-qtd");

            inputNome.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });
            
            inputQtd.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });

            li.appendChild(inputNome);
            li.appendChild(inputQtd);
            
            let botaoConfirmar = document.createElement("button");
            botaoConfirmar.innerHTML = '<i class="fa-solid fa-check"></i>';
            botaoConfirmar.classList.add("botao-confirmar");
            botaoConfirmar.onclick = function() {
                salvarEdicao(indexReal, inputNome, inputQtd);
                tocarSom('salvar');
            };
            
            li.appendChild(botaoConfirmar);
            
        } else {
            // Modo normal com checkbox - CORRIGIDO
            let checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add("checkbox-wrapper");
            
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.checked || false;
            
            // Usando onchange para capturar mudanças no checkbox
            checkbox.addEventListener('change', function() {
                toggleCheck(indexReal);
            });
            
            checkboxWrapper.appendChild(checkbox);

            let nomeContainer = document.createElement("div");
            nomeContainer.classList.add("nome-container");

            let spanNome = document.createElement("span");
            spanNome.classList.add("nome-produto");
            spanNome.textContent = item.nome;
            
            nomeContainer.appendChild(spanNome);

            let spanQtd = document.createElement("span");
            spanQtd.classList.add("quantidade");
            spanQtd.textContent = item.qtd + "x";

            let botoesContainer = document.createElement("div");
            botoesContainer.classList.add("botoes-container");

            let botaoEditar = document.createElement("button");
            botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
            botaoEditar.classList.add("botao-editar");
            botaoEditar.onclick = function() {
                itemEditando = indexReal;
                tocarSom('editar');
                renderizarLista();
            };

            let botaoRemover = document.createElement("button");
            botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
            botaoRemover.classList.add("botao-remover");
            botaoRemover.onclick = function() {
                tocarSom('excluir');
                lista.splice(indexReal, 1);
                itemEditando = null;

                if((paginaAtual - 1) * itensPorPagina >= lista.length && paginaAtual > 1){
                    paginaAtual--;
                }

                renderizarLista();
            };

            botoesContainer.appendChild(botaoEditar);
            botoesContainer.appendChild(botaoRemover);

            if (item.checked) {
                li.classList.add("item-riscado");
            }

            li.appendChild(checkboxWrapper);
            li.appendChild(nomeContainer);
            li.appendChild(spanQtd);
            li.appendChild(botoesContainer);
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
        if (novoNome.length <= 30 && parseInt(novoQtd) <= 999) {
            lista[index].nome = novoNome;
            lista[index].qtd = novoQtd;
        }
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
        tocarSom('pagina'); // Som de virar página
        paginaAtual++;
        renderizarLista();
    }
}

function paginaAnterior(){
    if(paginaAtual > 1){
        tocarSom('pagina'); // Som de virar página
        paginaAtual--;
        renderizarLista();
    }
}

renderizarLista();