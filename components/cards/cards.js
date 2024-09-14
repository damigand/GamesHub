import "./cards.css";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const levelEnum = {
    none: 0,
    easy: 1,
    medium: 2,
    hard: 3,
};

export function cardGame() {
    return `
        <h1>Card Memory Game</h1>
        <div class="card-game">
            ${cardLevel()}
        </div>
        
    `;
}

function cardLevel() {
    return `
        <div class="choose-level">
            <button class="easy">Easy</button>
            <button class="medium">Medium</button>
            <button class="hard">Hard</button>
        </div>
    `;
}

function levelHandler(selectedLevel) {
    switch (selectedLevel) {
        case levelEnum["none"]:
            return generateLevel(0);

        case levelEnum["easy"]:
            return generateLevel(8);

        case levelEnum["medium"]:
            return generateLevel(16);

        case levelEnum["hard"]:
            return generateLevel(24);

        default:
            return generateLevel(0);
    }
}

function generateLevel(pairs) {
    if (!pairs || pairs == 0) return;

    console.log(pairs);
}

export function cardEvents() {
    const easy = $("button.easy");
    const medium = $("button.medium");
    const hard = $("button.hard");

    easy.addEventListener("click", () => levelHandler(levelEnum["easy"]));
    medium.addEventListener("click", () => levelHandler(levelEnum["medium"]));
    hard.addEventListener("click", () => levelHandler(levelEnum["hard"]));
}
