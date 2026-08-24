// 3. FORMATAÇÃO DE MOEDA (BRL)
const formatBRL = (value) => {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

// 4. CALCULADORA DE CRÉDITO
const creditSlider = document.getElementById('credit-slider');
const creditValDisplay = document.getElementById('credit-val');
const resFullDisplay = document.getElementById('res-full');
const resHalfDisplay = document.getElementById('res-half');

const updateCalculator = () => {
    if (!creditSlider || !creditValDisplay || !resFullDisplay || !resHalfDisplay) return;

    const creditValue = parseFloat(creditSlider.value);

    // ESTIMATIVA VISUAL PROVISÓRIA.
    // Substituir pelos valores reais da operação antes da publicação definitiva.
    const taxaAdmEstimada = 1.15; // 15% de taxa administrativa total
    const prazoMeses = 200;       // Prazo de 200 meses

    const totalComTaxa = creditValue * taxaAdmEstimada;
    const parcelaIntegral = totalComTaxa / prazoMeses;
    const meiaParcela = parcelaIntegral / 2;

    // Atualização visual dos elementos
    creditValDisplay.innerText = formatBRL(creditValue);
    resFullDisplay.innerText = formatBRL(parcelaIntegral);
    resHalfDisplay.innerText = formatBRL(meiaParcela);
};

// Inicialização da Calculadora
if (creditSlider) {
    creditSlider.addEventListener('input', updateCalculator);
    updateCalculator(); // Roda ao carregar para evitar R$ 0,00
}

// 5. FAQ (ACCORDION)
const faqHeaders = document.querySelectorAll('.accordion-header');

faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const isOpen = header.classList.contains('active');

        // 1. Fechar qualquer outra pergunta aberta
        faqHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.classList.remove('active');
                const otherBody = otherHeader.nextElementSibling;
                if (otherBody) {
                    otherBody.style.display = 'none';
                }
            }
        });

        // 2. Alternar o estado da pergunta clicada
        if (isOpen) {
            header.classList.remove('active');
            if (body) body.style.display = 'none';
        } else {
            header.classList.add('active');
            if (body) body.style.display = 'block';
        }
    });
});

// 6. SMOOTH SCROLL (SCROLL SUAVE PARA LINKS INTERNOS)
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Verifica se o href possui um destino válido (não é apenas "#")
        if (href !== "#" && href.startsWith("#")) {
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});