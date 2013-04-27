exports.create = function(_id) {
	var self = require('modules/generic_window').create();
	self.actind.show();
	require('modules/model').getMediaByURL(_id, function(_media) {
		console.log(_media);
		self.actind.hide();
		self.container = Ti.UI.createScrollView({
			layout : 'vertical',
			height : Ti.UI.FILL,
			contentHeight : Ti.UI.SIZE,
			contentWidth : Ti.UI.FILL
		})
		self.add(self.container);
		var title = Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			top : 0,
			left : 10,
			right : 10,
			text : _media.title,
			color : '#777',
			font : {
				fontWeight : 'bold',
				fontSize : 20,
				fontFamily : 'LucidaSans-Typewriter'
			}
		});
		var description = Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			top : 0,
			left : 10,
			right : 10,
			text : _media.description,
			color : '#777',
			font : {
				fontWeight : 'bold',
				fontSize : 20,
				fontFamily : 'LucidaSans-Typewriter'
			}
		});
		var summarycontainer = Ti.UI.createScrollView({
			height : Ti.UI.SIZE,
			backgroundColor : 'white',
			opacity : 0,
			contentHeight : Ti.UI.SIZE
		});
		summarycontainer.animate(Ti.UI.createAnimation({
			opacity : 1
		}));
		var summary = Ti.UI.createLabel({
			text : _media.desription,
			left : 10,
			right : 10,
			font : {
				fontFamily : 'LucidaSans-Typewriter'
			},
			top : 10,
			height : Ti.UI.SIZE
		});
		self.player = Ti.Media.createVideoPlayer({
			width : Ti.UI.FILL,
			height : 180,
			left : 10,
			right : 10,
			top : 10,
			bottom : 10,
			backgroundColor : 'transparent',
			borderRadius : 6,
			allowsAirPlay : true,
			opacity : 0,
			mediaControlStyle : Ti.Media.VIDEO_CONTROL_EMBEDDED,
			scalingMode : Ti.Media.VIDEO_SCALING_ASPECT_FIT
		});
		self.player.animate(Ti.UI.createAnimation({
			opacity : 1,
			duration : 800
		}));
		self.player.addEventListener('fullscreen', function(e) {
			if (e.entering == true) {
				self.orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
			} else {
				self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
			}
		});
		self.player.url = _media.url;
		self.player.play();
		summarycontainer.add(description);
		self.container.add(title);
		self.container.add(self.player);
		self.container.add(summarycontainer);
	});
	return self;
}

