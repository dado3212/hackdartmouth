import json
from watson_developer_cloud import ToneAnalyzerV3
import requests
from secret import tone_analyzer_username, tone_analyzer_password, bark_token
requests.packages.urllib3.disable_warnings()

tone_analyzer = ToneAnalyzerV3(
   username=tone_analyzer_username,
   password=tone_analyzer_password,
   version='2016-05-19')

def makeWatsonCall( str ):
	return(json.dumps(tone_analyzer.tone(text=str), indent=2))

def processJSON( str ):
	parsed_json = json.loads(makeWatsonCall(str))
	anger = (parsed_json['document_tone']['tone_categories'][0]['tones'][0]['score'])
	return anger

def makeBarkCall ( text ):
	url = 'https://partner.bark.us/api/v1/messages?token=' + bark_token
	data = {'message': text}
	headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
	r = requests.post(url, data=json.dumps(data), headers=headers)

	return (r.text)

def process( text ):
	parsed_json = json.loads(makeBarkCall(text))
	
	# cyberbullying score (1-5)
	cyberLikely = parsed_json['results']['cyberbullying']['likelihood']
	cyberScore = 0
	
	if cyberLikely == "VERY_UNLIKELY":
		cyberScore = 1
	elif cyberLikely == "UNLIKELY":
		cyberScore = 2
	elif cyberLikely == "NEUTRAL":
		cyberScore = 3
	elif cyberLikely == "LIKELY":
		cyberScore = 4
	else:
		cyberScore = 5

	# profanity score (1 to 5)
	profaneSeverity = parsed_json['results']['profanity']['severity'] + 1
	bullyingArr = [cyberScore,profaneSeverity]
	return bullyingArr

#cyberScore input is an array with two elements
#the first element is the cyberbullying score and the second is the profanity severity
def calculateScore(audienceScore, angerScore, cyberScore):
	cyberBullying = cyberScore[0]
	profanity = cyberScore[1]
	angerScore = round(angerScore*5,1)
	averageScore = 0

	if (audienceScore is None):
		averageScore = round((cyberBullying+profanity+angerScore)/3,1)
	else:
		averageScore = round((cyberBullying+profanity+angerScore+audienceScore)/4,1)
	return averageScore
	
#Testing 
#Strang = "What a lovely day. I love you"
#angerScore = processJSON(Strang)
#cyberScore = process(Strang)
#audienceScore = 3
#overall = calculateScore(audienceScore,angerScore,cyberScore)
#print(overall)
