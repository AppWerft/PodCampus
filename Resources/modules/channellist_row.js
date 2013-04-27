exports.create = function(channel) {
	var row = Ti.UI.createTableViewRow({
		channel : channel,
		hasChild : true,
	});
	row.add(Ti.UI.createLabel({
		left : 90,
		text : channel.title,
		font : {
			fontFamily : 'LucidaSans-Typewriter',
			fontSize : 18
		}
	}));
	row.add(Ti.UI.createImageView({
		left : 0,
		image : channel.image,
		width : 80,
		height : 80
	}));
	return row;
}