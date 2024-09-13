import './threeinrow.css';
import { score, updateScore, loadScore } from '@c/score/score.js';

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

export async function threeinrowGame() {
    const [scoreCross, scoreCircle] = await loadScore('scoreCross', 'scoreCircle');
    const [savedGame, savedTurn, savedCounter] = await loadSavedGame();
    currentTurn = savedTurn;
    turnCounter = savedCounter;

    return `
        <h1>Three in a row</h1>
        <div class="threeinrow">
            ${score('P1', '../cross.png', scoreCross, 'P2', '../circle.png', scoreCircle)}
            ${threeinrowCells(savedGame)} 
            ${threeinrowOptions()}
            ${threeinrowTurns(savedTurn, savedCounter)}
            ${threeinrowResult(savedCounter)}
        </div>
    `;
}

async function loadSavedGame() {
    const savedGame = JSON.parse(localStorage.getItem('savedGameTIR'));
    const winningCells = localStorage.getItem('winningCells');

    if (winningCells) winningCellIndexes = JSON.parse(winningCells);

    const savedTurn = winningCellIndexes.length > 0 ? null : localStorage.getItem('savedTurn');
    var turnCounter = localStorage.getItem('turnCounter') || 0;
    turnCounter = Number(turnCounter);
    return [savedGame, savedTurn, turnCounter];
}

function threeinrowCells(game) {
    //Por cada celda pinta su elemento correspondiente y
    //mete en el gameState su objeto con la row, col y su valor vacío.
    var cells = '';
    var index = 0;

    for (let row = 1; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            //Si hay juego guardado, lo carga por donde estaba.
            if (game && game[index]) {
                cells += `
                    <div class="${winningCellIndexes.includes(index) ? 'winner' : ''}" row="${row}" col="${col}">
                    <img src="${game[index] == 'x' ? '../cross.png' : '../circle.png'}" />
                </div>
                `;
                gameState.push({ row: row, col: col, value: game[index] });
                savedGame[index] = game[index];
            } else {
                //Si no, carga la celda vacía.
                cells += `
                <div class="empty" row="${row}" col="${col}">
                    <img src="" alt="" />
                </div>
            `;
                gameState.push({ row: row, col: col, value: '' });
                savedGame.push('');
            }
            index++;
        }
    }

    return `
        <div class="cells">
            ${cells}
        </div>
    `;
}

