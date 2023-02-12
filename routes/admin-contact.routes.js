const router = require('express').Router();
const adminController = require('../controllers/admin-contact.controller');


/**Code for Contact */
router.get('/contact-view', adminController.userAuth, adminController.contactView);
router.get('/contact-delete/:id', adminController.contactDelete);
router.get('/contact-edit/:id', adminController.userAuth, adminController.contactEdit);
router.get('/status-update/:id', adminController.statusUpdate);

router.post('/contact-update', adminController.contactUpdate);
/**End of Code for Contact */

module.exports = router;