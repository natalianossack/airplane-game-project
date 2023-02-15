const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-area');

const startButton = document.querySelector('#start-screen button');
startButton.addEventListener('click', () => {
startScreen.classList.add('hidden');
gameScreen.classList.remove('hidden');
})