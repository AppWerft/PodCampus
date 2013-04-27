exports.create = function() {
	var self = Ti.UI.createWindow({
		barImage : 'top.png',
		title : '',
		backgroundImage : '/assets/grid.png',
	});
	var dummy = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50
	});
	self.leftNavButton = dummy;
	dummy.addEventListener('click', function() {
		self.close({
			animated : true
		});
	});
	self.actind = require('modules/actind').create();
	self.add(self.actind);
	return self;
}