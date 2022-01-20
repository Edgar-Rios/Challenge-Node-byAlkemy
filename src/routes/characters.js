const router = require('express').Router(),
controller = require('../controllers/charactersController');

router.get('/', controller.list);
router.get('/detail/:id', controller.detail);
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.get('/delete/:id', controller.delete);

module.exports = router;