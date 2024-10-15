const allCards = [
    { name: '1', img: 'imagens/baki.png' },
    { name: '2', img: 'imagens/gojo.png' },
    { name: '3', img: 'imagens/Goku.png' },
    { name: '4', img: 'imagens/luffy.png' },
    { name: '5', img: 'imagens/naruto.png' },
    { name: '6', img: 'imagens/sololeving.png' },
    { name: '7', img: 'imagens/asuna.png' },
    { name: '8', img: 'imagens/Denji.png' },
    { name: '9', img: 'imagens/dool.png' },
    { name: '10', img: 'imagens/eater.png' },
    { name: '11', img: 'imagens/kira.png' },
    { name: '12', img: 'imagens/kirito.png' },
    { name: '13', img: 'imagens/L.png' },
    { name: '14', img: 'imagens/maka.png' },
    { name: '15', img: 'imagens/power.png' },
    { name: '16', img: 'imagens/sla.png' },
    { name: '17', img: 'imagens/touka.png' },
    { name: '18', img: 'imagens/zoro.png' },
    { name: '19', img: 'imagens/Sukuna.png' },
    { name: '20', img: 'imagens/kaneki.png' }
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let difficulty = 'easy';

function setDifficulty(level) {
    difficulty = level;
    document.getElementById('congratulations').style.display = 'none'; // Oculta a mensagem
    generateCards();
    createBoard();
}

function generateCards() {
    let numPairs;
    switch (difficulty) {
        case 'easy': numPairs = 8; break;
        case 'medium': numPairs = 16; break;
        case 'hard': numPairs = 24; break;
    }
    cards = allCards.slice(0, numPairs / 2);
    cards = [...cards, ...cards];
    cards = shuffle(cards);
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const gameBoard = document.querySelector('.anime-board');
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    adjustGrid();
}

function adjustGrid() {
    const numCards = cards.length;
    let columns;

    if (difficulty === 'easy') {
        columns = 4;
    } else if (difficulty === 'medium') {
        columns = 4;
    } else {
        columns = 6;
    }

    document.querySelector('.anime-board').style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    // Verifica se todas as cartas foram combinadas
    if (document.querySelectorAll('.card.flip').length === cards.length) {
        document.getElementById('congratulations').style.display = 'block';
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.addEventListener('DOMContentLoaded', () => {
    setDifficulty('easy'); // Configuração inicial
});

