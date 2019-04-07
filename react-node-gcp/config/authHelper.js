const ensureAuthenticated = (req, resp, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('info', 'Please log in to view that resource');
	resp.render('login', {message: req.flash('info')});
}

module.exports = {
	ensureAuthenticated
};