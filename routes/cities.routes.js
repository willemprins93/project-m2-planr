//cities.routes.js
const express = require('express');
const router = express.Router();

const City = require('../models/City.model');
const Event = require('../models/Event.model')


router.get('/', (req, res) => {
    City.find()
        .then(citiesFromDB => {
            // console.log(citiesFromDB);
            res.render('cities/cities-list',{ cities: citiesFromDB });
        })
        .catch(err =>
            console.log(`Err while getting the cities from the  DB: ${err}`)
        );
});

router.get('/:id/events', (req, res) => {
    const { id } = req.params
    let cityDetails;

    City.findById(id)
        .then(cityFromDB => {
            console.log('City found: ', cityFromDB)
            Event.find({location: cityFromDB.name})
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