function threeinrowOptions() {
    //winningCellIndexes es usado también como "check" para saber
    //si una partida ha acabado pero no ha sido reiniciada.
    //Si winningCellIndexes tiene longitud > 1,
    //significa que todavía no hay un "juego nuevo", pero sí un ganador, por lo que
    //el div de las opciones se esconde y se muestra el div de "ganador!" en su lugar.
    return `
        <div class="threeinrow-options ${!currentTurn && winningCellIndexes.length < 1 ? '' : 'hidden'}">
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

function threeinrowTurns(savedTurn, turnCounter) {
    //Si habia un turno guardado y no hay un ganador, cargo el turno.
    if (savedTurn && winningCellIndexes.length < 1 && turnCounter < 9) {
        return `
            <div class="current-turn">
                <span>Current turn</span>
                <img src="${currentTurn == 'x' ? '../cross.png' : '../circle.png'}" alt="" />
            </div>
        `;
    }

    return `
        <div class="current-turn hidden">
            <span>Current turn</span>
            <img src="" alt="" />
        </div>
    `;
}

function threeinrowResult(turnCounter) {
    var text = '';
    var src = '';

    //Si no hay celda ganadora pero los turnos son los máximos permitidos, es un empate.
    if (turnCounter > 8 && winningCellIndexes.length < 1) {
        return `
            <div class="result">
                <span>It's a tie!</span>
                <img src="" alt="" />
                <button class="restart">Play again</button>
            </div>
        `;
    }

    if (winningCellIndexes.length > 0) {
        //Uso un check para identificar el ganador de la partida guardada, dado el caso
        //en el que la partida guardada ya tenga ganador.
        const winner = gameState[winningCellIndexes[0]].value;
        text = `${winner == 'x' ? 'Cross' : 'Circle'} wins!`;
        src = `${winner == 'x' ? '../cross.png' : '../circle.png'}`;
    }

    return `
        <div class="result ${winningCellIndexes.length > 0 ? '' : 'hidden'}">
            <span>${text}</span>
            <img src="${src}" alt="" />
            <button class="restart">Play again</button>
        </div>
    `;
}

var gameState = [];
var savedGame = [];
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

            //Para guardar el estado del juego uso un array que contenga solo el valor
            //de cada celda para no tener que guardar el gameState entero en localStorage.
            const index = gameState.indexOf(gameCell);
            savedGame[index] = currentTurn;
            localStorage.setItem('savedGameTIR', JSON.stringify(savedGame));

            //Comprobamos si hay un ganador en el turno.
            const win = await checkWin();

            //Si lo hay, se acaba el juego. Si no, sigue.
            if (win) {
                endGame(currentTurn);
                return;
            }

            //si el turno es X, cambia a O. Si no es X, cambia a X.
            //Guardo el turno y el contador.
            currentTurn = currentTurn == 'x' ? 'o' : 'x';
            turnCounter++;
            localStorage.setItem('savedTurn', currentTurn);
            localStorage.setItem('turnCounter', turnCounter);

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

    var score;
    var newScore;
    //Dependiendo del resultado, pinta una cosa u otra y actualiza la puntuación.
    switch (result) {
        case 'tie':
            text.textContent = "It's a tie!";
            img.src = '';
            break;

        case 'x':
            text.textContent = 'Cross wins!';
            img.src = '../cross.png';
            updateScore('scoreCross', 'player');
            break;

        case 'o':
            text.textContent = 'Circle wins!';
            img.src = '../circle.png';
            updateScore('scoreCircle', 'player2');
            break;
    }

    resultDiv.classList.remove('hidden');
}

function resetGame() {
    //Reinicia las variables y todo el aspecto visual.
    currentTurn = '';
    turnCounter = 0;
    gameState = [];
    savedGame = [];
    winningCellIndexes = [];
    const cells = $$('.cells div');

    //Reinicia cada celda.
    cells.forEach((cell) => {
        cell.classList.add('empty');
        cell.classList.remove('winner');
        const img = cell.querySelector('img');
        img.src = '';
        img.alt = '';

        const row = cell.getAttribute('row');
        const col = cell.getAttribute('col');

        //Introduce todas las celdas nuevas en el gameState.
        gameState.push({ row: row, col: col, value: '' });
        savedGame.push('');
    });

    //Muestra el div de elegir turno.
    $('.result').classList.add('hidden');
    $('.threeinrow-options').classList.remove('hidden');

    //Por último actualiza los localStorage.
    localStorage.setItem('savedGameTIR', JSON.stringify(savedGame));
    localStorage.setItem('savedTurn', '');
    localStorage.setItem('winningCells', '');
    localStorage.setItem('turnCounter', 0);
}

const winCombinations = ['123', '456', '789', '147', '258', '369', '159', '357'];
var winningCellIndexes = [];

async function checkWin() {
    //Cada combinacion son los "index" de cada combinación ganadora que puede haber en el juego.
    for (const comb of winCombinations) {
        const indexes = comb.split('');
        //Obtengo los index haciendo un split de "comb".
        const firstIndex = Number(indexes[0] - 1);
        const secondIndex = Number(indexes[1] - 1);
        const thirdIndex = Number(indexes[2] - 1);

        //Obtengo los valores de cada celda mediante el gameState.
        const firstGameCell = gameState[firstIndex];
        const secondGameCell = gameState[secondIndex];
        const thirdGameCell = gameState[thirdIndex];

        const firstValue = firstGameCell.value;
        const secondValue = secondGameCell.value;
        const thirdValue = thirdGameCell.value;

        //Si algun valor está vacío, no hay posible victoria.
        if (!firstValue || !secondValue || !thirdValue) continue;

        //Si el primero coincide con el segundo y el tercero, hay ganador.
        if (firstValue == secondValue && firstValue == thirdValue) {
            //Actualizo las celdas de manera visual y devuelvo "true" para acabar el juego.
            const firstCell = $(`.cells div[row="${firstGameCell.row}"][col="${firstGameCell.col}"]`);
            const secondCell = $(`.cells div[row="${secondGameCell.row}"][col="${secondGameCell.col}"]`);
            const thirdCell = $(`.cells div[row="${thirdGameCell.row}"][col="${thirdGameCell.col}"]`);

            firstCell.classList.add('winner');
            secondCell.classList.add('winner');
            thirdCell.classList.add('winner');

            winningCellIndexes.push(firstIndex);
            winningCellIndexes.push(secondIndex);
            winningCellIndexes.push(thirdIndex);

            //Guardo los index de las celdas para poder cargar el caso específico en el que
            //la última partida guardada en el navegador tenga un ganador ya establecido.
            localStorage.setItem('winningCells', JSON.stringify(winningCellIndexes));
            return true;
        }
    }

    //Si llega aquí, no hay ganador.
    return false;
}
