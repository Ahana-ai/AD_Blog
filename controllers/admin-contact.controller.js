const Contact = require('../models/admin-contact.model');

class AdminContactController {
    /**Code for Contact */

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
     * @method contactView
     * @description Show the Feedbacks
     */
    async contactView(req, res) {
        try {
            let Data = await Contact.find({ isDeleted: false });
            console.log(Data, 'Data: ');
            // req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
            res.render('admin/contactView', {
                title: 'Contact || View',
                message: req.flash('message'),
                user: req.user,
                Data
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method contactDelete
     * @description Soft Deleting the faq
     */
    async contactDelete(req, res) {
        try {
            let dataUpdate = await Contact.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            });
            if (dataUpdate && dataUpdate._id) {
                req.flash('message', 'Data Deleted!!');
                res.redirect('/admin/contact-view')
            } else {
                req.flash('message', 'Data Not Deleted!');
                res.redirect('/admin/contact-view')
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method contactEdit
     * @description Editing the details of the questions in contact
     */
    async contactEdit(req, res) {
        try {
            let Data = await Contact.find({ _id: req.params.id });
            console.log(Data, 'Data');
            res.render('admin/contactEdit', {
                title: 'Contact || Edit',
                message: req.flash('message'),
                user: req.user,
                response: Data[0]
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method contactUpdate
     * @description 
     */
    async contactUpdate(req, res) {
        try {
            // let data = await AdminFaq.find({_id: req.body.id});
            let questUpdate = await Contact.findByIdAndUpdate(req.body.id, req.body);
            console.log(req.body, "req.body.......");
            console.log(questUpdate, "questUpdate......");
            if (questUpdate && questUpdate._id) {
                console.log('Contact Updated');
                req.flash('message', 'Data Updated!!');
                res.redirect('/admin/contact-view');
            } else {
                console.log('Something Went Wrong');
                req.flash('message', 'Data Not Updated!');
                res.redirect('/admin/contact-view');
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
    async statusUpdate(req, res){
        try {
            let contactData = await Contact.find({_id: req.params.id});
            // console.log(contactData, "Ahana De");

            let statusChange = contactData.status == 'active' ? 'inactive' : 'active';
            let updatedData = await Contact.findByIdAndUpdate(req.params.id, {status : statusChange});
            if(updatedData && updatedData._id)
                res.redirect('/admin/contact-view');
        } catch (err) {
            throw err;
        }
    }

    /**End of Code for Contact */
}

module.exports = new AdminContactController();