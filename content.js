// takes in the full DOM and removes a bunch of garbage to try and extract just the text
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

// Embedded into every page, listens for 'newWindow' from background.js new tab navigation
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == "newWindow") {
    // Get the string of the page
    var str = DOMtoString(document);

    // Remove garbage
    str = str.replace(/<style.*?>[\s\S]*?<\/style>/gm, ' ');
    str = str.replace(/<script.*?>[\s\S]*?<\/script>/gm, ' ');
    str = str.replace(/<(?:.|\n)*?>/gm, ' ');
    str = str.replace(/\n/gm, ' ');
    
    // Post it to backend, and wait for response
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://surfshield-env.us-east-1.elasticbeanstalk.com/api/v0.1/rating", true);
    // xhr.open("POST", "https://alexbeals.com/test.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
      // When it finishes loading
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Saves the current score data for if you click on the extension button in the toolbar
        currentData = JSON.parse(xhr.responseText);

        // Update the icon and trigger the notification in background.js
        chrome.runtime.sendMessage({action: "updateIcon", data: currentData});
      }
    }
    var d = JSON.stringify({ url: msg.url, text: str });
    xhr.send(d);
  // Returns the current score data if you click on the extension button in the toolbar
  } else if (msg.action == "getData") {
    sendResponse(currentData);
  }
});