exports.create = function(_data) {
	var self = Ti.UI.createTableViewRow({
		//hasChild : (item.type == 'video') ? true : false,
		selectedBackgroundColor : 'orange',
		backgroundColor : 'white',
		item:_data,
	});console.log(_data);
	var thumbnail = Ti.UI.createImageView({
		width : 90,
		left : 0,
		top : 0,
		defaultImage : '',
		image : _data.channel.image,
		height : Ti.UI.SIZE
	});
	self.add(thumbnail);
	self.add(Ti.UI.createLabel({
		text : _data.item.title,
		left : 100,
		right : 5,
		height : Ti.UI.SIZE,
		top : 5,
		bottom : 5,
		color : 'black',
		width : Ti.UI.FILL,
		font : {
			fontSize : 16,
			fontFamily : 'LucidaSans-Typewriter'
		}
	}));
	return self;
}
