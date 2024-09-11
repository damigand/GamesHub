import { rpsGame, rpsEvents } from "@c/rps/rps.js";
import { backButton } from "@/components/backButton/back";

const $ = (el) => document.querySelector(el);
const game = $("#game");

game.innerHTML += await rpsGame();
game.insertBefore(backButton(), $("h1"));
rpsEvents();
