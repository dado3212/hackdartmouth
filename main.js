chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var str = request.source;
    str = str.replace(/<style.*?>[\s\S]*?<\/style>/gm, ' ');
    str = str.replace(/<script.*?>[\s\S]*?<\/script>/gm, ' ');
    str = str.replace(/<(?:.|\n)*?>/gm, ' ');
    str = str.replace(/\n/gm, ' ')
    
    message.innerText = str;

    chrome.browserAction.setIcon({
      path: {
        '19': 'icons/green_19.png',
        '38': 'icons/green_38.png'
      },
    });

    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icons/Main.png',
        title: 'Here is the score',
        message: 'Site is Safe'
     }, function(notificationId) {});
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;