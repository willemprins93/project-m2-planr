// const express = require('express');
// const router = express.Router();

// const User = require('../models/User.model');
// const Event = require('../models/Event.model');
// const Comment = require('../models/Comment.model');
 
// ****************************************************************************************
// POST route - create a comment for a specific event
// ****************************************************************************************

// router.post('/:id/comment', (req, res) => {
//   const { eventid } = req.params;
//   const { user, text } = req.body;

//   let user;

//   User.findOne({ username: user })
//     .then(userDocFromDB => {
//       user = userDocFromDB;

      
//     })
//     .then(newUser => {
//       // prettier-ignore
//       Event.findById(event._id)
//       .then(dbEvents => {
//         let newComment;

//         // 2. the conditional is result of having the possibility that we have already existing or new users
//         if (newUser) {
//           newComment = new Comment({ user: newUser._id, content });
//         } else {
//           newComment = new Comment({ user: user._id, content });
//         }

//         // 3. when new comment is created, we save it ...
//         newComment
//         .save()
//         .then(dbComment => {

//           // ... and push its ID in the array of comments that belong to this specific post
//           dbEvents.comments.push(dbComment._id);

//           // 4. after adding the ID in the array of comments, we have to save changes in the post
//           dbEvents
//             .save()       // 5. if everything is ok, we redirect to the same page to see the comment
//             .then(updatedEvent => res.redirect(`/events/${updatedEvent._id}`))
//         });
//       });
//     })
//     .catch(err => console.log(`Error while creating the comment: ${err}`));
// });

// module.exports = router;






