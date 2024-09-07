import { rpsGame } from '@c/rps/rps.js';

const $ = (el) => document.querySelector(el);
const game = $('#game');

game.innerHTML = rpsGame();
