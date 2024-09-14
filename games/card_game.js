import { cardGame, cardEvents } from "@c/cards/cards.js";
import { backButton } from "@/components/backButton/back";

const $ = (el) => document.querySelector(el);
const game = $("#game");

game.innerHTML += await cardGame();
game.insertBefore(backButton(), $("h1"));
cardEvents();
