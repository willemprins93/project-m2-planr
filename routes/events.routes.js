const express = require("express");
const router = express.Router();

// require Models
const Event = require("../models/Event.model");
const User = require("../models/User.model");

// require fileUploader
const fileUploader = require("../configs/cloudinary.config");

// require date-fns
const { format, compareAsc } = require("date-fns");

// DISPLAY A LIST OF EVENTS ///////////////////////

router.get("/", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/login");
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

// FILTERED PAGES //////////////////////////////////

router.get('/art', (req, res) => {
  Event.find({type: 'art'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Art'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/culture', (req, res) => {
  Event.find({type: 'culture'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Culture'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/food', (req, res) => {
  Event.find({type: 'food'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Food'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/games', (req, res) => {
  Event.find({type: 'games'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Games'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/music', (req, res) => {
  Event.find({type: 'music'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Music'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/networking', (req, res) => {
  Event.find({type: 'networking'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Networking'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/outdoor', (req, res) => {
  Event.find({type: 'outdoor'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Outdoor'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});

router.get('/sport', (req, res) => {
  Event.find({type: 'sport'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Sport'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});


router.get('/tech', (req, res) => {
  Event.find({type: 'tech'})
    .then(eventsFromDB => {
      res.render('events/events-filtered-list', {events: eventsFromDB, type: 'Tech'})
    })
    .catch(error => console.log('Error retrieving filtered events: ', error))
});



// CREATE A NEW EVENT //////////////////////////////

router.get("/create", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/login");
  }
  res.render("events/events-create");
});

router.post("/create", fileUploader.single("image"), (req, res) => {
  const { name, date, location, description, type } = req.body;

  const id = req.session.currentUser._id;

  let photoUrl;
  if (req.file) {
    photoUrl = req.file.path;
  } else {
    photoUrl = req.body.existingImage;
  }

  Event.create({ name, date, location, description, type, photoUrl, host: id })
    .then((eventFromDB) => {
      console.log(`New event created: ${eventFromDB.title}.`);
      res.redirect("/events");
    })
    .catch((error) =>
      console.log(`Error while creating a new event: ${error}`)
    );
});

// EDIT AND UPDATE AN EVENT /////////////////////////

router.get("/:id/edit", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/login");
  }
  const { id } = req.params;

  Event.findById(id)
    .then((eventToEdit) => {
      const fillDate = format(eventToEdit.date, "yyyy-MM-dd'T'HH:mm");

      res.render("events/events-edit", { event: eventToEdit, fillDate });
    })
    .catch((error) =>
      console.log(`Error while getting a single event for edit: ${error}`)
    );
});

router.post("/:id/edit", fileUploader.single("image"), (req, res) => {
  const { id } = req.params;

  const { name, date, location, description, type } = req.body;

  let photoUrl;
  if (req.file) {
    photoUrl = req.file.path;
  } else {
    photoUrl = req.body.existingImage;
  }

  Event.findByIdAndUpdate(
    id,
    { name, date, location, description, type, photoUrl },
    { new: true }
  )
    .then((updatedEvent) => {
      console.log("Event updated: ", updatedEvent);
      res.redirect(`/events/${updatedEvent._id}`);
    })
    .catch((error) => {
      console.log(`Error while updating a single event: ${error}`);
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
    res.redirect("/auth/login");
  }
  const { id } = req.params;
  const isHosting = true;

  Event.findById(id)
    .populate("host attendees")
    .then((foundEvent) => {
      const justDate = format(foundEvent.date, "dd/MM/yyyy");
      const justTime = format(foundEvent.date, "HH:mm");

      if (
        foundEvent.host &&
        foundEvent.host._id.toString() ===
          req.session.currentUser._id.toString()
      ) {
        res.render("events/events-detail", {
          event: foundEvent,
          isHosting,
          justDate,
          justTime,
        });
        console.log("HOSTING TRUE");
      } else {
        res.render("events/events-detail", {
          event: foundEvent,
          justDate,
          justTime,
        });
        console.log("HOSTING FALSE");
      }
    })
    .catch((err) =>
      console.log(`Err while getting the specific event from the  DB: ${err}`)
    );
});

// ATTEND/BOOK EVENT //////////////////////////////////////

router.post("/:id", (req, res) => {
  const { id } = req.params;

  const userId = req.session.currentUser._id;

  Event.findByIdAndUpdate(
    id, 
    { $addToSet: { attendees: [userId] } }, 
    { new: true }
    )
    .then((updatedEvent) => {
      User.findByIdAndUpdate(
        userId,
        { $addToSet: { eventsAttending: updatedEvent._id } },
        { new: true }
      )
      .then((updatedUser) => {
        req.session.currentUser = updatedUser;
        res.redirect(`/events/${id}`);
        console.log("Updated event: ", updatedEvent);
        console.log("Updated user: ", updatedUser);
      });
    })
    .catch((error) => {
      console.log("Error while updating event: ", error);
    });
});

module.exports = router;
