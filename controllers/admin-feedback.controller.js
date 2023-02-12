const Feedback = require('../models/admin-feedback.model');

class AdminFeedbackController {
    /**Code for Feedback */

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
     * @method feedbackView
     * @description Show the Feedbacks
     */
    async feedbackView(req, res) {
        try {
            let Data = await Feedback.find({ isDeleted: false });
            console.log(Data, 'Data: ');
            // req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
            res.render('admin/feedbackView', {
                title: 'Feedback || View',
                message: req.flash('message'),
                user: req.user,
                Data
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method feedbackDelete
     * @description Soft Deleting the faq
     */
    async feedbackDelete(req, res) {
        try {
            let dataUpdate = await Feedback.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            });
            if (dataUpdate && dataUpdate._id) {
                req.flash('message', 'Data Deleted!!');
                res.redirect('/admin/feedback-view')
            } else {
                req.flash('message', 'Data Not Deleted!');
                res.redirect('/admin/feedback-view')
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method feedbackEdit
     * @description Editing the details of the questions in faq
     */
    async feedbackEdit(req, res) {
        try {
            let Data = await Feedback.find({ _id: req.params.id });
            console.log(Data, 'Data');
            res.render('admin/feedbackEdit', {
                title: 'Feedback || Edit',
                message: req.flash('message'),
                user: req.user,
                response: Data[0]
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method feedbackUpdate
     * @description 
     */
    async feedbackUpdate(req, res) {
        try {
            // let data = await AdminFaq.find({_id: req.body.id});
            let questUpdate = await Feedback.findByIdAndUpdate(req.body.id, req.body);
            console.log(req.body, "req.body");
            console.log(questUpdate, "questUpdate");
            if (questUpdate && questUpdate._id) {
                console.log('Feedback Updated');
                req.flash('message', 'Data Updated!!');
                res.redirect('/admin/feedback-view');
            } else {
                console.log('Something Went Wrong');
                req.flash('message', 'Data Not Updated!');
                res.redirect('/admin/feedback-view');
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
                let contactData = await Feedback.find({ _id: req.params.id });
                // console.log(contactData, "Ahana De");

                let statusChange = contactData.status == 'active' ? 'inactive' : 'active';
                let updatedData = await Feedback.findByIdAndUpdate(req.params.id, { status: statusChange });
                if (updatedData && updatedData._id)
                    res.redirect('/admin/feedback-view');
            } catch (err) {
                throw err;
            }
        }
    /**End of code for feedback */
}

module.exports = new AdminFeedbackController();