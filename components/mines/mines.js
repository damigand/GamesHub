import './mines.css';

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

export function mineGame() {
    return `
      <h1>Mines</h1>
      ${mineCells()}
      ${mineControls()}
    `;
}

export function mineEvents() {
    const play = $('.play');
    play.addEventListener('click', async () => {
        await generateMines();
        playing = true;
    });

    const cells = $$('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (!playing) return;

            const row = cell.getAttribute('row');
            const col = cell.getAttribute('col');

            const gameCell = currentGame.find((c) => c.row == row && c.col == col);
            if (gameCell.value == 'bomb') {
                cell.querySelector('img').src = '../bomb.png';
                playing = false;
            } else {
                cell.querySelector('img').src = '../check.png';
            }
            cell.classList.add('seen');
        });
    });
}

var currentGame = [];
var playing = false;

async function generateMines() {
    const number = $('#bomb-number').value;
    if (!number) return;

    for (var a = 0; a < number; a++) {
        const randomRow = Math.floor(Math.random() * 5 + 1);
        const randomCol = Math.floor(Math.random() * 5 + 1);

        const bombCell = currentGame.find((cell) => cell.row == randomRow && cell.col == randomCol);
        if (bombCell.value == 'bomb') {
            a--;
        } else {
            bombCell.value = 'bomb';
        }
    }
}

function mineCells() {
    var cells = '';

    for (var row = 1; row < 6; row++) {
        for (var col = 1; col < 6; col++) {
            cells += `
                <div class="cell" row="${row}" col="${col}">
                    <img src="" />
                </div>
            `;

            currentGame.push({ row: row, col: col, value: 'empty' });
        }
    }
    return `
        <div class="cells">
            ${cells}
        </div>
    `;
}

function mineControls() {
    return `
        <div class="controls">
            <form>
                <input type="number" id="bomb-number" />
                <label for="bomb-number">Bombs (max: 24)</label>
            </form>
            <button type="button" class="play">PLAY</button>
        </div>
    `;
}
