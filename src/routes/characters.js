const router = require('express').Router(),
controller = require('../controllers/charactersController'),
authCheck = require('../middleware/authCheck');

router.get('/', authCheck, controller.list);
router.post('/create', authCheck, controller.create);//C
router.get('/detail/:id', authCheck, controller.detail);//R
router.put('/update/:id', authCheck, authCheck, controller.update);//U
router.delete('/delete/:id', authCheck, controller.delete);//D

module.exports = router;