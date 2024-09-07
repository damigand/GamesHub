import { rpsGame, rpsEvents } from "@c/rps/rps.js";

const $ = (el) => document.querySelector(el);
const game = $("#game");

game.innerHTML = await rpsGame();
rpsEvents();
