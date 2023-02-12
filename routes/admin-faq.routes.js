const router = require('express').Router();
const adminController = require('../controllers/admin-faq.controller');

/**Code for FAQ Management */
router.get('/faq-list', adminController.userAuth, adminController.faq);
router.get('/faq-form', adminController.userAuth, adminController.getFaqForm);
router.get('/faq-delete/:id', adminController.faqDelete);
router.get('/faq-edit/:id', adminController.userAuth, adminController.faqEdit);
router.get('/status-update/:id', adminController.statusUpdate);


router.post('/faq-update', adminController.faqUpdate);
router.post('/faq-insert', adminController.postFaqForm);
/**End of Code for FAQ Management */

module.exports = router;