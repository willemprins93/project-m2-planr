const express = require("express");
const router = express.Router();

// require Models
const Event = require("../models/Event.model");
const User = require('../models/User.model')

// require fileUploader
const fileUploader = require("../configs/cloudinary.config");

// require date-fns
const { format, compareAsc } = require('date-fns')


// DISPLAY A LIST OF EVENTS ///////////////////////

router.get("/", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  Event.find()
    .then((allTheEventsFromDB) => {
      console.log(allTheEventsFromDB);
      res.render("events/events-list", { events: allTheEventsFromDB });
    })
    .catch((err) =>
      console.log(`Err while getting the events from the  DB: ${err}`)
    );
});

// CREATE A NEW EVENT //////////////////////////////

router.get("/create", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  res.render("events/events-create")
});

router.post("/create", (req, res) => {
  const { name, date, location, description, type } = req.body;

  const id = req.session.currentUser._id;

  Event.create({ name, date, location, description, type, host: id })
    .then((eventFromDB) => {
      console.log(`New event created: ${eventFromDB.title}.`);
      res.redirect("/events");
    })
    .catch(error => console.log(`Error while creating a new event: ${error}`));
});


// EDIT AND UPDATE AN EVENT /////////////////////////

router.get("/:id/edit", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  const { id } = req.params;
  console.log('ID: ', id)
  Event.findById(id)
    .then((eventToEdit) => {
        const fillDate = format(eventToEdit.date, 'yyyy-MM-dd\'T\'HH:mm')

        res.render("events/events-edit", {event: eventToEdit, fillDate });
    })
    .catch((error) =>
      console.log(`Error while getting a single event for edit: ${error}`)
    );
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  console.log(id)
  const {
    name,
    date,
    location,
    description,
    type
  } = req.body;

  Event.findByIdAndUpdate(
    id,
    { name, date, location, description, type },
    { new: true }
  )
    .then((updatedEvent) => {
      console.log('Event updated: ', updatedEvent)
      res.redirect(`/events/${updatedEvent._id}`)
    })
    .catch((error) => {
      console.log(`Error while updating a single event: ${error}`)
    });
});

// DELETE AN EVENT /////////////////////////////////

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Event.findByIdAndDelete(id)
    .then(() => res.redirect("/events"))
    .catch((error) => console.log(`Error while deleting a event: ${error}`));
});

// SINGLE EVENT DETAILS /////////////////////////////////////

router.get("/:id", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  const { id } = req.params;
  const isHosting = true;

  Event.findById(id)
    .populate('host attendees')
    .then((foundEvent) => {
      const justDate = format(foundEvent.date, 'dd/MM/yyyy')
      const justTime = format(foundEvent.date, 'HH:mm')

      if (foundEvent.host && foundEvent.host._id.toString() === req.session.currentUser._id.toString()) {
        res.render("events/events-detail", { event: foundEvent, isHosting, justDate, justTime });
        console.log('HOSTING TRUE')
      } else {
        res.render("events/events-detail", { event: foundEvent, justDate, justTime });
        console.log('HOSTING FALSE')
      }
    })
    .catch((err) =>
      console.log(`Err while getting the specific event from the  DB: ${err}`)
    );
});


// ATTEND/BOOK EVENT //////////////////////////////////////

router.post('/:id', (req, res) => {
  const { id } = req.params;

  const userId = req.session.currentUser._id;

  Event.findByIdAndUpdate(id, {attendees: [userId]})
  .then(updatedEvent => {
    User.findByIdAndUpdate(userId, {eventsAttending: [updatedEvent]}, {new: true})
      .then(updatedUser => {
        res.redirect(`/events/${id}`)
        console.log('Updated event: ', updatedEvent)
        console.log('Updated user: ', updatedUser)
      })
  })
  .catch(error => {
    console.log('Error while updating event: ', error)
  })

})



module.exports = router;