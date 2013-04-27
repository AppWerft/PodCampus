exports.create = function() {
	return Ti.UI.createActivityIndicator({
		color : 'white',
		backgroundColor : 'black',
		borderRadius : 8,
		message : 'Bitte etwas Geduld …',
		width : 200,
		height : 60,
		font : {
			fontSize :12
		},
		opacity : 0.8,
		zIndex : 999,
		borderColor : 'black',
		borderWidth : 1,
	});
}
