document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('[data-tab-button]');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            const abaAlvo = event.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id="${abaAlvo}"]`);

            // esconde todas as abas e mostra só a clicada
            escondeTodasAbas();
            aba.classList.add('shows__list--is-active');

            // tira a classe ativa de todos os botões
            removeBotaoAtivo(buttons);
            // coloca a classe ativa no botão clicado
            event.target.classList.add('shows__tabs__button--is-active');
            });
    }
});

function removeBotaoAtivo(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('shows__tabs__button--is-active');
    }
}

function escondeTodasAbas() {
    const tabsContainer = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove('shows__list--is-active');
    }
}