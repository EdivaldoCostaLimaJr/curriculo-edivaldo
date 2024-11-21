const btnGenerate = document.querySelector("#generate-pdf");

btnGenerate.addEventListener("click", () => {
    // Conteúdo do PDF
    const content = document.querySelector("#content");

    // Ocultar o botão temporariamente
    btnGenerate.style.display = "none";

    // Configuração do formato final do PDF
    const options = {
        margin: [10, 10, 10, 10],
        filename: "currículo-edivaldo.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Gerar e baixar o PDF
    html2pdf()
        .set(options)
        .from(content)
        .save()
        .then(() => {
            // Reexibir o botão após o PDF ser gerado
            btnGenerate.style.display = "block";
        })
        .catch((err) => {
            console.error("Erro ao gerar o PDF:", err);
            // Reexibir o botão em caso de erro
            btnGenerate.style.display = "block";
        });
});

