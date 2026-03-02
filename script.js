 var Lista = [];

function PegarValor(){

    var nomeInput = document.getElementById("nome");
    var qtdInput = document.getElementById("quantidade");

    var nome = nomeInput.value.trim();
    var qtd = qtdInput.value.trim();

    if(nome !== "" && qtd !== ""){

        var itemCompleto = nome + " - " + qtd + "x";

        if(!Lista.includes(itemCompleto)){
            Lista.push(itemCompleto);

            const lista = document.getElementById("ListaNomes");
            const item = document.createElement("li");
            item.textContent = itemCompleto;

            // BOTÃO EDITAR
            const botaoEditar = document.createElement("button");
            botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';

            botaoEditar.onclick = function(){

                item.classList.add("editando");

                var novoNome = prompt("Editar produto:", nome);
                var novaQtd = prompt("Editar quantidade:", qtd);

                if(novoNome && novaQtd){

                    var novoItem = novoNome.trim() + " - " + novaQtd.trim() + "x";
                    item.firstChild.textContent = novoItem;

                    Lista = Lista.map(valor =>
                        valor === itemCompleto ? novoItem : valor
                    );

                    itemCompleto = novoItem;
                }

                item.classList.remove("editando");
            };

            // BOTÃO REMOVER
            const botaoRemover = document.createElement("button");
            botaoRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';

            botaoRemover.onclick = function(){
                lista.removeChild(item);
                Lista = Lista.filter(valor => valor !== itemCompleto);
            };

            item.appendChild(botaoEditar);
            item.appendChild(botaoRemover);

            lista.appendChild(item);

            nomeInput.value = "";
            qtdInput.value = "";
        }
        else{
            alert("Esse item já está na lista!");
        }

    } else{
        alert("Preencha produto e quantidade!");
    }
}