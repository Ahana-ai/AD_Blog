const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const multer = require("multer");
const path = require("path");

/*Code for Login-Registration Page */

// Code For uploading Profile Images in the Registratiion Form
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "myimg" +
        path.extname(file.originalname)
    );
  },
});

const maxSize = 1 * 1024 * 1024;

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("only jpg and png allowed"));
    }
  },
  limits: maxSize,
});

router.get("/", adminController.showIndex);
router.get("/dashboard", adminController.userAuth, adminController.dashboard);
router.get("/template", adminController.template);
router.get("/register", adminController.register);
router.get("/logout", adminController.logout);

router.post("/insert", upload.single("image"), adminController.getDetails);
router.post("/login", adminController.login);

/**End of Login-Registration Page */

module.exports = router;
