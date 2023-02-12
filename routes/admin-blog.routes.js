const router = require('express').Router();
const adminController = require('../controllers/admin-blog.controller');
const multer = require('multer');
const path = require('path');

/*Code for Login-Registration Page */

// Code For uploading Profile Images in the Registratiion Form
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + 'myimg' + path.extname(file.originalname));
    }
});

const maxSize = 1 * 1024 * 1024;

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('only jpg and png allowed'));
        }
    },
    limits: maxSize
})

/**Code for Blog Management */
router.get('/blog-list', adminController.userAuth, adminController.blogView);
router.get('/blog-form', adminController.userAuth, adminController.getBlogForm);
router.get('/blog-delete/:id', adminController.blogDelete);
router.get('/blog-edit/:id', adminController.userAuth, adminController.blogEdit);
router.get('/status-update/:id', adminController.statusUpdate);


router.post('/blog-update', upload.single('image'), adminController.blogUpdate);
router.post('/blog-insert', upload.single('image'), adminController.postBlogForm);
/**End of Code for Blog Management */


module.exports = router;