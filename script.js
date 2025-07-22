const btnGenerate = document.querySelector("#generate-pdf");
const btnIdioma = document.querySelector("#idioma");
const btnDarkMode = document.querySelector("#dark-mode-toggle");
const btnMedium = document.querySelector("#medium-link");

// Função para gerar PDF
btnGenerate.addEventListener("click", () => {
    const content = document.querySelector("#content");

    // Esconde botões
    btnGenerate.style.display = "none";
    btnIdioma.style.display = "none";
    btnDarkMode.style.display = "none";
    btnMedium.style.display = "none";

    // Verificar se está no modo dark
    const darkModeAtivo = document.body.classList.contains('dark-mode');
    if (darkModeAtivo) {
        document.body.classList.remove('dark-mode');
    }

    const options = {
        margin: 5,
        filename: 'curriculo-edivaldo-junior.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
        .set(options)
        .from(content)
        .save()
        .then(() => {
            // Restaurar dark-mode se estava ativo
            if (darkModeAtivo) {
                document.body.classList.add('dark-mode');
            }

            // Mostrar botões novamente
            btnGenerate.style.display = "block";
            btnIdioma.style.display = "block";
            btnDarkMode.style.display = "block";
            btnMedium.style.display = "block";
        })
        .catch((err) => {
            console.error("Erro ao gerar o PDF:", err);

            if (darkModeAtivo) {
                document.body.classList.add('dark-mode');
            }

            btnGenerate.style.display = "block";
            btnIdioma.style.display = "block";
            btnDarkMode.style.display = "block";
            btnMedium.style.display = "block";
        });
});

// Função para alternar Dark Mode
btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Função para alternar Idioma (Tradução)
btnIdioma.addEventListener("click", () => {
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
        // Alterna entre PT e EN
        select.value = select.value === 'en' ? 'pt' : 'en';
        select.dispatchEvent(new Event('change'));
    } else {
        alert('O tradutor ainda não está carregado. Aguarde alguns segundos e tente novamente.');
    }
});

function ajustarTituloMobile() {
    const titulo = document.querySelector('header h1');
    if (window.innerWidth <= 480) {
        titulo.textContent = "Edivaldo Costa";
    } else {
        titulo.textContent = "Edivaldo da Costa Lima Júnior";
    }
}

window.addEventListener('resize', ajustarTituloMobile);
window.addEventListener('load', ajustarTituloMobile);

