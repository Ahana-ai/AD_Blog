const Admin = require("../models/admin.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class AdminController {
  constructor() {}

  /**Code for Login-Registration Page */

  /**
   * @Method showIndex
   * @Description To Show The Index Page / Login Page
   */
  async showIndex(req, res) {
    try {
      res.render("admin/index", {
        title: "Admin || Login",
        alert: req.flash("alert"),
        message: req.flash("message"),
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method login
   * @description post the login page
   */
  async login(req, res) {
    try {
      //Removing the spaces
      req.body.email = req.body.email.trim();
      req.body.password = req.body.password.trim();

      console.log("req.user===>" + req.user);

      let isUserExists = await Admin.findOne({
        email: req.body.email,
        role: "Admin",
      });

      if (!req.body.password || !req.body.email) {
        req.flash("message", "Field Should Not be Empty!!");
        req.flash("alert", "error-msg");
        res.redirect("/admin");
      } else {
        if (isUserExists) {
          const hashPassword = isUserExists.password;
          if (bcrypt.compareSync(req.body.password, hashPassword)) {
            // token creation
            const token = jwt.sign(
              {
                id: isUserExists._id,
                fullName: isUserExists.fullName,
                email: isUserExists.email,
                image: isUserExists.image,
              },
              "M3S3CR3PKY5",
              { expiresIn: "24h" }
            );

            // req.user.token = token;
            res.cookie("userToken", token); // Set your cookie
            console.log("Logged In...");

            req.flash("message", "Welcome " + isUserExists.fullName);
            res.redirect("/admin/dashboard");
          } else {
            req.flash("message", "Wrong Password!");
            req.flash("alert", "error-msg");
            res.redirect("/admin");
          }
        } else {
          req.flash(
            "message",
            "Email does not exist or Email Needs to be verified!"
          );
          req.flash("alert", "error-msg");
          res.redirect("/admin");
        }
        console.log("isUserExists====>" + isUserExists);
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method logout
   * @description delete cookies
   */
  async logout(req, res) {
    console.log("Cookies======>" + req.cookies);
    res.clearCookie("userToken");
    console.log("Cookie Cleared!");
    res.redirect("/admin");
  }

  /**
   * @Method dashboard
   * @Description To Show The Dashboard
   */
  async dashboard(req, res) {
    try {
      console.log(req.user);
      res.render("admin/dashboard", {
        title: "Admin || Dashboard",
        user: req.user,
        // role: req.user.role,
        message: req.flash("message"),
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @Method template
   * @Description Basic Template
   */
  async template(req, res) {
    try {
      res.render("admin/template", {
        title: "Admin || Template",
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method userAuth
   * @description To authenticate users
   */
  async userAuth(req, res, next) {
    try {
      if (req.user) {
        next();
      } else {
        res.redirect("/admin");
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method register
   * @description to get the form
   */
  async register(req, res) {
    try {
      res.render("admin/register", {
        title: "Admin || Registration",
        alert: req.flash("alert"),
        success: req.flas("success"),
        message: req.flash("message"),
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method getDetails
   * @description to get the details in the form
   */
  async getDetails(req, res) {
    try {
      //Removing the spaces
      req.body.firstName = req.body.firstName.trim();
      req.body.lastName = req.body.lastName.trim();
      req.body.email = req.body.email.trim();
      req.body.password = req.body.password.trim();

      //Checking if the fields are blank or not
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password
      ) {
        req.flash("message", "Field Should Not Be Empty!!");
        req.flash("alert", "error-msg");
        res.redirect("/admin/register");
      }
      req.body.image = req.file.filename;
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
      req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;

      //Checking if email already exists
      let isEmailExists = await Admin.find({
        email: req.body.email,
        isDeleted: false,
      });

      if (!isEmailExists.length) {
        let Data = await Admin.create(req.body);

        //Checking to see if Data is Saved
        if (Data && Data._id) {
          req.flash("message", "Registration Successful!!");
          req.flash("success", "success-msg");
          res.redirect("/admin");
        } else {
          req.flash("message", "Registration Not Successful!!");
          req.flash("alert", "error-msg");
          res.redirect("/admin/register");
        }
        console.log(Data);
      } else {
        req.flash("message", "Email Already Exists!!");
        req.flash("alert", "error-msg");
        res.redirect("/admin/register");
      }
    } catch (err) {
      throw err;
    }
  }

  /**End of Code for Login-Registration Page */
}

module.exports = new AdminController();
