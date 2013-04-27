exports.create = function(channel) {
	var self = require('modules/generic_window').create();
	var dummy = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		top : 0
	});
	self.leftNavButton = dummy;

	self.tv = Ti.UI.createTableView({
		top : 50
	});
	var titleview = Ti.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 5,
		textAlign : 'left',
		top : '5dp',
		color : '#555',
		text : channel.title,
		font : {
			fontWeight : 'bold',
			fontSize : 16,
			fontFamily : 'LucidaSans-Typewriter'
		}
	});
	self.add(self.tv);
	self.add(titleview);
	self.actind.show();
	require('modules/model').getChannel(channel.id, function(_data) {
		var rows = [];
		for (var i = 0; i < _data.items.length; i++) {
			rows.push(require('modules/itemsbychannel_row').create({
				item : _data.items[i],
				channel : channel
			}));
		}
		console.log(rows);
		self.tv.setData(rows);
		self.actind.hide();
	});
	self.tv.addEventListener('click', function(_e) {
		self.tab.open(require('modules/itemdetail_window').create(_e.rowData.item));
	});
	dummy.addEventListener('click', function() {
		self.close({
			animated : true
		});
	});
	self.addEventListener('close', function() {
		self = null
	});
	return self;
}

