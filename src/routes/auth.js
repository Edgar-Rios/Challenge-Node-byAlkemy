const router = require('express').Router(),
controller = require('../controllers/authController');

router.post('/login', controller.login);
router.post('/register', controller.register);


router.post('/log-out', (req, res) => {
    if(req.cookies.Cookie_1) {
        res.cookie("userToken", "", {maxAge: -1})
    }
    res.send("sesion eliminada")
});

router.get('/check', (req, res) => {
    res.send({tokenIs: req.cookies.userToken})
});



module.exports = router;