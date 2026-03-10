//MINHAS ANOTAÇÕES DE ESTUDO DO QUE ACHO IMPORTANTE
//guarda itens tipo num JSON la no HTML:
//{
// nome: "Arroz",
// qtd: "2",
// checked: false
//}
let lista = [];
let paginaAtual = 1;
const itensPorPagina = 8;
let itemEditando = null;

let musicaTocando = false;
const audioMusica = document.getElementById('musicaFundo');
const controleMusica = document.getElementById('controleMusica');
const iconeMusica = document.getElementById('iconeMusica');

//Carregando o banco quando ele for aberto
//esta carregando assim que o HTML termina de processar para nao dar erro
window.onload = function () {

    console.log("pagina carregou");

    carregarLista();

};

function carregarLista() {

    const dados = localStorage.getItem("listaMercado");

    if (dados) {
        lista = JSON.parse(dados);
    }

    renderizarLista();
}
audioMusica.volume = 0.2;
//ve se a musica ta tocando
controleMusica.addEventListener('click', function() {
    if (musicaTocando) {
        audioMusica.pause();
        iconeMusica.className = 'fa-solid fa-volume-off';
        controleMusica.classList.add('musica-desligada');
    } else {
        audioMusica.play().catch(e => console.log("Erro ao tocar música"));
        iconeMusica.className = 'fa-solid fa-music';
        controleMusica.classList.remove('musica-desligada');
    }
    musicaTocando = !musicaTocando;
});
//tenta tocar automaticamente no navegador
window.addEventListener('load', function() {
    audioMusica.play().then(() => {
        musicaTocando = true;
        iconeMusica.className = 'fa-solid fa-music';
    }).catch(e => {
        musicaTocando = false;
        iconeMusica.className = 'fa-solid fa-volume-off';
        controleMusica.classList.add('musica-desligada');
    });
});
//quando for adicionar um item, puxa pelo id no DOM
function adicionarItem(){
    let nomeInput = document.getElementById("nome");
    let qtdInput = document.getElementById("quantidade");
    let erro = document.getElementById("erro");
//.trim remove espaços extras
    let nome = nomeInput.value.trim();
    let qtd = qtdInput.value.trim();
//limpando msg de erro
    erro.style.display = "none";
    erro.textContent = "";
//erro de campo vazio
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
//deixa minusculo e confere se ja tem esse item
    let nomeLower = nome.toLowerCase();
    let existe = lista.some(item => item.nome.toLowerCase() === nomeLower);

    if(existe){
        erro.textContent = "Este produto já foi inserido! 🛒";
        erro.style.display = "block";
        return;
    }
//adiciona o item naquele primeiro array
    lista.push({
        nome: nome,
        qtd: qtd,
        checked: false
    });
    //limpa os inputs
    nomeInput.value = "";
    qtdInput.value = "";
//salva antes de renderizar
    salvarBanco();
    renderizarLista();
}

//salvar banco de dados
function salvarBanco(){
    //salva no banco local do navegador, mas converte e salva a lista como uma string
    localStorage.setItem("listaMercado", JSON.stringify(lista));
}

