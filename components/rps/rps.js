import './rps.css';
import { score, updateScore, loadScore } from '@c/score/score.js';

const optionData = {
    scissors: ['../scissors.png', 'Scissors'],
    rock: ['../rock.png', 'Rock'],
    paper: ['../paper.png', 'Paper'],
};

const optionEnum = {
    scissors: 1,
    rock: 2,
    paper: 3,
};

var selectedOption = '';

//variables para no tener que escribir "document.querySelector" todo el rato
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

export async function rpsGame() {
    const [playerScore, iaScore] = await loadScore('rpsPlayerScore', 'rpsIaScore');

    return `
        <h1>Rock, Paper, Scissors</h1>
        <div class="rps">
            ${score('YOU', '../player.png', playerScore, 'AI', '../ai.png', iaScore)}
            <div class="game">
                <div class="player-option">
                    <img src="../question.png" alt="player option" />
                    <span>?</span>
                </div>
                <button class="play">PLAY</button>
                <div class="ia-option">
                    <img src="../question.png" alt="ia option" />
                    <span>?</span>
                </div>
            </div>
            <span class="message"></span>
            <div class="container">
                <div class="options">
                    <div class="scissors" id="scissors">
                        <span>Scissors</span>
                        <img src="../scissors.png" alt="scissors image" />
                    </div>
                    <div class="rock" id="rock">
                        <span>Rock</span>
                        <img src="../rock.png" alt="rock image" />
                    </div>
                    <div class="paper" id="paper">
                        <span>Paper</span>
                        <img src="../paper.png" alt="paper image" />
                    </div>
                </div>
            </div>
            
        </div>
    `;
}

export function rpsEvents() {
    const options = $$('.options div');
    const userOption = $('.player-option');

    options.forEach((op) => {
        const name = op.id;

        //Mediante el id en el html puedo obtener los datos para pintar
        //la opción y seleccionarla.
        op.addEventListener('click', (event) => {
            const data = optionData[name];
            userOption.querySelector('img').src = data[0];
            userOption.querySelector('span').textContent = data[1];
            selectedOption = optionEnum[name];

            //Cambio otros aspectos visuales para no confundir al jugador.
            const iaElements = $('.ia-option');
            iaElements.querySelector('img').src = '../question.png';
            iaElements.querySelector('span').textContent = '?';

            const message = $('.message');
            message.classList.remove('tie');
            message.classList.remove('win');
            message.classList.remove('loss');
            message.classList.remove('warning');
            message.textContent = '';
        });
    });

    const play = $('.play');
    play.addEventListener('click', () => rpsPlay());
}

function rpsPlay() {
    if (!selectedOption) {
        const message = $('.message');
        message.classList.remove('tie');
        message.classList.remove('win');
        message.classList.remove('loss');
        message.classList.add('warning');
        message.textContent = 'You need to choose an option!';
        return;
    }
    //Obtengo la opción aleatoria de la ia
    const random = Math.floor(Math.random() * 3 + 1);

    //Obtengo el nombre de la "key" del random.
    const name = Object.keys(optionEnum).find((key) => optionEnum[key] === random);

    //Con la key obtengo los datos para la parte visual y su valor en el enum para la comparación.
    const iaOption = optionEnum[name];
    const iaData = optionData[name];
    const iaElements = $('.ia-option');
    iaElements.querySelector('img').src = iaData[0];
    iaElements.querySelector('span').textContent = iaData[1];

    if (!iaOption) return;

    //Selecciona un ganador
    switch (selectedOption) {
        case optionEnum['scissors']:
            if (iaOption == optionEnum['scissors']) rpsTie();
            if (iaOption == optionEnum['rock']) rpsLoss();
            if (iaOption == optionEnum['paper']) rpsWin();
            break;
        case optionEnum['rock']:
            if (iaOption == optionEnum['scissors']) rpsWin();
            if (iaOption == optionEnum['rock']) rpsTie();
            if (iaOption == optionEnum['paper']) rpsLoss();
            break;
        case optionEnum['paper']:
            if (iaOption == optionEnum['scissors']) rpsLoss();
            if (iaOption == optionEnum['rock']) rpsWin();
            if (iaOption == optionEnum['paper']) rpsTie();
            break;
    }
}

function rpsTie() {
    const message = $('.message');
    message.classList.add('tie');
    message.classList.remove('win');
    message.classList.remove('loss');
    message.textContent = "It's a tie!";
}

function rpsWin() {
    const message = $('.message');
    message.classList.add('win');
    message.classList.remove('tie');
    message.classList.remove('loss');
    message.textContent = 'Player wins!';

    updateScore('rpsPlayerScore', 'player');
}

function rpsLoss() {
    const message = $('.message');
    message.classList.add('loss');
    message.classList.remove('win');
    message.classList.remove('tie');
    message.textContent = 'IA wins!';

    updateScore('rpsIaScore', 'player2');
}
