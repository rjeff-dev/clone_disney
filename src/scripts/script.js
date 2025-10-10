document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('[data-tab-button]');
    const questions = document.querySelectorAll('[data-faq-question]');
    
    const heroSection = document.querySelector('.hero');
    const alturaHero = heroSection.clientHeight;

    window.addEventListener('scroll', function() {
        const posicaoAtual = window.scrollY;
        console.log(posicaoAtual);

        if(posicaoAtual < alturaHero){
            ocultaElementosHeader();
            console.log();
        }else {
            exibeElementosHeader();
        }
    })

    // seção atrações, programação das abas
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            const abaAlvo = event.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id="${abaAlvo}"]`);
            escondeTodasAbas();
            aba.classList.add('shows__list--is-active');
            removeBotaoAtivo(buttons);
                event.target.classList.add('shows__tabs__button--is-active');
        });
    }
    for(let i = 0; i < questions.length; i++){
        questions[i].addEventListener('click', abreOuFechaResposta);
    }
});

function ocultaElementosHeader(){
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
}

function exibeElementosHeader(){
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
}

//faq e acordion
function abreOuFechaResposta(event){    
    const classe = 'faq__question__item--is-open';
    const item = event.currentTarget.closest('.faq__question__item');
    item.classList.toggle(classe);
    console.log(item); // agora loga o <li> que foi clicado
};


function removeBotaoAtivo(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('shows__tabs__button--is-active');
    }
};

function escondeTodasAbas() {
    const tabsContainer = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove('shows__list--is-active');
    }
};