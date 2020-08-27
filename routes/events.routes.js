const express = require("express");
const router = express.Router();

// ********* require Event model in order to use it *********
const Event = require("../models/Event.model");
const User = require('../models/User.model')

// ********* require fileUploader in order to use it *********
const fileUploader = require("../configs/cloudinary.config");

// ********* require date-fns *********************************
const { format, compareAsc } = require('date-fns')

// ****************************************************************************************
// 1. GET route to display all the events
// ****************************************************************************************
////////////////////////////////////////////////////////////////////////
/////////////////////// DISPLAY A LIST OF EVENTS ///////////////////////
////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////
////////////////////// CREATE A NEW EVENT //////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get("/create", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  res.render("events/events-create")
});

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

////////////////////////////////////////////////////////////////////////
////////////////////// EDIT AN UPDATE AN EVENT /////////////////////////
////////////////////////////////////////////////////////////////////////

router.get("/:id/edit", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  const { id } = req.params;

  Event.findById(id)
    .then((eventToEdit) => {
        res.render("events/events-edit", {event: eventToEdit, niceDate });
    })
    .catch((error) =>
      console.log(`Error while getting a single event for edit: ${error}`)
    );
});

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

////////////////////////////////////////////////////////////////////////
////////////////////// DELETE AN EVENT /////////////////////////////////
////////////////////////////////////////////////////////////////////////


router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Event.findByIdAndDelete(id)
    .then(() => res.redirect("/events"))
    .catch((error) => console.log(`Error while deleting a event: ${error}`));
});

///////////////////////////////////////////////////////////////////////////
/////////////////////// EVENT DETAILS /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


router.get("/:someEventId", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login')
  }
  const { someEventId } = req.params;
  const isHosting = true;

  Event.findById(someEventId)
    .populate('host attendees')
    .then((foundEvent) => {
      console.log('Did I find a event?', foundEvent);
      const justDate = format(foundEvent.date, 'dd/MM/yyyy')
      const justTime = format(foundEvent.date, 'HH:mm')
      console.log('Just date: ', justDate)
      console.log('Just time: ', justTime)
      // console.log(req.session.currentUser._id)
      // console.log(foundEvent.host._id)
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

/////////////////////////////////////////////////////////////////////////
/////////////// ATTEND/BOOK EVENT //////////////////////////////////////
///////////////////////////////////////////////////////////////////////

router.post('/:someEventId', (req, res) => {
  const { someEventId } = req.params;

  const userId = req.session.currentUser._id;

  Event.findByIdAndUpdate(someEventId, {attendees: [userId]})
  .then(updatedEvent => {
    User.findByIdAndUpdate(userId, {eventsAttending: [updatedEvent]}, {new: true})
      .then(updatedUser => {
        res.redirect(`/events/${someEventId}`)
        console.log('Updated event: ', updatedEvent)
        console.log('Updated user: ', updatedUser)
      })
  });

})


module.exports = router;