# <img src="/icons/Main.png?raw=true" height="50" alt="Icon"/> SurfShield
Created by Alex Beals, Andrew Ogren, Matt Girouard, Jon Kramer for HackDartmouth III

### Inspiration
Our inspiration for SurfShield was the Hack Harassment initiative. The internet can be very useful, but due to its anonymity, it can also be used for cyberbullying and for posting vulgar and offensive content. We wanted to develop a way to let online users know whether the content of the page they are visiting is considered offensive. To do this effectively, we incorporated various apis and aggregated metrics that help to better inform the user.

### What it does
SurfShield is a chrome extension. When a user visits a site, the SurfShield icon will change colors to display the level of offensive content on the page with green representing little to no offensive content and red representing a high level of offensive content. When the user clicks on the SurfShield icon, the extension will display an overall score, which is between 1 and 5. This score is averaged from from our four main metrics, which are anger, cyberbullying, profanity, and if users have voted on that particular site, an audience score.

### How we built it
We built SurfShield by creating a Chrome Extension using javascript, html5, and css3. The API calls are made in Python. Using Amazon Web Services, we process the results and then update the UI of the chrome extension with the anger, cyberbullying, profanity, audience score, and overall score. The SurfShield icon also changes colors based on the overall score.

### What's next for SurfShield
SurfShield has great potential. We believe that in the future, it could allow parents to set it up so that if a site has a score above a threshold, it will block that site from use, so that children can surf the web without their parents having to look over their shoulder. In this case, the service could be monetized and sold on a monthly subscription basis.

