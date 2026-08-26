// CONFIGURAÇÕES
const CONFIG = {
    prazoMeses: 180,
    taxaAdministracao: 0.20,
    percentualParcelaReduzida: 0.50
};

const WHATSAPP_NUMBER = '5512997803859';
let calculatorTracked = false;

// UTILITÁRIOS
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

// META PIXEL
const trackPixelEvent = (eventName, parameters = {}) => {
    if (typeof fbq === 'function') {
        fbq('track', eventName, parameters);
    }
};

const trackCustomPixelEvent = (eventName, parameters = {}) => {
    if (typeof fbq === 'function') {
        fbq('trackCustom', eventName, parameters);
    }
};

// WHATSAPP
window.trackWhatsApp = function(type) {
    let message = "";
    let eventLabel = "";

    switch (type) {
        case 'estrategia':
            message = "Olá! Quero entender a estratégia de alavancagem patrimonial através do consórcio.";
            eventLabel = "Estratégia Patrimonial";
            break;
        case 'possibilidades':
            message = "Olá! Quero conhecer as possibilidades de contemplação.";
            eventLabel = "Possibilidades de Contemplação";
            break;
        case 'simulacao':
            message = "Olá! Fiz uma simulação de crédito e quero entender as opções.";
            eventLabel = "Simulação de Crédito";
            break;
        case 'final':
            message = "Olá! Quero estruturar meu patrimônio através do consórcio.";
            eventLabel = "Alavancagem Patrimonial";
            break;
        default:
            message = "Olá! Gostaria de mais informações sobre o consórcio imobiliário.";
            eventLabel = "Contato Geral";
    }

    // Tracking do evento Lead
    trackPixelEvent('Lead', {
        content_name: eventLabel
    });

    // Redirecionamento
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
};

// CALCULADORA
const calculateFullInstallment = (credit) => {
    return (credit * (1 + CONFIG.taxaAdministracao)) / CONFIG.prazoMeses;
};

const calculateHalfInstallment = (fullInstallment) => {
    return fullInstallment * CONFIG.percentualParcelaReduzida;
};

const initCalculator = () => {
    const slider = document.getElementById('credit-slider');
    const creditVal = document.getElementById('credit-val');
    const resFull = document.getElementById('res-full');
    const resHalf = document.getElementById('res-half');

    if (!slider) return;

    // Configuração inicial do Slider
    slider.min = 200000;
    slider.max = 10000000;
    slider.step = 50000;
    if(!slider.value || slider.value == 0) slider.value = 500000;

    // Função que apenas atualiza a interface visual
    const updateUI = () => {
        const creditValue = parseFloat(slider.value);
        const fullInstallment = calculateFullInstallment(creditValue);
        const halfInstallment = calculateHalfInstallment(fullInstallment);

        if (creditVal) creditVal.innerText = formatCurrency(creditValue);
        if (resFull) resFull.innerText = formatCurrency(fullInstallment);
        if (resHalf) resHalf.innerText = formatCurrency(halfInstallment);
    };

    // Event listener para interação real do usuário
    slider.addEventListener('input', () => {
        updateUI();

        // Dispara o tracking somente na primeira interação real do usuário
        if (!calculatorTracked) {
            trackCustomPixelEvent('CalculatorInteraction', {
                credit_value: parseFloat(slider.value)
            });
            calculatorTracked = true;
        }
    });

    // Chamada inicial apenas para preencher os valores na tela sem disparar o Pixel
    updateUI();
};

// FAQ (ACCORDION)
const initFaq = () => {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = body && body.style.display === 'block';

            // Fechar todos
            document.querySelectorAll('.accordion-body').forEach(item => {
                item.style.display = 'none';
            });
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
            });

            // Abrir se não estava aberto
            if (!isOpen && body) {
                body.style.display = 'block';
                header.classList.add('active');
            }
        });
    });
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initFaq();
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});