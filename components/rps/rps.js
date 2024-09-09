import "./rps.css";
import { backButton } from "@c/backButton/back.js";

const optionData = {
    scissors: ["../scissors.png", "Scissors"],
    rock: ["../rock.png", "Rock"],
    paper: ["../paper.png", "Paper"],
};

const optionEnum = {
    scissors: 1,
    rock: 2,
    paper: 3,
};

var selectedOption = "";

//variables para no tener que escribir "document.querySelector" todo el rato
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

export async function rpsGame() {
    const [playerScore, iaScore] = await loadScore();
    $("body").appendChild(backButton());
    return `
        <h1>Rock, Paper, Scissors</h1>
        <div class="rps">
            <div class="score">
                <div class="player-icon">
                    <span>TÚ</span>
                    <img src="../player.png" alt="player icon" />
                </div>
                <div class="numbers">
                    <span class="player-score">${playerScore}</span>
                    <span>-</span>
                    <span class="ia-score">${iaScore}</span>
                </div>
                <div class="ai-icon">
                    <span>AI</span>
                    <img src="../ai.png" alt="ia icon" />
                </div>
            </div>
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

function loadScore() {
    const playerScore = localStorage.getItem("rpsPlayerScore") || 0;
    const iaScore = localStorage.getItem("rpsIaScore") || 0;

    return [playerScore, iaScore];
}

export function rpsEvents() {
    const options = $$(".options div");
    const userOption = $(".player-option");

    options.forEach((op) => {
        const name = op.id;

        //Mediante el id en el html puedo obtener los datos para pintar
        //la opción y seleccionarla.
        op.addEventListener("click", (event) => {
            const data = optionData[name];
            userOption.querySelector("img").src = data[0];
            userOption.querySelector("span").textContent = data[1];
            selectedOption = optionEnum[name];

            //Cambio otros aspectos visuales para no confundir al jugador.
            const iaElements = $(".ia-option");
            iaElements.querySelector("img").src = "../question.png";
            iaElements.querySelector("span").textContent = "?";

            const message = $(".message");
            message.classList.remove("tie");
            message.classList.remove("win");
            message.classList.remove("loss");
            message.classList.remove("warning");
            message.textContent = "";
        });
    });

    const play = $(".play");
    play.addEventListener("click", () => rpsPlay());
}

function rpsPlay() {
    if (!selectedOption) {
        const message = $(".message");
        message.classList.remove("tie");
        message.classList.remove("win");
        message.classList.remove("loss");
        message.classList.add("warning");
        message.textContent = "You need to choose an option!";
        return;
    }
    //Obtengo la opción aleatoria de la ia
    const random = Math.floor(Math.random() * 3 + 1);

    //Obtengo el nombre de la "key" del random.
    const name = Object.keys(optionEnum).find((key) => optionEnum[key] === random);

    //Con la key obtengo los datos para la parte visual y su valor en el enum para la comparación.
    const iaOption = optionEnum[name];
    const iaData = optionData[name];
    const iaElements = $(".ia-option");
    iaElements.querySelector("img").src = iaData[0];
    iaElements.querySelector("span").textContent = iaData[1];

    if (!iaOption) return;

    //Selecciona un ganador
    switch (selectedOption) {
        case optionEnum["scissors"]:
            if (iaOption == optionEnum["scissors"]) rpsTie();
            if (iaOption == optionEnum["rock"]) rpsLoss();
            if (iaOption == optionEnum["paper"]) rpsWin();
            break;
        case optionEnum["rock"]:
            if (iaOption == optionEnum["scissors"]) rpsWin();
            if (iaOption == optionEnum["rock"]) rpsTie();
            if (iaOption == optionEnum["paper"]) rpsLoss();
            break;
        case optionEnum["paper"]:
            if (iaOption == optionEnum["scissors"]) rpsLoss();
            if (iaOption == optionEnum["rock"]) rpsWin();
            if (iaOption == optionEnum["paper"]) rpsTie();
            break;
    }
}

function rpsTie() {
    const message = $(".message");
    message.classList.add("tie");
    message.classList.remove("win");
    message.classList.remove("loss");
    message.textContent = "It's a tie!";
}

function rpsWin() {
    const previousScore = localStorage.getItem("rpsPlayerScore") || 0;
    const newScore = parseInt(previousScore) + 1;
    localStorage.setItem("rpsPlayerScore", JSON.stringify(newScore));
    updateScore(true, newScore);

    const message = $(".message");
    message.classList.add("win");
    message.classList.remove("tie");
    message.classList.remove("loss");
    message.textContent = "Player wins!";
}

function rpsLoss() {
    const previousScore = localStorage.getItem("rpsIaScore") || 0;
    const newScore = parseInt(previousScore) + 1;
    localStorage.setItem("rpsIaScore", JSON.stringify(newScore));
    updateScore(false, newScore);

    const message = $(".message");
    message.classList.add("loss");
    message.classList.remove("win");
    message.classList.remove("tie");
    message.textContent = "IA wins!";
}

function updateScore(player, score) {
    //Si player es true, actualizo el score del jugador.
    //Si no, actualizo el score de la ia.
    if (player) {
        const playerScore = $(".player-score");
        playerScore.textContent = score;
    } else {
        const iaScore = $(".ia-score");
        iaScore.textContent = score;
    }
}
