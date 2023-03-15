const express = require('express');
const { addPlayer, getPlayers } = require('../controllers/playerController');
const { addBird, getBirds } = require('../controllers/birdController');

const router = express.Router();

router.post('/player', addPlayer);
router.get('/player', getPlayers);
router.post('/bird', addBird);
router.get('/bird', getBirds);

module.exports = {
    routes: router
}