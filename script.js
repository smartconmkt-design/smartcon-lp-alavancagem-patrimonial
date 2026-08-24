// Configuração da Calculadora
const creditSlider = document.getElementById('credit-slider');
const creditLabel = document.getElementById('credit-label');
const parcelaFull = document.getElementById('parcela-full');
const parcelaHalf = document.getElementById('parcela-half');

function updateCalculator() {
    const value = parseInt(creditSlider.value);
    creditLabel.innerText = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    // Cálculos baseados em médias de mercado (apenas para simulação visual)
    // Estimativa: Prazo 200 meses, Taxa Adm Total 15%
    const taxaAdm = 1.15;
    const totalComTaxa = value * taxaAdm;
    const mensal = totalComTaxa / 200;
    
    parcelaFull.innerText = mensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    parcelaHalf.innerText = (mensal / 2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

creditSlider.addEventListener('input', updateCalculator);
updateCalculator();

// Função de rastreamento e redirecionamento WhatsApp
function trackWhatsApp(origem) {
    // Dispara evento do Meta Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'Contact');
    }

    const phone = "5512997803859";
    let message = "";

    if (origem === 'simulacao') {
        message = "Olá! Vim por um anúncio de vocês e quero simular uma estratégia de alavancagem patrimonial.";
    } else {
        message = "Olá! Vim por um anúncio de vocês e quero entender como posso utilizar o consórcio para alavancagem patrimonial.";
    }

    const encodedMsg = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
    
    window.open(url, '_blank');
}

// Accordion FAQ
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const body = button.nextElementSibling;
        button.classList.toggle('active');
        if (body.style.display === "block") {
            body.style.display = "none";
        } else {
            body.style.display = "block";
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});