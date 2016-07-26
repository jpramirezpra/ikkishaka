var keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	//Index
	app.get('/', routes.views.index);

	// Views
	app.all('/contact', routes.views.contact);

	//Projects
	//app.all('/projects', routes.views.project);

	//Blog
	//app.all('/blog',routes.views.blog);
};
