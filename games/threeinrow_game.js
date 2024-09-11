import { threeinrowGame, threeinrowEvents } from "@c/threeinrow/threeinrow.js";
import { backButton } from "@/components/backButton/back";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const game = $("#game");

game.innerHTML = await threeinrowGame();
game.insertBefore(backButton(), $("h1"));
threeinrowEvents();
