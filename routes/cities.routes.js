const express = require('express');
const router = express.Router();

// require models
const City = require('../models/City.model');
const Event = require('../models/Event.model')

// RENDER CITIES LIST ///////////////
router.get('/', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/auth/login')
    }
    City.find()
        .then(citiesFromDB => {
            res.render('cities/cities-list',{ cities: citiesFromDB });
        })
        .catch(err =>
            console.log(`Err while getting the cities from the  DB: ${err}`)
        );
});

// RENDER EVENTS FOR SPECIFIED CITY //////
router.get('/:id/events', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/auth/login')
    }
    const { id } = req.params

    City.findById(id)
        .then(cityFromDB => {
            console.log('City found: ', cityFromDB)
            Event.find({city: cityFromDB.name})
                .then(eventsFromDB => {
                    console.log(`Events found for ${cityFromDB.name}: ${eventsFromDB}`)
                    res.render('cities/cities-events-list', {city: cityFromDB, events: eventsFromDB})
                })
                .catch(err =>{
                    console.log('Error loading events for ', cityFromDB.name, ':', err)
                })
        })
        .catch(err => console.log('Error loading city: ', err));
})


  
module.exports = router;