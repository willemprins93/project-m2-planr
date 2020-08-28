const express = require('express');
const router = express.Router();

// redirect to 'cities' if logged in, 'log in' if not
router.get('/', (req, res, next) => {
    if(req.session.currentUser){
        res.redirect('/cities')
    } else {
        res.redirect('/auth/login')
    }
});

module.exports = router;
