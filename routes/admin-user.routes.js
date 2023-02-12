const router = require('express').Router();
const adminController = require('../controllers/admin-user.controller');
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

/**Code for User Management */
router.get('/users-view', adminController.userAuth, adminController.usersView);
router.get('/user-delete/:id', adminController.userDelete);
router.get('/user-edit/:id', adminController.userAuth, adminController.userEdit);
router.get('/add-user', adminController.addUser);
router.get('/status-update/:id', adminController.statusUpdate);

router.post('/user-insert', upload.single('image'), adminController.insertUser);
router.post('/user-update', upload.single('image'), adminController.userUpdate);
/**End of Code for User Management */

module.exports = router;