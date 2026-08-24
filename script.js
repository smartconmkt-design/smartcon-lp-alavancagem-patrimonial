/**
 * SMARTCON - ESTRATÉGIA DE ALAVANCAGEM PATRIMONIAL
 * script.js - Lógica de interação da Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. FORMATBRL - Função para formatação de moeda brasileira
    const formatBRL = (value) => {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    // 2. CALCULADORA - Lógica de simulação de crédito
    const slider = document.getElementById('credit-slider');
    const creditVal = document.getElementById('credit-val');
    const resFull = document.getElementById('res-full');
    const resHalf = document.getElementById('res-half');

    if (slider && creditVal && resFull && resHalf) {
        const updateCalculator = () => {
            const value = parseFloat(slider.value);

            /**
             * ESTIMATIVA VISUAL:
             * Os valores abaixo representam uma simulação baseada em taxas médias (15% taxa adm / 200 meses).
             * Devem ser substituídos pelas condições comerciais reais antes da publicação definitiva.
             */
            const taxaAdm = 1.15; // 15% de taxa administrativa
            const prazo = 200;    // 200 meses

            const totalComTaxa = value * taxaAdm;
            const parcelaEstimada = totalComTaxa / prazo;
            const meiaParcela = parcelaEstimada / 2;

            // Atualização dos elementos no HTML
            creditVal.innerText = formatBRL(value);
            resFull.innerText = formatBRL(parcelaEstimada);
            resHalf.innerText = formatBRL(meiaParcela);
        };

        // Evento de escuta para movimento do slider
        slider.addEventListener('input', updateCalculator);

        // Inicialização dos valores ao carregar a página
        updateCalculator();
    }

    // 3. WHATSAPP + META PIXEL - Centralização de contato e rastreio
    window.trackWhatsApp = (contexto) => {
        const phone = "5512997803859";
        
        /**
         * MENSAGEM PADRÃO: 
         * Seguindo o padrão da campanha "Saia do Aluguel", a mensagem é única independente do contexto.
         */
        const message = "Olá! Vim por um anúncio de vocês e quero simular um crédito.";
        
        // Disparo do evento Meta Pixel (somente se a função fbq existir)
        if (typeof fbq === 'function') {
            fbq('track', 'Contact');
        }

        // Construção da URL e abertura em nova aba
        const encodedMsg = encodeURIComponent(message);
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
        window.open(url, '_blank');
    };

    // 4. FAQ - Accordion com fechamento automático de outros itens
    const faqHeaders = document.querySelectorAll('.accordion-header');

    if (faqHeaders.length > 0) {
        faqHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const body = header.nextElementSibling;
                const isAlreadyOpen = header.classList.contains('active');

                // Fecha todos os itens abertos antes de abrir o atual
                faqHeaders.forEach(otherHeader => {
                    otherHeader.classList.remove('active');
                    const otherBody = otherHeader.nextElementSibling;
                    if (otherBody) {
                        otherBody.style.display = 'none';
                    }
                });

                // Se o item clicado não estava aberto, abre-o
                if (!isAlreadyOpen) {
                    header.classList.add('active');
                    if (body) {
                        body.style.display = 'block';
                    }
                }
            });
        });
    }

    // 5. SMOOTH SCROLL - Scroll suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});