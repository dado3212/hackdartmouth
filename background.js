// When a tab update happens
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  // If it's an update for your current tab finishing loading
  if (changeInfo.status == 'complete' && tab.active) {
    // Get the current active tab
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      // Tell it it's a newWindow, and to begin processing (handled in content.js)
      chrome.tabs.sendMessage(tabs[0].id, {action: "newWindow", url: url}, function(response) {
        // Don't actually care about the response
      });
    });
  }
});

// When it receives a message to update the icon (basically, when it's finished, called from content.js)
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == "updateIcon") {
    // List of types/files, which it indexes into from the score sent in msg
    var icons = ['green', 'yellowgreen', 'yellow', 'orange', 'red'];
    var notifications = ['icons/Green.png', 'icons/YellowGreen.png', 'icons/Yellow.png', 'icons/orange.png', 'icons/Red.png'];
    var iconColor = icons[Math.round(msg.data.overall) - 1];
    var notificationImage = notifications[Math.round(msg.data.overall) - 1];

    // Sets the icon for the extension in the toolbar
    chrome.browserAction.setIcon({
      path: {
        '19': 'icons/' + iconColor + '_19.png',
        '38': 'icons/' + iconColor + '_38.png'
      },
    });

    // Creates a notification that holds for 3 seconds
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