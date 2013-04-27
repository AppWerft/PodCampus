exports.create = function() {
	/* UI */
	var self = require('modules/generic_window').create();
	self.actind.show();
	self.container = Ti.UI.createScrollableView({
		showPagingControl : true,
		cacheSize : 10,
		lastPage : 0
	});
	self.add(self.container);
	require('modules/model').getLatest(function(items) {
		var views = [];
		for (var i = 0; i < items.length; i++) {
			var res = require('modules/latest_view').create(items[i]);
			console.log(res);
			if (res.type == 'video') {
				views.push(res.view);
			}
		}
		self.container.setViews(views);
		self.actind.hide();
		/* Starting first: */
		views[0].player.setUrl(views[0].url);
		views[0].player.play();
		self.currentplayer = views[0].player

	});
	/* CONTROLs

	 *
	 * */
	self.container.addEventListener('scrollend', function(_e) {
		console.log('INIT NEW PLAYER');
		if (_e.view && _e.view.player) {
			_e.view.player.url = _e.view.url;
			_e.view.player.play();
			self.currentplayer = _e.view.player;
		}
		self.container.lastView = _e.view;
	});
	self.container.addEventListener('scroll', function(_e) {
		if (_e.dragging)  // vertical scroll inside
			return;
		console.log('HIDING OLD PLAYER');
		console.log(_e);
		/* Stopping currentplayer */
		if (self.currentplayer) {
			self.currentplayer.hide();
			if (self.currentplayer.playing) {
				console.log('STOPPING + HIDING OLD PLAYER');
				self.currentplayer.stop();
				self.currentplayer.release();
			}
		}
		/* detecting of swipe trefresh: */
		if (self.container.lastPage == 0 && _e.currentPage == 0 && _e.currentPageAsFloat == 0) {
			self.actind.show();
		} else {
			self.actind.hide();
		}
	});
	return self;
}
