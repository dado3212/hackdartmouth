// The script in main.html that loads in the data

// Sets all the text in the HTML file based on the data object passed to the window
function update(data) {
  // var colors = ['#AC1212', '#F37310', '#EBC621', '#9EC430', '#4E9A26'];
  var colors = ['#4E9A26', '#9EC430', '#EBC621', '#F37310', '#AC1212'];
  // var icons = ['red', 'orange', 'yellow', 'yellowgreen', 'green'];
  var icons = ['green', 'yellowgreen', 'yellow', 'orange', 'red'];


  var body = document.querySelector('body');
  var mainScore = document.querySelector('#mainScore');

  var anger = document.querySelector('#anger');
  var audience = document.querySelector('#audience');
  var cyberbullying = document.querySelector('#cyberbullying');
  var profanity = document.querySelector('#profanity');

  var color = colors[Math.round(data.overall) - 1];
  var iconColor = icons[Math.round(data.overall) - 1];

  body.style.backgroundColor = color;
  mainScore.innerText = data.overall;
  mainScore.style.color = color;

  anger.querySelector('.score').innerText = data.anger;
  anger.querySelector('.bar span').style.minWidth = (data.anger/5) * 3 + 'em';
  audience.querySelector('.score').innerText = data.audience;
  audience.querySelector('.bar span').style.minWidth = (data.audience/5) * 3 + 'em';
  cyberbullying.querySelector('.score').innerText = data.cyberbullying;
  cyberbullying.querySelector('.bar span').style.minWidth = (data.cyberbullying/5) * 3 + 'em';
  profanity.querySelector('.score').innerText = data.profanity;
  profanity.querySelector('.bar span').style.minWidth = (data.profanity/5) * 3 + 'em';

  chrome.browserAction.setIcon({
    path: {
      '19': 'icons/' + iconColor + '_19.png',
      '38': 'icons/' + iconColor + '_38.png'
    },
  });
}

// Run when the window is opened after clicking on the extension in the toolbar
function onWindowLoad() {
  // Figure out which is the current tab
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    document.querySelector('form #url').value = tabs[0].url;
    // Ask that tab for the current information for that tab
    chrome.tabs.sendMessage(tabs[0].id, {action: "getData"}, function(response) {
      update(response);
    });
  });

  // Handle voting
  document.querySelector('form button[type="submit"]').addEventListener("click", function() {
    document.querySelector('span.alert').innerText = 'Successfully voted!';
    document.querySelector('form').style.display = 'none';
    // document.querySelector('input[type="range"]').outerHTML = '<input name="vote" type="range" min="1" max="5" step="1" list="steplist" />';
  });
}

window.onload = onWindowLoad;