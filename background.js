chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
   	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	chrome.tabs.sendMessage(tabs[0].id, {action: "newWindow", url: url}, function(response) {
    	});
    });
  }
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == "updateIcon") {
  	var icons = ['green', 'yellowgreen', 'yellow', 'orange', 'red'];
  	var notifications = ['icons/Green.png', 'icons/YellowGreen.png', 'icons/Yellow.png', 'icons/orange.png', 'icons/Red.png'];
    var iconColor = icons[Math.round(msg.data.overall) - 1];
    var notificationImage = notifications[Math.round(msg.data.overall) - 1];

	chrome.browserAction.setIcon({
		path: {
		  '19': 'icons/' + iconColor + '_19.png',
		  '38': 'icons/' + iconColor + '_38.png'
		},
	});

	chrome.notifications.create('reminder', {
		type: 'basic',
		iconUrl: notificationImage,
		title: 'SurfShield Score: ' + msg.data.overall,
		message: 'Click the extension for more details.'
	}, function(notificationId) {
		timer = setTimeout(function(){chrome.notifications.clear(notificationId);}, 3000);
	});
  }
});