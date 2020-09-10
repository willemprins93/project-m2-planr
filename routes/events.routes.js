const express = require("express");
const router = express.Router();

// require Models
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

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

router.get("/filter/:type", (req, res) => {
  const { type } = req.params;

  Event.find({ type: type })
    .then((eventsFromDB) => {
      res.render("events/events-filtered-list", {
        events: eventsFromDB,
        type: type,
      });
    })
    .catch((error) => console.log("Error retrieving filtered events: ", error));
});

// CREATE A NEW EVENT //////////////////////////////

router.get("/create", (req, res) => {
  console.log("CREATE");
  if (!req.session.currentUser) {
    res.redirect("/auth/login");
  }
  res.render("events/events-create");
});

router.post("/create", fileUploader.single("image"), (req, res) => {
  const { name, date, city, address, description, type } = req.body;

  const id = req.session.currentUser._id;

  let photoUrl;
  if (req.file) {
    photoUrl = req.file.path;
  } else {
    photoUrl = req.body.existingImage;
  }
  // { name, date, description, location, address, type, photoUrl, host: id }
  Event.create({
    name,
    date,
    description,
    city,
    address,
    type,
    photoUrl,
    host: id,
  })
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
  //const { name, date, location, address, description, type } = req.body;
  const { name, date, city, description, type } = req.body;

  let photoUrl;
  if (req.file) {
    photoUrl = req.file.path;
  } else {
    photoUrl = req.body.existingImage;
  }

  Event.findByIdAndUpdate(
    id,
    //{ name, date, location, description, address, type, photoUrl },
    { name, date, city, description, type, photoUrl },
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

// SINGLE EVENT DETAILS AND UDPATE COMMENTS ON IT/////////////////////////////////////

//1.RETRIEVING EVENT DETAILS SITE
router.get("/:id", (req, res) => {
  if (!req.session.currentUser) {
    console.log();
    res.redirect("/auth/login");
  }
  const { id } = req.params;
  const isHosting = true;

  Event.findById(id)
    .populate([
      {
        path: "host",
        model: "User",
      },
      {
        path: "attendees",
        model: "User",
      },
      {
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      },
    ])
    .then((foundEvent) => {
      const currentUserId = req.session.currentUser._id;

      User.findById(currentUserId).then((currentUser) => {
        const justDate = format(foundEvent.date, "dd/MM/yyyy");
        const justTime = format(foundEvent.date, "HH:mm");

        if (
          foundEvent.host &&
          foundEvent.host._id.toString() ===
            req.session.currentUser._id.toString()
        ) {
          res.render("events/events-detail", {
            event: foundEvent,
            currentUser,
            isHosting,
            justDate,
            justTime,
          });
          console.log("HOSTING TRUE");
        } else {
          res.render("events/events-detail", {
            event: foundEvent,
            currentUser,
            justDate,
            justTime,
          });
          console.log("HOSTING FALSE");
        }
      })
      .catch((err) => console.log('Err while retrieving current User => :', err))
    })
    .catch((err) =>
      console.log(`Err while getting the specific event from the  DB: ${err}`)
    );
});

router.get("/:id/map-details", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
    .then((eventFromDB) => {
      const { location } = eventFromDB;

      res.json(location);
    })
    .catch((err) =>
      console.log("Error while retrieving location details: ", err)
    );
});

//2.CREATE A COMMENT ON SINGLE EVENT DETAILS SITE

router.post("/:id/comment", (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;

  Comment
    .create({user: userId, text})
    .then((newComment) => {
      Event.findByIdAndUpdate(
        id, 
        {$addToSet: {comments: newComment._id}},
        {new: true}
        ).then((updatedEvent) => {
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { comments: newComment._id } },
            { new: true }
          ).then((updatedUser) => {
            req.session.currentUser = updatedUser;
            res.redirect(`/events/${id}`);
            console.log("Updated event: ", updatedEvent);
            console.log("Updated user: ", updatedUser);
          })
          .catch(err => console.log('Error updating user with comment: ', err))
        })
        .catch(err => console.log('Error updating event with comment: ', err))
    })
    .catch(err => console.log('Error creating comment: ', err))

  // Event.findByIdAndUpdate(id, { user, text }, { new: true })
  //   .then((createdComment) => {
  //     console.log("Comment created : ", createdComment);
  //     res.render("events/events-detail", {
  //       //res.redirect(`/events/events-detail/${createdComment._id}`);
  //     });
  //   })
  //   .catch((err) => console.log(`Err while creating a comment : ${err}`));

  // .then(dbEvents => {
  //   let newComment;
  //   // saving new comments
  //   newComment
  //   .save()
  //   .then(dbComment => {
  //     // adding this comment to the list of comments
  //     dbEvents.comments.push(dbComment._id);
  //     // save changes in the event
  //     dbEvents
  //       .save()       // 5. if everything is ok, we redirect to the same page to see the comment
  //       .then(createdComment => res.redirect(`/events/${createdComment._id}`))
  //   });
  // });
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
      ).then((updatedUser) => {
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