//marcar o item comprado pelo num do index
function toggleCheck(index) {
    lista[index].checked = !lista[index].checked;
    salvarBanco();
    renderizarLista();
}
//a função que é ativada no final de cada processo e atualiza a lista
function renderizarLista(){
    const ul = document.getElementById("lista");
    ul.innerHTML = "";

    let inicio = (paginaAtual - 1) * itensPorPagina;
    let fim = inicio + itensPorPagina;
    let itensPagina = lista.slice(inicio, fim);
//percorre os itens da página e calcula o indice do item adicionado e cria um li
    itensPagina.forEach((item, indexLocal) => {
        let indexReal = inicio + indexLocal;
        let li = document.createElement("li");
        //se esta sendo editado cria os campos de edição
        if (itemEditando === indexReal) {
            li.classList.add("editando");
            //editando o nome
            let inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.value = item.nome;
            inputNome.classList.add("input-edicao-nome");
            inputNome.maxLength = 30;
            //a quantidade
            let inputQtd = document.createElement("input");
            inputQtd.type = "number";
            inputQtd.value = item.qtd;
            inputQtd.min = "1";
            inputQtd.max = "999";
            inputQtd.classList.add("input-edicao-qtd");
            //salvar o index, nom e qnt
            inputNome.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });
            
            inputQtd.addEventListener("keypress", function(e) {
                if (e.key === "Enter") salvarEdicao(indexReal, inputNome, inputQtd);
            });
            //appendichild coloca esse nó no final do pai
            li.appendChild(inputNome);
            li.appendChild(inputQtd);
            
            let botaoConfirmar = document.createElement("button");
            botaoConfirmar.innerHTML = '<i class="fa-solid fa-check"></i>';
            botaoConfirmar.classList.add("botao-confirmar");
            botaoConfirmar.onclick = function() {
                salvarEdicao(indexReal, inputNome, inputQtd);
            };
            
            li.appendChild(botaoConfirmar);
            //se nao estiver editando deixa os botões padrão
        } else {
            let checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add("checkbox-wrapper");
            //checkbox
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.checked || false;
            checkbox.onchange = function() {
                toggleCheck(indexReal);
            };
            
            checkboxWrapper.appendChild(checkbox);
//container
            let nomeContainer = document.createElement("div");
            nomeContainer.classList.add("nome-container");
//nome
            let spanNome = document.createElement("span");
            spanNome.classList.add("nome-produto");
            spanNome.textContent = item.nome;
            
            nomeContainer.appendChild(spanNome);
//quantidade
            let spanQtd = document.createElement("span");
            spanQtd.classList.add("quantidade");
            spanQtd.textContent = item.qtd + "x";

            let botoesContainer = document.createElement("div");
            botoesContainer.classList.add("botoes-container");
//botão editar
            let botaoEditar = document.createElement("button");
            botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
            botaoEditar.classList.add("botao-editar");
            botaoEditar.onclick = function() {
                itemEditando = indexReal;
                salvarBanco();
                renderizarLista();
            };
//bbotão remover
            let botaoRemover = document.createElement("button");
            botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
            botaoRemover.classList.add("botao-remover");
            botaoRemover.onclick = function() {
                //remove item do array
                lista.splice(indexReal, 1);
                itemEditando = null;
//ve se tem item a ser excluido e remove ele
                if((paginaAtual - 1) * itensPorPagina >= lista.length && paginaAtual > 1){
                    paginaAtual--;
                }
                salvarBanco();
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
//salvar edição
function salvarEdicao(index, inputNome, inputQtd) {
    if (!inputNome || !inputQtd) return;
    
    let novoNome = inputNome.value.trim();
    let novoQtd = inputQtd.value.trim();
    
    if (novoNome && novoQtd) {
        if (novoNome.length <= 30 && parseInt(novoQtd) <= 999) {
            //atualiza os novos valores
            lista[index].nome = novoNome;
            lista[index].qtd = novoQtd;
        }
    }
    
    itemEditando = null;
    salvarBanco();
    renderizarLista();
}
//numero de paginas
function atualizarInfoPagina(){
    //função math calcula numero de paginas e arredonda para cima
    const totalPaginas = Math.ceil(lista.length / itensPorPagina) || 1;
    document.getElementById("numeroPagina").textContent = paginaAtual;
    document.getElementById("btnVoltar").style.display = paginaAtual > 1 ? "flex" : "none";
    document.getElementById("btnAvancar").style.display = paginaAtual < totalPaginas ? "flex" : "none";
}

function proximaPagina(){
    const totalPaginas = Math.ceil(lista.length / itensPorPagina);
    if(paginaAtual < totalPaginas){
        //aumenta a pagina em 1
        paginaAtual++;
        salvarBanco();
        renderizarLista();
    }
}

function paginaAnterior(){
    if(paginaAtual > 1){
        //diminui a pagina em 1
        paginaAtual--;
        salvarBanco();
        renderizarLista();
    }
}
salvarBanco();
renderizarLista();