const $ = (el) => document.querySelector(el);

const app = $("#app");

app.innerHTML = `
    <h1>What game would you like to play?</h1>
    <ul class="games">
        <li>
            <h3>Rock, Paper, Scissors</h3>
            <a href="games/rps.html" class="play">PLAY</a>
        </li>
        <li>
            <h3>Three in a row</h3>
            <a href="games/threeinrow.html" class="play">PLAY</a>
        </li>
        <li>
            <h3>Matching cards</h3>
            <a href="games/cards.html" class="play">PLAY</a>
        </li>
    </ul>
`;
