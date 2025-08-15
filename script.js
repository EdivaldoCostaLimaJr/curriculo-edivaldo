const btnGenerate = document.querySelector("#generate-pdf");
const btnIdioma = document.querySelector("#idioma");
const btnDarkMode = document.querySelector("#dark-mode-toggle");
const btnMedium = document.querySelector("#medium-link");
const buttonsContainer = document.querySelector(".buttons-container");
const backToTopButton = document.getElementById("back-to-top");

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight + 50 : 100;
    
    if (scrollTop > headerHeight) {
        buttonsContainer.classList.add('fixed');
    } else {
        buttonsContainer.classList.remove('fixed');
    }
    
    if (scrollTop > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
});

btnGenerate.addEventListener("click", () => {
    const content = document.querySelector("#content");
    const wasFixed = buttonsContainer.classList.contains('fixed');
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    buttonsContainer.classList.remove('fixed');
    window.scrollTo(0, 0);
    
    setTimeout(() => {
        btnGenerate.style.display = "none";
        btnIdioma.style.display = "none";
        btnDarkMode.style.display = "none";
        btnMedium.style.display = "none";
        backToTopButton.classList.remove('show');

        const darkModeAtivo = document.body.classList.contains('dark-mode');
        if (darkModeAtivo) {
            document.body.classList.remove('dark-mode');
        }

        setTimeout(() => {
            const options = {
                margin: [10, 10, 10, 10],
                filename: 'curriculo-edivaldo-junior.pdf',
                image: { 
                    type: 'jpeg', 
                    quality: 0.98 
                },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait'
                },
                pagebreak: { 
                    mode: 'avoid-all'
                }
            };

            html2pdf()
                .set(options)
                .from(content)
                .save()
                .then(() => {
                    if (darkModeAtivo) {
                        document.body.classList.add('dark-mode');
                    }

                    window.scrollTo(0, currentScrollPosition);
                    
                    setTimeout(() => {
                        if (wasFixed) {
                            buttonsContainer.classList.add('fixed');
                        }
                    }, 100);

                    btnGenerate.style.display = "block";
                    btnIdioma.style.display = "block";
                    btnDarkMode.style.display = "block";
                    btnMedium.style.display = "block";
                    
                    if (currentScrollPosition > 300) {
                        backToTopButton.classList.add('show');
                    }
                })
                .catch((err) => {
                    console.error("Erro ao gerar o PDF:", err);

                    if (darkModeAtivo) {
                        document.body.classList.add('dark-mode');
                    }

                    window.scrollTo(0, currentScrollPosition);
                    
                    setTimeout(() => {
                        if (wasFixed) {
                            buttonsContainer.classList.add('fixed');
                        }
                    }, 100);

                    btnGenerate.style.display = "block";
                    btnIdioma.style.display = "block";
                    btnDarkMode.style.display = "block";
                    btnMedium.style.display = "block";
                    
                    if (currentScrollPosition > 300) {
                        backToTopButton.classList.add('show');
                    }
                });
        }, 100);
    }, 50);
});

btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

btnIdioma.addEventListener("click", () => {
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
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

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('resize', ajustarTituloMobile);
window.addEventListener('load', ajustarTituloMobile);