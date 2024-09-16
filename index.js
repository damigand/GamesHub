const $ = (el) => document.querySelector(el);

const app = $('#app');

app.innerHTML = `
    <h1>Choose a game</h1>
    <ul class="games">
        <a href="games/rps.html" class="play">
            <li>
                <h3>Rock, Paper, Scissors</h3>
            </li>
        </a>
        <a href="games/threeinrow.html" class="play">
            <li>
                <h3>Three in a row</h3>
            </li>
        </a>
        <a href="games/mines.html" class="play">
            <li>
                <h3>Mines</h3>
            </li>
        </a>
    </ul>
`;
