document.getElementById("checklistForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const itens = document.querySelectorAll(".item");
    
    let todosSelecionados = true;
    itens.forEach(item => {
        if (!item.checked) {
            todosSelecionados = false;
        }
        item.checked = false; // resetar para próximo cadastro
    });

    const situacao = todosSelecionados ? "Aprovado" : "Reprovado";
    const classeSituacao = todosSelecionados ? "aprovado" : "reprovado";

    const tabela = document.getElementById("tabelaCandidatos");
    const novaLinha = tabela.insertRow();

    const celulaNome = novaLinha.insertCell(0);
    const celulaCargo = novaLinha.insertCell(1);
    const celulaSituacao = novaLinha.insertCell(2);

    celulaNome.textContent = nome;
    celulaCargo.textContent = cargo;
    celulaSituacao.textContent = situacao;
    celulaSituacao.classList.add(classeSituacao);

    document.getElementById("checklistForm").reset();
});