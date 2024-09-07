import './rps.css';

export function rpsGame() {
    return `
        <h1>Rock, Paper, Scissors</h1>
        <div class="rps">
            <div class="score">
                <div class="player-score">
                    <span>Tú</span>
                    <img src="" alt="player icon" />
                </div>
                <div class="ia-score">
                    <span>IA</span>
                    <img src="" alt="ia icon" />
                </div>
            </div>
            <div class="game">
                <div class="player-option">
                    <img src="" alt="player option" />
                    <span></span>
                </div>
                <div class="ia-option">
                    <img src="" alt="ia option" />
                    <span></span>
                </div>
            </div>
            <div class="options">
                <img src="../scissors.png" alt="scissors image" />
                <img src="../rock.png" alt="rock image" />
                <img src="../paper.png" alt="paper image" />
            </div>
        </div>
    `;
}
