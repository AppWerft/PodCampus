exports.create = function() {
	function notConnectedAlert() {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Keine Verbindung zum Internet',
			message : 'Leider benötigt podcampus eine Verbindung zu diesem Internet',
			buttonNames : ['Weiter']
		});
		alertDialog.show();
	}

	if (!Ti.Network.online) {
		notConnectedAlert();
	}
}
