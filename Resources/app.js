Ti.UI.iPhone.statusBarStyle = Ti.UI.iPhone.StatusBar.OPAQUE_BLACK;
Titanium.UI.iPhone.hideStatusBar();

var tabGroup = Ti.UI.createTabGroup({});

var tab0 = Ti.UI.createTab({
	window : require('modules/latest_window').create(),
	icon : '/assets/239-screen.png',
	title : 'Neueste',
});
var tab1 = Ti.UI.createTab({
	window : require('modules/channellist_window').create(),
	icon : '/assets/45-movie-1.png',
	title : 'Alle Kanäle',
});
var tab2 = Ti.UI.createTab({
	window : require('modules/search_window').create(),
	icon : '/assets/06-magnify.png',
	title : 'Suche',
});

var tab3 = Ti.UI.createTab({
	window : require('/modules/favslist_window').create(),
	icon : '/assets/108-badge.png',
	title : 'Meine Podcasts',
	badge : require('/modules/favslist_window').get().length || null
});

Ti.App.addEventListener('setfav', function() {
	tab3.badge = require('modules/favslist_window').get().length;
})
tabGroup.addTab(tab0);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);

tabGroup.open();

