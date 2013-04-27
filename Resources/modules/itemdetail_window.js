exports.create = function(_media) {
	var self = Ti.UI.createWindow({
		barImage : 'top.png',
		backgroundImage : '/assets/grid.png',
	});
	var url = _media.item.enclosure.url;
	var type = _media.item.enclosure.type.split('/')[0];
	self.container = Ti.UI.createScrollView({
		layout : 'vertical',
		height : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,
		contentWidth : Ti.UI.FILL
	})
	self.add(self.container);
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
	var title = Ti.UI.createLabel({
		height : Ti.UI.SIZE,
		top : 0,
		left : 10,
		right : 10,
		text : _media.item.title,
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
		text : _media.item.description,
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
		text : _media.item.desription,
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
		height : (type != 'audio') ? 180 : 22,
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
	self.fav = Ti.UI.createButton({
		top : 5,
		right : 5,
		width : 36,
		height : 36,
		backgroundImage : '/assets/fav.png'
	});
	self.fav.addEventListener('click', function() {
		self.fav.hide();
		Ti.App.Properties.setString('podcastitem_' + Ti.Utils.md5HexDigest(url), JSON.stringify(_media));
		Ti.App.fireEvent('setfav', {});
	});
	self.addEventListener('open', function() {
		self.player.url = url;
		self.player.play();
	})
	summarycontainer.add(description);
	self.container.add(title);
	self.container.add(self.player);
	if (!Ti.App.Properties.hasProperty('podcastitem_' + Ti.Utils.md5HexDigest(url)))
		self.player.add(self.fav);

	self.container.add(summarycontainer);

	title.addEventListener('click', function() {
		self.close({animated:true});
	});
	setTimeout(function() {

	}, 500);
	return self;
}

