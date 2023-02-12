const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//setting the view engine and connecting the views folder
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

//setting the .env file
require("dotenv").config();

//setting the cookie parser
app.use(cookieParser());

//setting up the connect-flash and express-session
app.use(
  session({
    secret: "M3S3CR3PKY5",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

//setting up the web token
const jwtAuth = require("./middleware/authJwt");
app.use(jwtAuth.authJwt);

//setting dbDriver in mongoose
const dbDriver =
  "mongodb+srv://ahana100:5vXA4txUgGkchkUb@cluster0.djmj1ek.mongodb.net/basicadmin";

//setting up the routes for the server
const adminRouter = require("./routes/admin.routes");
app.use("/admin", adminRouter);

const adminUserRouter = require("./routes/admin-user.routes");
app.use("/admin", adminUserRouter);

const adminBlogRouter = require("./routes/admin-blog.routes");
app.use("/admin", adminBlogRouter);

const adminFeedbackRouter = require("./routes/admin-feedback.routes");
app.use("/admin", adminFeedbackRouter);

const adminFaqRouter = require("./routes/admin-faq.routes");
app.use("/admin", adminFaqRouter);

const adminContactRouter = require("./routes/admin-contact.routes");
app.use("/admin", adminContactRouter);

const adminCategoryRouter = require("./routes/admin-category.routes");
app.use("/admin", adminCategoryRouter);

//creating the port for the server
const port = process.env.PORT || 1998;

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Db is connected`);
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
