exports.create = function() {
	var self = Ti.UI.createWindow({
		barImage : '/assets/mobile-bar.png',
		backgroundImage : '/assets/grid-master.png'
	});
	var actInd = Ti.UI.createActivityIndicator({
		color : 'black',
		backgroundColor : 'orange',
		borderRadius : 8,
		message : 'Lade Film vom RRZ …',
		width : 200,
		height : 100,
		opacity : 0.7,
		zIndex : 999,
		font : {
			fontSize : 13
		},
		borderColor : 'black',
		borderWidth : 2,
		borderColor : 'white'
	});

	self.add(actInd);
	return self;
}

