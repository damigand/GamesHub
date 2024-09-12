import './threeinrow.css';

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

export async function threeinrowGame() {
    return `
        <h1>Three in a row</h1>
        <div class="threeinrow">
            ${threeinrowScore()}
            ${threeinrowCells()}
            ${threeinrowOptions()}
        </div>
    `;
}

function threeinrowScore() {
    return `
        <div class="score">
            <div class="player-icon">
                <span>P1</span>
                <img src="../cross.png" alt="player icon" />
            </div>
            <div class="numbers">
                <span class="player-score">1</span>
                <span>-</span>
                <span class="player2-score">1</span>
            </div>
            <div class="player2-icon">
                <span>P2</span>
                <img src="../circle.png" alt="player 2 icon" />
            </div>
        </div>
    `;
}

function threeinrowCells() {
    var cells = '';
    for (let row = 1; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            cells += `
                <div class="empty" row="${row}" col="${col}">
                    <img src="" alt="" />
                </div>
            `;

            gameState.push({ row: row, col: col, value: '' });
        }
    }

    return `
        <div class="cells">
            ${cells}
        </div>
    `;
}

function threeinrowOptions() {
    return `
        <div class="threeinrow-options">
            <span>Choose who starts</span>
            <div class="options">
                <div class="cross-option">
                    <img src="../cross.png" alt="cross image" />
                </div>
                <div class="circle-option">
                    <img src="../circle.png" alt="circle image" />
                </div>
            </div>
        </div>
        <div class="current-turn hidden">
            <span>Current turn</span>
            <img src="" alt="" />
        </div>
    `;
}

const gameState = [];
var currentTurn = '';
var turnCounter = 0;

export function threeinrowEvents() {
    const cells = $$('.cells div');

    //añade el listener de cada celda para jugando.
    cells.forEach((cell) => {
        const row = cell.getAttribute('row');
        const col = cell.getAttribute('col');

        cell.addEventListener('click', (event) => {
            const gameCell = gameState.find((x) => x.row == row && x.col == col);
            //Si no hay celda, la celda ya tiene valor o no hay turno seleccionado, sale.
            if (!gameCell) return;
            if (gameCell.value) {
                console.log('ya hay valor');
                return;
            }

            if (!currentTurn) {
                console.log('no hay turno');
                return;
            }

            //Si llega hasta aquí, hay celda, la celda no tiene valor y hay un turno, así que lo pinta
            //y cambia el turno.
            gameCell.value = currentTurn;

            //cambiamos la parte visual tanto del tablero como del panel de información del turno actual.
            cell.classList.remove('empty');
            const img = cell.querySelector('img');
            const currentTurnImage = $('.current-turn').querySelector('img');
            if (currentTurn == 'x') {
                img.src = '../cross.png';
                img.alt = 'cross image';
                currentTurnImage.src = '../circle.png';
            } else {
                img.src = '../circle.png';
                img.alt = 'circle image';
                currentTurnImage.src = '../cross.png';
            }

            //si el turno es X, cambia a O. Si no es X, cambia a X.
            currentTurn = currentTurn == 'x' ? 'o' : 'x';
            turnCounter++;

            if (turnCounter > 8) {
                console.log('el juego ha terminado');
                //Cambiar el aspecto visual para poder reiniciar la partida.
            }
        });
    });

    const turnX = $('.cross-option');
    const turnO = $('.circle-option');

    turnX.addEventListener('click', (event) => {
        currentTurn = 'x';
        $('.threeinrow-options').classList.add('hidden');
        $('.current-turn').classList.remove('hidden');
        $('.current-turn').querySelector('img').src = '../cross.png';
    });

    turnO.addEventListener('click', (event) => {
        currentTurn = 'o';
        $('.threeinrow-options').classList.add('hidden');
        $('.current-turn').classList.remove('hidden');
        $('.current-turn').querySelector('img').src = '../circle.png';
    });
}

function resetGame() {}
