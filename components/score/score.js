import './score.css';

export function score(nameOne, imgOne, scoreOne, nameTwo, imgTwo, scoreTwo) {
    return `
        <div class="score">
            <div class="player-icon">
                <span>${nameOne}</span>
                <img src="${imgOne}" alt="player icon" />
            </div>
            <div class="numbers">
                <span class="player-score">${scoreOne}</span>
                <span>-</span>
                <span class="player2-score">${scoreTwo}</span>
            </div>
            <div class="player2-icon">
                <span>${nameTwo}</span>
                <img src="${imgTwo}" alt="player 2 icon" />
            </div>
        </div>
    `;
}

export function updateScore(item, player) {
    const score = localStorage.getItem(item) || 0;
    const newScore = Number(score) + 1;
    localStorage.setItem(item, JSON.stringify(newScore));
    document.querySelector(`.${player}-score`).textContent = newScore;
}

export async function loadScore(itemOne, itemTwo) {
    const playerOneScore = localStorage.getItem(itemOne) || 0;
    const plaerTwoScore = localStorage.getItem(itemTwo) || 0;

    return [playerOneScore, plaerTwoScore];
}
