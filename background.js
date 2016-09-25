chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	console.log('Updated url.');
   	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	console.log(url);
    	chrome.tabs.sendMessage(tabs[0].id, {action: "google", url: url}, function(response) {
    	});
    });
  }
});