const express = require('express');
const router = express.Router();

// ********* require Event model in order to use it *********
const Event = require('../models/Event.model');

// ********* require fileUploader in order to use it *********
const fileUploader = require('../configs/cloudinary.config');

// ****************************************************************************************
// 1. GET route to display all the events
// ****************************************************************************************

router.get('/', (req, res) => {
  Event.find()
    .then(allTheEventsFromDB => {
      console.log(allTheEventsFromDB);
      res.render('events/events-list',{ events: allTheEventsFromDB });
    })
    .catch(err =>
      console.log(`Err while getting the events from the  DB: ${err}`)
    );
});

// ****************************************************************************************
// 2.1.GET route for displaying the form to CREATE a NEW event
// ****************************************************************************************

router.get('/create', (req, res) => res.render('events/events-create'));

// ****************************************************************************************
// 2.2.POST route for saving a new event in the database
// ****************************************************************************************

router.post('/create', (req, res) => {
  // console.log(req.body);
  const { name, date, location, description, photoUrl, type, host, attendees } = req.body;

  Event.create({ name, date, location, description, photoUrl, type, host, attendees})
    // .then(eventFromDB => console.log(`New event created: ${eventFromDB.title}.`))
    .then((eventCreated) => {
      console.log('Event succesfully created: ', eventCreated)
      res.redirect('/')
    })
    .catch(error => `Error while creating a new event: ${error}`);
});

// ****************************************************************************************
// 3.1.GET route for querying a specific event from the database
// ****************************************************************************************

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Event.findById(id)
    .then(eventToEdit => {
      // console.log(eventToEdit);
      res.render('events/events-edit', eventToEdit);
    })
    .catch(error =>
      console.log(`Error while getting a single event for edit: ${error}`)
    );
});

// ****************************************************************************************
// 3.2.POST route to save changes after updates in a specific event
// ****************************************************************************************

router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  const { name, date, location, description,photoUrl,type,host,attendees } = req.body;

  Event.findByIdAndUpdate(
    id,
    { name, date, location, description,photoUrl,type,host,attendees},
    { new: true }
  )
    .then(updatedEvent => res.redirect(`/events/${updatedEvent._id}`))
    .catch(error =>
      console.log(`Error while updating a single event: ${error}`)
    );
});

// // ****************************************************************************************
// // 3.3.POST route to delete a specific event
// // ****************************************************************************************

// router.post('/events/:id/delete', (req, res) => {
//   const { id } = req.params;

//   Event.findByIdAndDelete(id)
//     .then(() => res.redirect('/events'))
//     .catch(error => console.log(`Error while deleting a event: ${error}`));
// });

// ****************************************************************************************
// GET route for displaying the event details page
// ****************************************************************************************

router.get('/:someEventId', (req, res) => {
  const { someEventId } = req.params;
  Event.findById(someEventId)
    .then(foundEvent => {
      // console.log('Did I find a event?', foundEvent);
      res.render('events/events-detail', foundEvent);
    })
    .catch(err =>
      console.log(`Err while getting the specific event from the  DB: ${err}`)
    );
});

module.exports = router;
