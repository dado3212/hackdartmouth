function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

var currentData;

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == "newWindow") {
    var str = DOMtoString(document);

    str = str.replace(/<style.*?>[\s\S]*?<\/style>/gm, ' ');
    str = str.replace(/<script.*?>[\s\S]*?<\/script>/gm, ' ');
    str = str.replace(/<(?:.|\n)*?>/gm, ' ');
    str = str.replace(/\n/gm, ' ');
    
    // message.innerText = str;

    xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://surfshield-env.us-east-1.elasticbeanstalk.com/api/v0.1/rating", true);
    xhr.open("POST", "http://alexbeals.com/test.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
      if (xhr.readyState == 4 && xhr.status == 200) {
          currentData = JSON.parse(xhr.responseText);

          // chrome.notifications.create('reminder', {
          //   type: 'basic',
          //   iconUrl: 'icons/Main.png',
          //   title: 'Here is the score',
          //   message: 'Site is Safe'
          // }, function(notificationId) {
          //   timer = setTimeout(function(){chrome.notifications.clear(notificationId);}, 1000);
          // });
      }
    }
    var d = JSON.stringify({ url: msg.url, text: str });
    xhr.send(d);
  } else if (msg.action == "getData") {
    sendResponse(currentData);
  }
});

// function onWindowLoad() {
//   var message = document.querySelector('#message');
//   // chrome.tabs.executeScript(null, {
//   //   file: "getPagesSource.js"
//   // }, function() {
//   //   // If you try and inject into an extensions page or the webstore/NTP you'll get an error
//   //   if (chrome.runtime.lastError) {
//   //     message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
//   //   }
//   // });
// }

// window.onload = onWindowLoad;