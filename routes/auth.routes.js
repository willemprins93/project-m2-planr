// routes/auth.routes.js

const { Router } = require("express");
const router = new Router();

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

// ********* require Event model in order to use it *********
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const mongoose = require("mongoose");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../configs/cloudinary.config");

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get("/signup", (req, res) => res.render("auth/signup"));

// .post() route ==> to process form data
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

  // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!regex.test(password)) {
  //   res
  //     .status(500)
  //     .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
  //   return;
  // }

  // await User.find().then((banana) => {
  //   console.log("BANANA: ", req.body);
  //   res.render("auth/signup");
  // });

  // const salt = await bcryptjs.genSalt();
  // const passwordHash = await bcryptjs.hash(req.body.password, salt);
  // console.log("ALL GOOD IN THE HOOD");
  // try {
  //   const user = await User.create({
  //     email,
  //     firstName,
  //     lastName,
  //     passwordHash,
  //   });
  //   console.log("USEEEEEE", user);
  // } catch (error) {
  //   console.error(error);
  // }
  // return;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        // username: username
        name: {
          firstName,
          lastName,
        },
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
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

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the login form to users
router.get("/login", (req, res) => res.render("auth/login"));

// .post() login route ==> to process form data
router.post("/login", (req, res, next) => {
  // console.log('SESSION =====> ', req.session);
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
        // the following line gets replaced with what follows:
        // res.render('users/user-profile', { user });

        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = user;
        console.log(req.session);
        res.redirect("/cities");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("auth/profile/edit-profile/logout", (req, res) => {
  if (!user) {
    req.session.destroy();
    res.redirect("/login");
  }
});

// router.get('/userProfile', (req, res) => res.render('users/user-profile'));

// router.get("/userProfile", (req, res) => {
//   // console.log('your sess exp: ', req.session.cookie.expires);
//   res.render("users/user-profile", { userInSession: req.session.currentUser });
// });

////////////////////////////////////////////////////////////////////////////
///////////////////////////// USER PROFILE /////////////////////////////////
////////////////////////////////////////////////////////////////////////////

router.get("/profile", (req, res) => {
  if (req.session.currentUser) {
    const id = req.session.currentUser._id;

    User.findById(id)
      .populate("eventsHosting")
      .populate("eventsAttending")
      .then((userFromDB) => {
        console.log("User found : ", userFromDB);
        res.render("users/user-profile", { user: userFromDB });
      })
      .catch(error => console.log('Error retrieving user profile: ', error))
  } else {
    res.redirect("/auth/login");
  }
});

/////////////////////////////////////////////////////////////////////////////
///////////////////////////// EDIT AND UPDATE USER PROFILE ///////////////////
/////////////////////////////////////////////////////////////////////////////

router.get("/profile/edit", (req, res) => {
  if (req.session.currentUser) {
    res.render("users/user-edit", { user: req.session.currentUser });
  }
});
// with cloudinary to upload images
router.post("/profile/edit", (req, res) => {
  // fileUploader.single("image")
    const {
      firstName,
      lastName,
      email
    } = req.body;
    console.log('form data: ', firstName, lastName, email)
    const userId = req.session.currentUser._id;

    //   let photoUrl;
    // if (req.file) {
    //   photoUrl = req.file.path;
    // } else {
    //   photoUrl = req.body.existingImage;
    // }

    User
      .findByIdAndUpdate(userId, {
        name: {
          firstName,
          lastName
        },
        email
      }, 
      {
        new: true
      })
      .then((updatedProfile) => {
        console.log('Updated succesfully! Yey!', updatedProfile)
        res.redirect(`/auth/profile`)
      })
      .catch((error) => {
        console.log(`Error while updating profile: ${error}`);
      });
});

module.exports = router;
