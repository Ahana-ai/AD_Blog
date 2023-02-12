const AdminUser = require('../models/admin-users.model');

class AdminUserController {
  /**Code for User Management */

  /**
   * @method addUser
   * @description Shows the page to add user
   */
  async addUser(req, res) {
    try {
      res.render('admin/addUser', {
        title: "Admin || User",
        user: req.user,
        role: req.user.role,
        message: req.flash('message')
      })
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method insertUser
   * @description takes the data from the add-user form
   */
  async insertUser(req, res) {
    try {
      //Removing the spaces
      req.body.firstName = req.body.firstName.trim();
      req.body.lastName = req.body.lastName.trim();
      req.body.email = req.body.email.trim();

      //Checking if the fields are blank or not
      if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        req.flash('message', "Field Should Not Be Empty!!");
        res.redirect('/admin/add-user');
      }
      req.body.image = req.file.filename;

      req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;

      //Checking if email already exists
      let isEmailExists = await AdminUser.find({ email: req.body.email, isDeleted: false });

      if (!isEmailExists.length) {
        let Data = await AdminUser.create(req.body);

        //Checking to see if Data is Saved
        if (Data && Data._id) {
          req.flash('message', 'Registration Successful!!');
          res.redirect('/admin/users-view');
        } else {
          req.flash('message', 'Registration Not Successful!!');
          res.redirect('/admin/add-user');
        }
        console.log(Data);
      } else {
        req.flash('message', 'Email already exists!!');
        res.redirect('/admin/add-user');
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method usersView
   * @description Shows the List of users registered 
   */
  async usersView(req, res) {
    try {
      let Data = await AdminUser.find({ isDeleted: false });

      res.render('admin/usersView', {
        title: "Admin || User Listing",
        message: req.flash('message'),
        alert: req.flash("alert"),
        success: req.flash("success"),
        user: req.user,
        Data
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
        res.redirect('/admin');
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method userDelete
   * @description Soft Deleting the Users
   */
  async userDelete(req, res) {
    try {
      let dataUpdate = await AdminUser.findByIdAndUpdate(req.params.id, {
        isDeleted: true
      });
      if (dataUpdate && dataUpdate._id) {
        req.flash('message', 'Data Deleted!!');
        res.redirect('/admin/users-view')
      } else {
        req.flash('message', 'Data Not Deleted!');
        res.redirect('/admin/users-view')
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method userEdit
   * @description Editing the details of the users
   */
  async userEdit(req, res) {
    try {
      let Data = await AdminUser.find({ _id: req.params.id });
      console.log(Data[0], 'Edit Data');
      res.render('admin/userEdit', {
        title: 'Admin || Edit',
        message: req.flash('message'),
        user: req.user,
        response: Data[0]
      })
    } catch (err) {
      throw err;
    }
  }

  /**
   * @method userUpdate
   * @description 
   */
  async userUpdate(req, res) {
    try {
      let data = await AdminUser.find({ _id: req.body.id });
      let isEmailExists = await AdminUser.find({ email: req.body.email, _id: { $ne: req.body.id } });
      console.log(isEmailExists.length, 'isEmailexists');
      console.log(isEmailExists);

      if (!isEmailExists.length) {

        req.body.image = req.file.filename;
        req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
        let studentUpdate = await AdminUser.findByIdAndUpdate(req.body.id, req.body);
        // let studentUpdate = await AdminUser.findByIdAndUpdate(req.body.id, {lastName: req.body.lastName});
        if (req.file && req.file.filename) {
          console.log(req.file, 'req.file');
          fs.unlinkSync(`./public/uploads/${data[0].image}`);
        }

        console.log(req.body, "req.body");
        console.log(studentUpdate, "studentUpdate");

        if (studentUpdate && studentUpdate._id) {
          console.log('User Updated');
          req.flash('message', 'Data Updated!!');
          res.redirect('/admin/users-view');
        } else {
          console.log('Something Went Wrong');
          req.flash('message', 'Data Not Updated!');
          res.redirect('/admin/users-view');
        }
      }
    } catch (err) {
      throw err;
    }
  }

  /**
 * @method statusUpdate
 * @description will change active to inactive and vice-versa
 */
  async statusUpdate(req, res) {
    try {
      let Data = await AdminUser.find({ _id: req.params.id });
      console.log(Data, "Data for user");

      let statusChange = Data.status == 'active' ? 'inactive' : 'active';
      let updatedData = await AdminUser.findByIdAndUpdate(req.params.id, { status: statusChange });
      if (updatedData && updatedData._id)
        res.redirect('/admin/users-view');
    } catch (err) {
      throw err;
    }
  }


  /**End of Code for User Management */

}

module.exports = new AdminUserController();