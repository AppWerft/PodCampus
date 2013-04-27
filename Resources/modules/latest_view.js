exports.create = function(_media) {
	var type = _media.enclosure.type.split('/')[0];
	console.log(type);
	if (type === 'audio')
		return {
			view : null,
			type : type
		};
	var self = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});
	self.url = _media.enclosure.url;
	self.container = Ti.UI.createScrollView({
		layout : 'vertical',
		height : Ti.UI.FILL,
		left : 10,
		right : 10,
		top : 0,
		contentHeight : Ti.UI.SIZE,
		contentWidth : Ti.UI.FILL
	})
	self.add(self.container);
	if (_media.title)
		self.container.add(Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			top : 10,
			left : 0,
			text : _media.title,
			color : '#777',
			font : {
				fontWeight : 'bold',
				fontSize : 20,
				fontFamily : 'LucidaSans-Typewriter'
			}
		}));

	self.player = Ti.Media.createVideoPlayer({
		width : Ti.UI.FILL,
		height : (type != 'audio') ? 180 : 22,
		top : 10,
		backgroundColor : 'transparent',
		borderRadius : 6,
		allowsAirPlay : true,
		autoplay : false,
		mediaControlStyle : Ti.Media.VIDEO_CONTROL_EMBEDDED,
		scalingMode : Ti.Media.VIDEO_SCALING_ASPECT_FIT,
		visible : false
	});
	self.player.animate({
		opacity : 1,
		duration : 800
	});
	self.player.addEventListener('fullscreen', function(e) {
		if (e.entering == true) {
			self.orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
		} else {
			self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
		}
	});
	self.fav = Ti.UI.createButton({
		top : 5,
		right : 5,
		width : 36,
		height : 36,
		backgroundImage : '/assets/fav.png'
	});
	self.fav.addEventListener('click', function() {
		self.fav.hide();
		Ti.App.Properties.setString('podcastitem_' + Ti.Utils.md5HexDigest(self.url), JSON.stringify(_media));
		Ti.App.fireEvent('setfav', {});
	});

	self.container.add(self.player);
	self.player.addEventListener('playing', function() {
		self.player.show();
		if (self.fav && !Ti.App.Properties.hasProperty('podcastitem_' + Ti.Utils.md5HexDigest(self.url)))
			self.player.add(self.fav);
	});
	self.player.addEventListener('stop', function() {
		self.player.hide();
	});
	if (_media.description)
		self.container.add(Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			top : 10,
			left : 0,
			text : _media.description,
			color : '#777',
			font : {
				fontWeight : 'bold',
				fontSize : 20,
				fontFamily : 'LucidaSans-Typewriter'
			}
		}));

	return {
		type : type,
		view : self
	};
}