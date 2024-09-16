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
    const play = $(".play");
    play.addEventListener("click", async () => {
        const mines = await generateMines();
        if (!mines) return;

        playing = true;

        updateGameInfo(mines, 25 - mines);
        $(".controls").classList.add("hidden");
        $(".game-info").classList.remove("hidden");
    });

    const restart = $(".play-again");
    restart.addEventListener("click", () => restartGame());

    const seeAll = $(".see-all");
    seeAll.addEventListener("click", () => seeAllCells());

    const cells = $$(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (!playing) return;

            const row = cell.getAttribute("row");
            const col = cell.getAttribute("col");

            const gameCell = currentGame.find((c) => c.row == row && c.col == col);
            if (gameCell.value == "bomb") {
                cell.querySelector("img").src = "../bomb.png";
                cell.classList.add("bomb");

                endGame();
            } else {
                cell.querySelector("img").src = "../check.png";
                updateGameInfo(currentMines, checksLeft - 1);
            }
            cell.classList.add("seen");
        });
    });
}

var currentGame = [];
var playing = false;

async function generateMines() {
    const number = $("#bomb-number").value;
    if (!number || number > 24) return;

    for (var a = 0; a < number; a++) {
        const randomRow = Math.floor(Math.random() * 5 + 1);
        const randomCol = Math.floor(Math.random() * 5 + 1);

        const bombCell = currentGame.find((cell) => cell.row == randomRow && cell.col == randomCol);
        if (bombCell.value == "bomb") {
            a--;
        } else {
            bombCell.value = "bomb";
        }
    }

    return number;
}

function mineCells() {
    var cells = "";

    for (var row = 1; row < 6; row++) {
        for (var col = 1; col < 6; col++) {
            cells += `
                <div class="cell" row="${row}" col="${col}">
                    <img src="" />
                </div>
            `;

            currentGame.push({ row: row, col: col, value: "empty" });
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
            <span class="loss">Has perdido!</span>
            <div class="end-info">
                <span>Bombs: 20</span>
                <span>Checks left: 2</span>
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
    currentMines = mines;
    checksLeft = checks;

    $(".info-bombs").textContent = "Mines: " + currentMines;
    $(".info-checks").textContent = "Checks to win: " + checksLeft;
}

function endGame() {
    playing = false;
    $(".game-info").classList.add("hidden");
    $(".message").classList.remove("hidden");
}

function restartGame() {
    currentMines = 0;
    checksLeft = 0;

    const cells = $$(".cell");

    cells.forEach((cell) => {
        cell.querySelector("img").src = "";
        cell.classList.remove("seen");
        cell.classList.remove("bomb");
    });

    currentGame.forEach((cell) => {
        cell.value = "empty";
    });

    $(".controls").classList.remove("hidden");
    $(".message").classList.add("hidden");
}
