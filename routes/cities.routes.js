//cities.routes.js
const express = require('express');
const router = express.Router();

const City = require('../models/City.model');


router.get('/', (req, res) => {
    City.find()
      .then(citiesFromDB => {
        console.log(citiesFromDB);
        res.render('cities/cities-list',{ cities: citiesFromDB });
      })
      .catch(err =>
        console.log(`Err while getting the cities from the  DB: ${err}`)
      );
});


  
module.exports = router;