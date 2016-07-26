var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;
		locals.enquiryTypes = Enquiry.fields.enquiryType.ops;	
		locals.formData = req.body || {};
		locals.validationErrors = {};
		locals.enquirySubmitted = false;
		locals.errors = false;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';


	// Render the view
	view.render('index');

};
