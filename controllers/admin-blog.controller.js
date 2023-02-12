const AdminBlog = require('../models/admin-blog.model');

class AdminBlogController {
    /**Code For Blog Management */

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
     * @method blogView
     * @description 
    */
    async blogView(req, res) {
        try {
            let Data = await AdminBlog.find({ isDeleted: false });

            res.render('admin/blogView', {
                message: req.flash('message'),
                user: req.user,
                alert: req.flash("alert"),
                success: req.flash("success"),
                title: "Admin || BLOG-List",
                Data
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method getBlogForm
     * @description get the form
     */

    async getBlogForm(req, res) {
        try {
            res.render('admin/blogForm', {
                message: req.flash('message'),
                user: req.user,
                title: "Admin || BLOG-Form"
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method postBlogForm
     * @description get the details from the form
     */

    async postBlogForm(req, res) {
        try {
            //Removing the spaces
            req.body.title = req.body.title.trim();
            req.body.date = req.body.date.trim();
            req.body.writer = req.body.writer.trim();
            req.body.content = req.body.content.trim();


            //Checking if the fields are blank or not
            if (!req.body.title || !req.body.date || !req.body.writer || !req.body.content) {
                req.flash('message', "Field Should Not Be Empty!!");
                res.redirect('/admin/blog-form');
            }
            console.log(req.file, 'req.file');
            req.body.image = req.file.filename;

            let Data = await AdminBlog.create(req.body);
            console.log(Data);

            //Checking to see if Data is Saved
            if (Data && Data._id) {
                req.flash('message', 'Data Entered Successful!!');
                res.redirect('/admin/blog-list');
            } else {
                req.flash('message', 'Data entry Not Successful!!');
                res.redirect('/admin/blog-form');
            }
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * @method blogDelete
     * @description Soft Deleting the faq
     */
    async blogDelete(req, res) {
        try {
            let dataUpdate = await AdminBlog.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            });
            if (dataUpdate && dataUpdate._id) {
                req.flash('message', 'Data Deleted!!');
                res.redirect('/admin/blog-list')
            } else {
                req.flash('message', 'Data Not Deleted!');
                res.redirect('/admin/blog-list')
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method blogEdit
     * @description Editing the details of the questions in faq
     */
    async blogEdit(req, res) {
        try {
            let Data = await AdminBlog.find({ _id: req.params.id });
            console.log(Data);
            res.render('admin/blogEdit', {
                title: 'BLOG || Edit',
                message: req.flash('message'),
                user: req.user,
                response: Data[0]
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method blogqUpdate
     * @description 
     */
    async blogUpdate(req, res) {
        try {
            req.body.image = req.file.filename;
            let contUpdate = await AdminBlog.findByIdAndUpdate(req.body.id, req.body);

            if (req.file && req.body.filename) {
                fs.unlinkSync(`./public/uploads/${data[0].image}`);
            }
            console.log(req.body, "req.body");
            console.log(contUpdate, "contUpdate");
            if (contUpdate && contUpdate._id) {
                console.log('Blog Updated');
                req.flash('message', 'Data Updated!!');
                res.redirect('/admin/blog-list');
            } else {
                console.log('Something Went Wrong');
                req.flash('message', 'Data Not Updated!');
                res.redirect('/admin/blog-list');
            }
        }
        catch (err) {
            throw err;
        }
    }

    /**
 * @method statusUpdate
 * @description will change active to inactive and vice-versa
 */
    async statusUpdate(req, res) {
        try {
            let Data = await AdminBlog.find({ _id: req.params.id });
            // console.log(contactData, "Ahana De");

            let statusChange = Data.status == 'active' ? 'inactive' : 'active';
            let updatedData = await AdminBlog.findByIdAndUpdate(req.params.id, { status: statusChange });
            if (updatedData && updatedData._id)
                res.redirect('/admin/blog-list');
        } catch (err) {
            throw err;
        }
    }

    /**End of Code for Blog Management */
}

module.exports = new AdminBlogController();