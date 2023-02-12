const Category = require('../models/admin-category.model');

class AdminCategoryController {
    /**
     * @method showAddCategory
     * @description To add categories
     */
    async showAddCategory(req, res){
        try {
            res.render('admin/addCategory', {
                message: req.flash('message'),
                user: req.user,
                alert: req.flash("alert"),
                success: req.flash("success"),
                title: "Admin || Category-Form"
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method addCategory
     * @description Stores the Category
     */
    async addCategory(req,res){
        try {
            //Removing the spaces
            req.body.category = req.body.category.trim();

            //Checking if the fields are blank or not
            if (!req.body.category) {
                req.flash('message', "Field Should Not Be Empty!!");
                req.flash("alert", "error-msg");
                res.redirect('/admin/add-category');
            }

            let Data = await Category.create(req.body);
            console.log(Data, "Category......");

            //Checking to see if Data is Saved
            if (Data && Data._id) {
                req.flash('message', 'Data Entered Successful!!');
                req.flash("success", "success-msg");
                res.redirect('/admin/view-category');
            } else {
                req.flash('message', 'Data entry Not Successful!!');
                req.flash("alert", "error-msg");
                res.redirect('/admin/add-category');
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method viewCategory
     * @description To view all the Blog Categories
     */
    async viewCategory(req,res){
        try {
            let Data = await Category.find({});

            res.render('admin/categoryView', {
                message: req.flash('message'),
                user: req.user,
                alert: req.flash("alert"),
                success: req.flash("success"),
                title: "Admin || Category-List",
                Data
            })
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new AdminCategoryController();