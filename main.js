document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checklistForm");
    const tabela = document.getElementById("tabelaCandidatos");
    const baixarBtn = document.getElementById("baixarWord");

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
            situacao = itensNaoSelecionados.join(", ");
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

    // Função para baixar tabela em Word
    if (baixarBtn) {
        baixarBtn.addEventListener("click", () => {
    let rows = tabela.querySelectorAll("tr");
    let tableHTML = `
        <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
            <thead>
                <tr style="background-color: #007bff; color: white; text-align: center;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Candidato</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Cargo</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Situação</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach((row, index) => {
        const cols = row.querySelectorAll("td");
        if (cols.length === 0) return; // Pular linhas vazias
        let bgColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff"; // linhas alternadas
        let situacaoText = cols[2].textContent;
        let situacaoColor = cols[2].classList.contains("aprovado") ? "green" : "red";

        tableHTML += `
            <tr style="background-color: ${bgColor}; text-align: center;">
                <td style="padding: 8px; border: 1px solid #ddd;">${cols[0].textContent}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${cols[1].textContent}</td>
                <td style="padding: 8px; border: 1px solid #ddd; color: ${situacaoColor}; font-weight: bold;">${situacaoText}</td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;

    const htmlTabela = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Checklist de Candidatos</title></head>
        <body>
            <h2 style="text-align: center;">Checklist de Candidatos</h2>
            ${tableHTML}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlTabela], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Checklist_Candidatos.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
    }
});
