document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checklistForm");
    const tabela = document.getElementById("tabelaCandidatos");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cargo = document.getElementById("cargo").value.trim();

        if (!nome || !cargo) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        // Verificar itens obrigatórios
        const itens = document.querySelectorAll(".item");
        let itensNaoSelecionados = [];

        itens.forEach(item => {
            if (!item.checked) {
                itensNaoSelecionados.push(item.parentElement.textContent.trim());
            }
        });

        // Se não houver itens não selecionados => aprovado
        let situacao, classeSituacao;
        if (itensNaoSelecionados.length === 0) {
            situacao = "Aprovado";
            classeSituacao = "aprovado";
        } else {
            situacao = itensNaoSelecionados.join(", "); // junta todos os itens não selecionados
            classeSituacao = "reprovado";
        }

        // Criar nova linha na tabela
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${nome}</td>
            <td>${cargo}</td>
            <td class="${classeSituacao}">${situacao}</td>
        `;

        tabela.appendChild(tr);

        // Resetar formulário
        form.reset();
    });
});
