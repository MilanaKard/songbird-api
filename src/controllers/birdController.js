'use strict'

const firebase = require('../db');
require("firebase/firestore");

const Bird = require('../models/bird');
const fireStore = firebase.firestore();

const addBird = async (req, res, next) => {
    try {
        const data = req.body;
        await fireStore.collection('birds').doc().set(data);
        res.status(200).send('Record saved successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getBirds = async (req, res, next) => {
    try{
        let birds = fireStore.collection('birds');
        if(req.query.level) {
            birds = birds.where("level", "==", Number(req.query.level));
        }
        const data = await birds.get();
        const birdsArray = [];
        if (data.empty) {
            res.send([]);
        } else {
            data.forEach(doc => {
                const bird = new Bird(
                    doc.id,
                    doc.data().name,
                    doc.data().species,
                    doc.data().description,
                    doc.data().image,
                    doc.data().audio
                );
                birdsArray.push(bird)     
            });
            res.send(birdsArray);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
 

module.exports = {
    addBird,
    getBirds,
}