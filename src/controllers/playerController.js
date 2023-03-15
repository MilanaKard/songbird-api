'use strict'

const firebase = require('../db');
require("firebase/firestore");

const Player = require('../models/player');
const fireStore = firebase.firestore();

const addPlayer = async (req, res, next) => {
    try {
        const data = req.body;
        await fireStore.collection('players').doc().set(data);
        res.send('Record saved successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getPlayers = async (req, res, next) => {
    try{
        const players = fireStore.collection('players');
        const data = await players.get();
        const playersArray = [];
        if (data.empty) {
            res.send([]);
        } else {
            data.forEach(doc => {
                const player = new Player(
                    doc.id,
                    doc.data().name,
                    doc.data().date,
                    doc.data().score
                );
                playersArray.push(player)     
            });
            res.send(playersArray);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addPlayer,
    getPlayers
}