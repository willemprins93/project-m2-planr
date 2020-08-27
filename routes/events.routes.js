const express = require("express");
const router = express.Router();

// ********* require Event model in order to use it *********
const Event = require("../models/Event.model");
const User = require('../models/User.model')

// ********* require fileUploader in order to use it *********
const fileUploader = require("../configs/cloudinary.config");

////////////////////////////////////////////////////////////////////////
/////////////////////// DISPLAY A LIST OF EVENTS ///////////////////////
////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////
////////////////////// CREATE A NEW EVENT //////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get("/create", (req, res) => res.render("events/events-create"));

router.post("/create", (req, res) => {
  // console.log(req.body);
  const { name, date, location, description } = req.body;

  const id = req.session.currentUser._id;

  Event.create({ name, date, location, description, host: id }).then(
    (eventFromDB) => {
      console.log(`New event created: ${eventFromDB.title}.`);
      res.redirect("/events");
    }
  );
  //   .then((eventCreated) => {
  //     console.log('Event succesfully created: ', eventCreated)
  //     res.redirect('/')
  //   })
  //   .catch(error => `Error while creating a new event: ${error}`);
});

////////////////////////////////////////////////////////////////////////
////////////////////// EDIT AN UPDATE AN EVENT /////////////////////////
////////////////////////////////////////////////////////////////////////

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
    .then((eventToEdit) => {
      // console.log(eventToEdit);
      res.render("events/events-edit", eventToEdit);
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
  } = req.body;

  Event.findByIdAndUpdate(
    id,
    { name, date, location, description },
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
    .then(() => res.redirect("/"))
    .catch((error) => console.log(`Error while deleting a event: ${error}`));
});

///////////////////////////////////////////////////////////////////////////
/////////////////////// EVENT DETAILS /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


router.get("/:someEventId", (req, res) => {
  const { someEventId } = req.params;

  Event.findById(someEventId)
    .populate('host attendees')
    .then((foundEvent) => {
      console.log('Did I find a event?', foundEvent);
      res.render("events/events-detail", foundEvent);
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
    console.log('Updated event: ', updatedEvent)
    res.redirect(`/events/${someEventId}`)
  });
})


module.exports = router;