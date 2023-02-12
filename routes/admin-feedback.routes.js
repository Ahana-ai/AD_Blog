const router = require('express').Router();
const adminController = require('../controllers/admin-feedback.controller');

/**Code for Feedback */
router.get('/feedback-view', adminController.userAuth, adminController.feedbackView);
router.get('/feedback-delete/:id', adminController.feedbackDelete);
router.get('/feedback-edit/:id', adminController.userAuth, adminController.feedbackEdit);
router.get('/status-update/:id', adminController.statusUpdate);

router.post('/feedback-update', adminController.feedbackUpdate);
/**End of code for Feedback */


module.exports = router;