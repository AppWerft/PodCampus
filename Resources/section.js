var getMovies = function(id, _callback) {
	var url = 'http://www.podcampus.de/channels/'+id+ '.rss';
	Titanium.Yahoo.yql('SELECT * FROM xml WHERE url = "' + url + '"', function(e) {
	//	Ti.API.log(e.data);
		var channel = e.data.rss.channel;
		var image = channel.image[0].href;
		Ti.API.log(image);
		var items = channel.item;
		var rows = [];
		for (var i = 0; i < items.length; i++) {
			try {
				var item = items[i];
				var url = item.enclosure.url;
				var type = item.enclosure.type.split('/')[0];
				Ti.API.log(type);
				var filter = item.author + ' ' + item.title;
				var row = Ti.UI.createTableViewRow({
					hasChild : (type=='video') ? true: false,
					selectedBackgroundColor:'orange',
					my_filter: filter,
					backgroundColor : 'white',
					url : item.enclosure.url
				});
				var thumbnail = Ti.UI.createImageView({
					width : 90,
					left : 0,
					top:0,
					defaultImage : '',
					image : image,
					height : 50
				});
				row.add(thumbnail);
				/*require('thumbnail').get(item.enclosure.url, function(image) {
					thumbnail.image=image
				});*/
				var container = Ti.UI.createView({
					top : 0,
					left : 100,
					layout : 'vertical',
					height : Ti.UI.SIZE
				});
				row.add(container);
				container.add(Ti.UI.createLabel({
					text : item.title,
					left : 0,
					right : 5,
					height : 40,
					top : 5,
					bottom : 5,
					color : 'red',
					width : Ti.UI.FILL,
					font : {
						fontSize : 16
					}
				}));
				row.add(Ti.UI.createLabel({
					text : item.summary,
					left : 5,
					right : 5,
					bottom:5,
					height : Ti.UI.SIZE,
					top : 60,
					color : 'black',
					width : Ti.UI.FILL,
					font : {
						fontSize : 13
					}
				}));
				rows.push(row);
			} catch(E) {
			}
		}
		_callback(rows);
	});
}

exports.create = function(title, id) {
	var sectiontitleview = Ti.UI.createView({
		height : 25,
		width : Ti.UI.FILL,
		backgroundColor : '#555',
		backgroundImage : '/assets/shadow.png'
	});
	sectiontitleview.add(Ti.UI.createLabel({
		text : title,
		left : 5,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		textAlign : 'left',
		width : Ti.UI.FILL,
		color : 'white',
		font : {
			fontSize : 13
		}
	}));
	var section = Ti.UI.createTableViewSection({
		headerView : sectiontitleview
	});
	getMovies(id, function(rows, _callback) {
		for (var i = 0; i < rows.length; i++) {
			section.add(rows[i]);
		}
		Ti.App.fireEvent('sectionready');
	});
	return section;

}

