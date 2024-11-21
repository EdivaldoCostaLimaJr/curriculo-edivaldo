const btnGenerate = document.querySelector("#generate-pdf");
const btnIdioma = document.querySelector("#idioma");

btnGenerate.addEventListener("click", () => {
    // Conteúdo do PDF
    const content = document.querySelector("#content");

    btnGenerate.style.display = "none";
    btnIdioma.style.display = "none";

    // Configuração do formato final do PDF
    const options = {
        margin: [10, 10, 10, 10],
        filename: "currículo-edivaldo-junior.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Gerar e baixar o PDF
    html2pdf()
        .set(options)
        .from(content)
        .save()
        .then(() => {
            // Reexibir os botões após o PDF ser gerado
            btnGenerate.style.display = "block";
            btnIdioma.style.display = "block";
        })
        .catch((err) => {
            console.error("Erro ao gerar o PDF:", err);
            // Reexibir os botões em caso de erro
            btnGenerate.style.display = "block";
            btnIdioma.style.display = "block";
        });
});

