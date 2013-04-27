exports.create = function() {
	var self = require('modules/generic_window').create();
	self.searchbar = Titanium.UI.createSearchBar({
		barColor : '#ccc',
		showCancel : false,
		top : 0,
		height : 50,
		hintText : 'Suche nach Podcasts …'
	});
	self.dummy = Titanium.UI.createTableView({
		search : self.searchbar,
		height : 50,
		top : 0,
		searchHidden : false,
	});
	self.add(self.dummy);
	self.add(self.searchbar);
	self.list = Ti.UI.createTableView({
		top : 45,
		backgroundColor : 'white'
	});
	self.add(self.list);
	
	self.list.addEventListener('click', function(_e) {
		self.tab.open(require('/modules/searchdetail_window').create(_e.rowData.id));
	});

	self.searchbar.addEventListener('change', function() {
		if (self.searchbar.getValue().length < 4)
			return;
		self.actind.show();
		if (self.timer)
			clearTimeout(self.timer);
		self.timer = setTimeout(function() {
			self.searchbar.blur();
		}, 2000);
		require('modules/model').search(self.searchbar.getValue(), function(_data) {
			var rows = [];
			for (var i = 0; i < _data.length; i++) {
				var node = _data[i].node;
				rows[i] = require('modules/search_row').create(node);
			}
			self.list.setData(rows);
			self.actind.hide();
		});
	});
	return self;
}
