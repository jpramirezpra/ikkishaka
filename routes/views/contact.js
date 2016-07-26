var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.renderView = req.body.return || 'index';
	locals.errors = false;
	
	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {

		if(req.body.robot != "8"){
			locals.errors = true;
			locals.validationErrors.robot = {title:"name", message:"Please answer the question"};
			next();
		}
		else{
			var newEnquiry = new Enquiry.model(),
				updater = newEnquiry.getUpdateHandler(req);
			
			updater.process(req.body, {
				flashErrors: true,
				fields: 'name, email, phone, enquiryType, message',
				errorMessage: 'There was a problem submitting your enquiry:'
			}, function(err) {
				if (err) {
					locals.validationErrors = err.errors;
					locals.errors = true;
				} else {
					locals.enquirySubmitted = true;
					locals.formData = {};
				}
				next();
			});
		}
	});
	
	view.render(locals.renderView);
	
};
