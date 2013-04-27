exports.create = function(node) {
	var row = Ti.UI.createTableViewRow({
		id : node.id,
		hasChild : true,
	});
	row.add(Ti.UI.createLabel({
		left : 80,
		text : node.title,
		font : {
			fontFamily : 'LucidaSans-Typewriter',
			fontSize : 18
		}
	}));
	row.icon = Ti.UI.createImageView({
		left : 0,
		top : 0,
		defaultImage : '/assets/appicon.png',
		width : 70,
		height : 70
	});
	row.add(row.icon);
	require('modules/model').getIconByURL(node.id, function(url) {
		row.icon.setImage(url);
	});
	return row;
}