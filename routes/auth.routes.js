const { Router } = require("express");
const router = new Router();

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

// require Models
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const mongoose = require("mongoose");

// require fileUploader
const fileUploader = require("../configs/cloudinary.config");

// SIGNUP //////////////////////////////////

router.get("/signup", (req, res) => res.render("auth/signup"));

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your first name, last name, email and password.",
    });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render("auth/signup", {
        errorMessage:
          "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
      });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        name: {
          firstName,
          lastName,
        },
        email,
        passwordHash: hashedPassword,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/auth/login");
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
        console.log("Error with Mongoose");
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

// LOGIN ////////////////////////////////////

router.get("/login", (req, res) => res.render("auth/login"));

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = user;
        res.redirect("/cities");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

// LOGOUT ////////////////////////////////////

router.post("/profile/logout", (req, res) => {
  if (req.session.currentUser) {
    req.session.destroy();
    res.redirect("/auth/login");
  }
});

// OTHER PROFILES ///////////////////////////////

router.get("/:id/profile", (req, res) => {
  if (req.session.currentUser) {
    const { id } = req.params;
    const isUser = false;

    User.findById(id)
      .populate([{
        path: 'eventsHosting', 
        model: 'Event'
      }, {
        path: 'eventsAttending',
        model: 'Event'
      }])
      .then((userFromDB) => {
        console.log("User found for profile: ", userFromDB);
        res.render("users/user-profile", { user: userFromDB, isUser });
      })
      .catch((error) => console.log("Error retrieving user profile: ", error));
  } else {
    res.redirect("/auth/login");
  }
});


// USER PROFILE /////////////////////////////////

router.get("/profile", (req, res) => {
  if (req.session.currentUser) {
    const id = req.session.currentUser._id;
    const isUser = true;

    User.findById(id)
      .populate([{
        path: 'eventsHosting', 
        model: 'Event'
      }, {
        path: 'eventsAttending',
        model: 'Event'
      }])
      .then((userFromDB) => {
        console.log("User found for profile: ", userFromDB);
        res.render("users/user-profile", { user: userFromDB, isUser });
      })
      .catch((error) => console.log("Error retrieving user profile: ", error));
  } else {
    res.redirect("/auth/login");
  }
});

// EDIT USER PROFILE ///////////////////

router.get("/profile/edit", (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .then(userFromDB => {
        res.render("users/user-edit", { user: userFromDB })
      })
  }
});

// with cloudinary to upload images
router.post("/profile/edit", fileUploader.single("image"), (req, res) => {
  // fileUploader.single("image")
  const { firstName, lastName, email } = req.body;
  console.log("form data: ", firstName, lastName, email);
  const userId = req.session.currentUser._id;

  let photoUrl;
  if (req.file) {
    photoUrl = req.file.path;
  } else {
    photoUrl = req.body.existingImage;
  }

  User.findByIdAndUpdate(
    userId,
    {
      name: {
        firstName,
        lastName,
      },
      email,
      photoUrl
    },
    {
      new: true,
    }
  )
    .then((updatedProfile) => {
      console.log("Updated succesfully! Yey!", updatedProfile);
      res.redirect(`/auth/profile`);
    })
    .catch((error) => {
      console.log(`Error while updating profile: ${error}`);
    });
});

// DELETE USER //////////////////////////////////
router.post("/profile/delete", (req, res) => {
  const id = req.session.currentUser._id;

  User.findByIdAndDelete(id)
    .then(() => res.redirect("/auth/signup"))
    .catch((error) => console.log(`Error while deleting a event: ${error}`));
});



module.exports = router;