const express = require("express");
const router = express.Router();

// ********* require Event model in order to use it *********
const Event = require("../models/Event.model");
const User = require('../models/User.model')

// ********* require fileUploader in order to use it *********
const fileUploader = require("../configs/cloudinary.config");

// // ********* require date-fns *********************************
// const { format, compareAsc } = require('date-fns')

// ****************************************************************************************
// 1. GET route to display all the events
// ****************************************************************************************

router.get("/", (req, res) => {
  Event.find()
    .then((allTheEventsFromDB) => {
      console.log(allTheEventsFromDB);
      res.render("events/events-list", { events: allTheEventsFromDB });
    })
    .catch((err) =>
      console.log(`Err while getting the events from the  DB: ${err}`)
    );
});

// ****************************************************************************************
// 2.1.GET route for displaying the form to CREATE a NEW event
// ****************************************************************************************

router.get("/create", (req, res) => res.render("events/events-create"));

// ****************************************************************************************
// 2.2.POST route for saving a new event in the database
// ****************************************************************************************

router.post("/create", (req, res) => {
  // console.log(req.body);
  const { name, date, location, description, type } = req.body;

  const id = req.session.currentUser._id;

  Event.create({ name, date, location, description, type, host: id })
    .then((eventFromDB) => {
      console.log(`New event created: ${eventFromDB.title}.`);
      res.redirect("/events");
    })
    .catch(error => console.log(`Error while creating a new event: ${error}`));
});

// ****************************************************************************************
// 3.1.GET route for querying a specific event from the database
// ****************************************************************************************

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
    .then((eventToEdit) => {
        res.render("events/events-edit", eventToEdit);
    })
    .catch((error) =>
      console.log(`Error while getting a single event for edit: ${error}`)
    );
});

// ****************************************************************************************
// 3.2.POST route to save changes after updates in a specific event
// ****************************************************************************************

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const {
    name,
    date,
    location,
    description,
    type
  } = req.body;

  // attempt at reformatting date
  // console.log('Original date: ', date)

  // const formattedDate = format(date, 'YYYY/MM/DD')

  // console.log('Formatted date: ', formattedDate)

  Event.findByIdAndUpdate(
    id,
    { name, date, location, description, type },
    { new: true }
  )
    .then((updatedEvent) => res.redirect(`/events/${updatedEvent._id}`))
    .catch((error) => {
      console.log(`Error while updating a single event: ${error}`)
    });
});

// // ****************************************************************************************
// // 3.3.POST route to delete a specific event
// // ****************************************************************************************

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Event.findByIdAndDelete(id)
    .then(() => res.redirect("/events"))
    .catch((error) => console.log(`Error while deleting a event: ${error}`));
});

// ****************************************************************************************
// GET route for displaying the event details page
// ****************************************************************************************

router.get("/:someEventId", (req, res) => {
  const { someEventId } = req.params;
  const isHosting = true;

  Event.findById(someEventId)
    .populate('host attendees')
    .then((foundEvent) => {
      console.log('Did I find a event?', foundEvent);
      // console.log(req.session.currentUser._id)
      // console.log(foundEvent.host._id)
      if(req.session.currentUser._id == foundEvent.host._id) {
        res.render("events/events-detail", { event: foundEvent, isHosting });
        console.log('HOSTING TRUE')
      } else {
        res.render("events/events-detail", { event: foundEvent });
        console.log('HOSTING FALSE')
      }
    })
    .catch((err) =>
      console.log(`Err while getting the specific event from the  DB: ${err}`)
    );
});

//////////////////////////////////////////////////////
/////////////// ATTEND/BOOK EVENT /////////////////////
/////////////////////////////////////////////////////

router.post('/:someEventId', (req, res) => {
  const { someEventId } = req.params;

  const userId = req.session.currentUser._id;

  Event.findByIdAndUpdate(someEventId, {attendees: [userId]})
  .then(updatedEvent => {
    console.log('Updated event: ', updatedEvent)
    res.redirect(`/events/${someEventId}`)
  });
})



module.exports = router;
