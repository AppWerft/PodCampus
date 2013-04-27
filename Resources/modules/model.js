exports.getChannels = function(_callback) {
	var channels = require('channels');
	channels.sort(function(a, b) {
		if (a.id < b.id) {
			return 1;
		}
		if (a.id > b.id) {
			return -1;
		}
		return 0;
	});
	_callback(channels);
}

exports.getChannel = function(_id, _callback) {
	var url = 'http://www.podcampus.de/channels/' + _id + '.rss';
	require('offlinealert').create();
	var xhr = Ti.Network.createHTTPClient({
		timeout : 16000,
		onload : function() {
			var XMLTools = require('modules/xml2json');
			var parser = new XMLTools(this.responseXML);
			var rss = parser.toObject();
			_callback({
				items : (Object.prototype.toString.call(rss.channel.item) === '[object Array]' ) ? rss.channel.item : [rss.channel.item],
				description : rss.channel.description || '',
				image : rss.channel.image.url
			});
		},
		onerror : function(e) {
			console.log(e.error);
		}
	});
	xhr.open('GET', url);
	xhr.send();
}

exports.getMediaByURL = function(_id, _callback) {
	var url = 'http://www.podcampus.de/nodes/' + _id;
	console.log(url);
	var xpath = '//*[@id=\'tabs-1\']';
	var yql = 'SELECT src,content FROM html WHERE url="http://podcampus.de/nodes/' + _id + '" AND (xpath="//*[@name=\'description\']" OR xpath="/html/head/title" OR xpath="/html/body/div/div[4]/div/div/h3/img") ';
	Ti.Yahoo.yql(yql, function(_y) {
		var item = {
			description : _y.data.meta.content,
			title : _y.data.title.replace(/Podcampus \| /, ''),
			url : 'http://www.podcampus.de/nodes/' + _id + '.mov',
			image : _y.data.img.src
		};
		_callback(item);
	});
}

exports.getIconByURL = function(_id, _callback) {
	var xpath = '/html/body/div/div[4]/div/div/h3/img';
	var yql = 'SELECT src FROM html WHERE url="http://podcampus.de/nodes/' + _id + '" AND  xpath="/html/body/div/div[4]/div/div/h3/img" ';
	Ti.Yahoo.yql(yql, function(_y) {
		console.log(_y);
		if (_y.success)
			_callback('http://podcampus.de/'+_y.data.img.src);
	});
}

exports.getLatest = function(_callback) {
	require('offlinealert').create();
	var xhr = Ti.Network.createHTTPClient({
		timeout : 16000,
		onload : function() {
			var XMLTools = require('modules/xml2json');
			var parser = new XMLTools(this.responseXML);
			var rss = parser.toObject();
			_callback((Object.prototype.toString.call(rss.channel.item) === '[object Array]' ) ? rss.channel.item : [rss.channel.item]);
		},
		onerror : function(e) {
			console.log(e.error);
		}
	});
	xhr.open('GET', 'http://www.podcampus.de/nodes.rss');
	xhr.send();
}

exports.search = function(_term, _callback) {
	var url = 'http://www.podcampus.de/searches/search';
	require('offlinealert').create();
	var xhr = Ti.Network.createHTTPClient({
		timeout : 16000,
		onload : function() {
			_callback(JSON.parse(this.responseText));
		},
		onerror : function(e) {
			console.log(e.error);
		}
	});
	xhr.open('POST', url);
	xhr.send({
		term : _term
	});
}
