import "./mines.css";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

export function mineGame() {
    return `
      <h1>Mines</h1>
      ${mineCells()}
      ${mineControls()}
      ${gameInfo()}
      ${message()}
    `;
}

export function mineEvents() {
    //Controla el aspecto visual y comienza el juego al
    //Darle click a play.
    const play = $(".play");
    play.addEventListener("click", async () => {
        //Genera las bombas.
        const mines = await generateMines();
        if (!mines) return;
        playing = true;

        //Actualiza los datos y la parte visual.
        updateGameInfo(mines, 25 - mines);
        $(".controls").classList.add("hidden");
        $(".game-info").classList.remove("hidden");
    });

    //Permite reiniciar la partida cuando acaba.
    const restart = $(".play-again");
    restart.addEventListener("click", () => restartGame());

    //Permite ver todas las celdas cuando termina la partida.
    const seeAll = $(".see-all");
    seeAll.addEventListener("click", () => seeAllCells());

    const cells = $$(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (!playing) return;

            const row = cell.getAttribute("row");
            const col = cell.getAttribute("col");

            const gameCell = currentGame.find((c) => c.row == row && c.col == col);

            //Si la celda clicada está vista, retorna.
            if (gameCell.seen) return;

            //Si es bomba, lo pinta y termina el juego.
            if (gameCell.value == "bomb") {
                cell.querySelector("img").src = "../bomb.png";
                cell.classList.add("bomb");

                endGame("lose");
            } else {
                //Si no, pinta el check.
                cell.querySelector("img").src = "../check.png";
                updateGameInfo(currentMines, checksLeft - 1);
            }

            //Actualiza la celda tanto en el juego como visualmente.
            cell.classList.add("seen");
            gameCell.seen = true;

            //Si no quedan checks por descubrir, el jugador gana.
            //un "check" es una celda sin bomba.
            if (checksLeft < 1) {
                endGame("win");
            }
        });
    });
}

var currentGame = [];
var playing = false;

async function generateMines() {
    //Si el numero introducido es igual o mayor
    //al numero de celdas, no deja iniciar el juego.
    const number = $("#bomb-number").value;
    if (!number || number > 24) return;

    //Pinta las bombas en celdas aleatorias.
    for (var a = 0; a < number; a++) {
        //Genera las coordenadas aleatorias.
        const randomRow = Math.floor(Math.random() * 5 + 1);
        const randomCol = Math.floor(Math.random() * 5 + 1);

        //Si la celda ya tenía bomba, resta 1 al "loop"
        //Para que pinte otra.
        const bombCell = currentGame.find((cell) => cell.row == randomRow && cell.col == randomCol);
        if (bombCell.value == "bomb") {
            a--;
        } else {
            bombCell.value = "bomb";
        }
    }

    //Por ultimo retorna el numero de bombas.
    return number;
}

function seeAllCells() {
    const cells = $$(".cell");

    //Por cada celda pinta lo que tiene.
    cells.forEach((cell) => {
        const col = cell.getAttribute("col");
        const row = cell.getAttribute("row");
        const gameCell = currentGame.find((c) => c.row == row && c.col == col);

        if (gameCell.value == "bomb") {
            cell.querySelector("img").src = "../bomb.png";
        } else {
            cell.querySelector("img").src = "../check.png";
        }
    });
}

function mineCells() {
    var cells = "";

    //Pinta las celdas y las introduce en el currentGame.
    for (var row = 1; row < 6; row++) {
        for (var col = 1; col < 6; col++) {
            cells += `
                <div class="cell" row="${row}" col="${col}">
                    <img src="" />
                </div>
            `;

            currentGame.push({ row: row, col: col, value: "empty", seen: false });
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

function gameInfo() {
    return `
        <div class="game-info hidden">
            <span class="info-bombs">Mines: </span>
            <span class="info-checks">Checks to win: </span>
        </div>
    `;
}

function message() {
    return `
        <div class="message hidden">
            <span class="title"></span>
            <div class="end-info">
                <span class="bombs"></span>
                <span class="checks-left"></span>
                <span class="checks-done"></span>
            </div>
            <div class="buttons">
                <button class="play-again">TRY AGAIN</button>
                <button class="see-all">SEE ALL</button>
            </div>
        </div>
    `;
}

var currentMines = 0;
var checksLeft = 0;

function updateGameInfo(mines, checks) {
    //Actualiza los datos visualmente para que el usuario sepa
    //Cómo va.
    currentMines = mines;
    checksLeft = checks;

    $(".info-bombs").textContent = "Mines: " + currentMines;
    $(".info-checks").textContent = "Checks to win: " + checksLeft;
}

function endGame(state) {
    //Cambia la variable "playing" para que no pueda descubrir
    //más celdas.
    playing = false;
    $(".game-info").classList.add("hidden");
    const message = $(".message");

    //Pinta todo el mensaje final.
    const title = message.querySelector(".title");
    const bombs = message.querySelector(".bombs");
    const checks = message.querySelector(".checks-left");
    const checksDone = message.querySelector(".checks-done");

    message.classList.remove("hidden");
    bombs.textContent = "Bombs: " + currentMines;
    checks.textContent = "Left: " + checksLeft;
    checksDone.textContent = "Cleared: " + (25 - currentMines - checksLeft);
    if (state == "win") {
        title.textContent = "You win!";
        title.classList.remove("lose");
        title.classList.add("win");
    } else {
        title.textContent = "You lose!";
        title.classList.remove("win");
        title.classList.add("lose");
    }
}

function restartGame() {
    //Reinicia todas las variables.
    currentMines = 0;
    checksLeft = 0;

    const cells = $$(".cell");

    //Reinicia cada celda y su valor en currentGame.
    cells.forEach((cell) => {
        cell.querySelector("img").src = "";
        cell.classList.remove("seen");
        cell.classList.remove("bomb");
    });

    currentGame.forEach((cell) => {
        cell.value = "empty";
        cell.seen = false;
    });

    //Esconde el mensaje y enseña el panel de elegir bombas.
    $(".controls").classList.remove("hidden");
    $(".message").classList.add("hidden");
}
