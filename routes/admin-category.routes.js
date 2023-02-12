const router = require('express').Router();
const CategoryController = require('../controllers/admin-category.controller');

router.get('/add-category', CategoryController.showAddCategory);
router.post('/add-category', CategoryController.addCategory);
router.get('/view-category', CategoryController.viewCategory);

module.exports = router;