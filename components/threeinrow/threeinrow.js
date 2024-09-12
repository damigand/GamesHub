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
            ${threeinrowTurns()}
            ${threeinrowResult()}
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
    //Por cada celda pinta su elemento correspondiente y
    //mete en el gameState su objeto con la row, col y su valor vacío.
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
    `;
}

function threeinrowTurns() {
    return `
        <div class="current-turn hidden">
            <span>Current turn</span>
            <img src="" alt="" />
        </div>
    `;
}

function threeinrowResult() {
    return `
        <div class="result hidden">
            <span></span>
            <img src="" alt="" />
            <button class="restart">Play again</button>
        </div>
    `;
}

var gameState = [];
var currentTurn = '';
var turnCounter = 0;

export function threeinrowEvents() {
    const cells = $$('.cells div');

    //añade el listener de cada celda para jugando.
    cells.forEach((cell) => {
        const row = cell.getAttribute('row');
        const col = cell.getAttribute('col');

        cell.addEventListener('click', async (event) => {
            const gameCell = gameState.find((x) => x.row == row && x.col == col);
            //Si no hay celda, la celda ya tiene valor o no hay turno seleccionado, sale.
            if (!gameCell || gameCell.value || !currentTurn) return;

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

            //Comprobamos si hay un ganador en el turno.
            const win = await checkWin();

            //Si lo hay, se acaba el juego. Si no, sigue.
            if (win) {
                endGame(currentTurn);
                return;
            }

            //si el turno es X, cambia a O. Si no es X, cambia a X.
            currentTurn = currentTurn == 'x' ? 'o' : 'x';
            turnCounter++;

            //Si el juego llega a 9 turnos y no se ha determinado un ganador, hay empate.
            if (turnCounter > 8) {
                endGame('tie');
                return;
            }
        });
    });

    const turnX = $('.cross-option');
    const turnO = $('.circle-option');

    //Cambia los aspectos necesarios cuando el turno es de X.
    turnX.addEventListener('click', (event) => {
        currentTurn = 'x';
        $('.threeinrow-options').classList.add('hidden');
        $('.current-turn').classList.remove('hidden');
        $('.current-turn').querySelector('img').src = '../cross.png';
    });

    //Cambia los aspectos necesarios cuando el turno es de O.
    turnO.addEventListener('click', (event) => {
        currentTurn = 'o';
        $('.threeinrow-options').classList.add('hidden');
        $('.current-turn').classList.remove('hidden');
        $('.current-turn').querySelector('img').src = '../circle.png';
    });

    const restart = $('.restart');
    restart.addEventListener('click', () => resetGame());
}

function endGame(result) {
    //Acaba el turno para no poder seguir jugando.
    currentTurn = '';
    const resultDiv = $('.result');
    const text = resultDiv.querySelector('span');
    const img = resultDiv.querySelector('img');

    $('.current-turn').classList.add('hidden');

    //Dependiendo del resultado, pinta una cosa u otra.
    switch (result) {
        case 'tie':
            text.textContent = "It's a tie!";
            img.src = '';
            break;
        case 'x':
            text.textContent = 'Cross wins!';
            img.src = '../cross.png';
            break;
        case 'o':
            text.textContent = 'Circle wins!';
            img.src = '../circle.png';
            break;
    }

    resultDiv.classList.remove('hidden');
}

function resetGame() {
    //Reinicia las variables y todo el aspecto visual.
    turnCounter = 0;
    gameState = [];
    const cells = $$('.cells div');

    //Reinicia cada celda.
    cells.forEach((cell) => {
        cell.classList.add('empty');
        const img = cell.querySelector('img');
        img.src = '';
        img.alt = '';

        const row = cell.getAttribute('row');
        const col = cell.getAttribute('col');

        //Introduce todas las celdas nuevas en el gameState.
        gameState.push({ row: row, col: col, value: '' });
    });

    //Muestra el div de elegir turno.
    $('.result').classList.add('hidden');
    $('.threeinrow-options').classList.remove('hidden');
}

const winCombinations = ['123', '456', '789', '147', '258', '369', '159', '357'];

async function checkWin() {
    //Cada combinacion son los "index" de cada combinación ganadora que puede haber en el juego.
    for (const comb of winCombinations) {
        const indexes = comb.split('');
        //Obtengo los index haciendo un split de "comb".
        const firstIndex = Number(indexes[0] - 1);
        const secondIndex = Number(indexes[1] - 1);
        const thirdIndex = Number(indexes[2] - 1);

        //Obtengo los valores de cada celda mediante el gameState.
        const firstCellValue = gameState[firstIndex].value;
        const secondCellValue = gameState[secondIndex].value;
        const thirdCellValue = gameState[thirdIndex].value;

        //Si algun valor está vacío, no hay posible victoria.
        if (!firstCellValue || !secondCellValue || !thirdCellValue) continue;

        //Si el primero coincide con el segundo y el tercero, hay ganador.
        if (firstCellValue == secondCellValue && firstCellValue == thirdCellValue) {
            return true;
        }
    }

    //Si llega aquí, no hay ganador.
    return false;
}
