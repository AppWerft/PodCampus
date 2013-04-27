function getFavs() {
	var props = Ti.App.Properties.listProperties();
	var favs = [];
	for (var i = 0, ilen = props.length; i < ilen; i++) {
		var res = null;
		if ( res = props[i].match(/podcastitem_(.*)/)) {
			Ti.API.log(res[1]);
			favs.push(JSON.parse(Ti.App.Properties.getString('podcastitem_' + res[1])));
		}
	}
	return favs;
}

exports.create = function() {
	var self = Ti.UI.createWindow({
		barImage : 'top.png',
		title : '',
		backgroundImage : '/assets/grid.png'
	});
	self.tv = Ti.UI.createTableView();
	self.add(self.tv);
	self.addEventListener('focus', function() {
		var rows = [];
		var favs = getFavs();
		for (var i = 0; i < favs.length; i++) {
			console.log(favs[i]);
			var row = require('/modules/itemsbychannel_row').create(favs[i]);
			rows.push(row);
		}
		self.tv.data = rows;
	});
	return self;
}
exports.get = getFavs;
