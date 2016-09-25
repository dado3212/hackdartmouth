chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
   	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	console.log('Working on url: ' + url);
    	chrome.tabs.sendMessage(tabs[0].id, {action: "newWindow", url: url}, function(response) {
    	});
    });
  }
});