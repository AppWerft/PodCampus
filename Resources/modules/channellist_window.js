exports.create = function() {
	var self = require('modules/generic_window').create();
	self.actind.show();

	var channelsList = Ti.UI.createTableView({
		top : 0,
		backgroundColor : 'white'
	});
	self.add(channelsList);

	var channelrow = require('modules/channellist_row');

	require('modules/model').getChannels(function(channels) {
		var rows = [];
		for (var i = 0; i < channels.length; i++) {
			rows.push(channelrow.create(channels[i]));
		}
		channelsList.setData(rows);
		self.actind.hide();
	});
	channelsList.addEventListener('click', function(e) {
		self.tab.open(require('/modules/itemsbychannel_window').create(e.rowData.channel));
	});
	return self;
}
