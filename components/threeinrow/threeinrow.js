import "./threeinrow.css";

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
    var cells = "";
    for (let x = 1; x < 4; x++) {
        for (let y = 1; y < 4; y++) {
            cells += `
                <div class="empty" row="${x}" column="${y}">
                    <img src="" alt="" />
                </div>
            `;
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

export function threeinrowEvents() {}
