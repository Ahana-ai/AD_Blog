const AdminFaq = require('../models/admin-faq.model');

class AdminFaqController {
    /**FAQ Management */

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
     * @method faq
     * @description Rendering the FAQ Page Tables
     */
    async faq(req, res) {
        try {
            let Data = await AdminFaq.find({ isDeleted: false });

            res.render('admin/faqView', {
                message: req.flash('message'),
                user: req.user,
                alert: req.flash("alert"),
                success: req.flash("success"),
                title: "Admin || FAQ-List",
                Data
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method getFaqForm
     * @description get the form
     */

    async getFaqForm(req, res) {
        try {
            res.render('admin/faqForm', {
                message: req.flash('message'),
                user: req.user,
                title: "Admin || FAQ-Form"
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method postFaqForm
     * @description get the details from the form
     */

    async postFaqForm(req, res) {
        try {
            //Removing the spaces
            req.body.question = req.body.question.trim();
            req.body.answer = req.body.answer.trim();

            //Checking if the fields are blank or not
            if (!req.body.question || !req.body.answer) {
                req.flash('message', "Field Should Not Be Empty!!");
                res.redirect('/admin/faq-form');
            }

            let Data = await AdminFaq.create(req.body);
            console.log(Data);

            //Checking to see if Data is Saved
            if (Data && Data._id) {
                req.flash('message', 'Data Entered Successful!!');
                res.redirect('/admin/faq-list');
            } else {
                req.flash('message', 'Data entry Not Successful!!');
                res.redirect('/admin/faq-form');
            }
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * @method faqDelete
     * @description Soft Deleting the faq
     */
    async faqDelete(req, res) {
        try {
            let dataUpdate = await AdminFaq.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            });
            if (dataUpdate && dataUpdate._id) {
                req.flash('message', 'Data Deleted!!');
                res.redirect('/admin/faq-list')
            } else {
                req.flash('message', 'Data Not Deleted!');
                res.redirect('/admin/faq-list')
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method faqEdit
     * @description Editing the details of the questions in faq
     */
    async faqEdit(req, res) {
        try {
            let Data = await AdminFaq.find({ _id: req.params.id });
            console.log(Data, 'Data');
            res.render('admin/faqEdit', {
                title: 'FAQ || Edit',
                message: req.flash('message'),
                user: req.user,
                response: Data[0]
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method faqUpdate
     * @description 
     */
    async faqUpdate(req, res) {
        try {
            // let data = await AdminFaq.find({_id: req.body.id});
            let questUpdate = await AdminFaq.findByIdAndUpdate(req.body.id, req.body);
            console.log(req.body, "req.body");
            console.log(questUpdate, "questUpdate");
            if (questUpdate && questUpdate._id) {
                console.log('FAQ Updated');
                req.flash('message', 'Data Updated!!');
                res.redirect('/admin/faq-list');
            } else {
                console.log('Something Went Wrong');
                req.flash('message', 'Data Not Updated!');
                res.redirect('/admin/faq-list');
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
            let Data = await AdminFaq.find({ _id: req.params.id });
            // console.log(Data, "Ahana De");

            let statusChange = Data.status == 'active' ? 'inactive' : 'active';
            let updatedData = await AdminFaq.findByIdAndUpdate(req.params.id, { status: statusChange });
            if (updatedData && updatedData._id)
                res.redirect('/admin/faq-list');
            else{
                res.redirect('/admin/faq-list');
                req.flash("message", "Could not Change the Status");
                req.flash("alert", "error-msg");
            }
        } catch (err) {
            throw err;
        }
    }


    /**End of Code for FAQ Management */
}

module.exports = new AdminFaqController();