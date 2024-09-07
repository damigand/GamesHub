import './rps.css';

export function rpsGame() {
    return `
        <h1>Rock, Paper, Scissors</h1>
        <div class="rps">
            <div class="score">
                <div class="player-icon">
                    <span>TÚ</span>
                    <img src="../player.png" alt="player icon" />
                </div>
                <div class="numbers">
                    <span class="player-score">1</span>
                    <span>-</span>
                    <span class="ia-score">1</span>
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
            <div class="container">
                <div class="options">
                    <div class="scissors">
                        <span>Scissors</span>
                        <img src="../scissors.png" alt="scissors image" />
                    </div>
                    <div class="rock">
                        <span>Rock</span>
                        <img src="../rock.png" alt="rock image" />
                    </div>
                    <div class="paper">
                        <span>Paper</span>
                        <img src="../paper.png" alt="paper image" />
                    </div>
                </div>
            </div>
            
        </div>
    `;
}
