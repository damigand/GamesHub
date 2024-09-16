import { mineGame, mineEvents } from '@c/mines/mines.js';
import { backButton } from '@/components/backButton/back';

const $ = (el) => document.querySelector(el);
const game = $('#game');

game.innerHTML += await mineGame();
game.insertBefore(backButton(), $('h1'));
mineEvents();
