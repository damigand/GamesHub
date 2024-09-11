import { threeinrowGame, threeinrowEvents } from "@c/threeinrow/threeinrow.js";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const game = $("#game");

game.innerHTML = await threeinrowGame();
threeinrowEvents();
