
import json
from watson_developer_cloud import ToneAnalyzerV3
import requests
requests.packages.urllib3.disable_warnings()


tone_analyzer = ToneAnalyzerV3(
   username="a0d6b309-06ae-4b3c-bb2e-2f32888b5365",
   password="yhlmAAsWiUKU",
   version='2016-05-19')


def makeWatsonCall( str ):
	
	return(json.dumps(tone_analyzer.tone(text=str), indent=2))


def processJSON( str ):
	parsed_json = json.loads(makeWatsonCall(str))
	anger = (parsed_json['document_tone']['tone_categories'][0]['tones'][0]['score'])
	disgust = (parsed_json['document_tone']['tone_categories'][0]['tones'][1]['score'])
	fear = (parsed_json['document_tone']['tone_categories'][0]['tones'][2]['score'])
	joy = (parsed_json['document_tone']['tone_categories'][0]['tones'][3]['score'])
	sadness = (parsed_json['document_tone']['tone_categories'][0]['tones'][4]['score'])

	emotionLevels = [anger,disgust,fear,joy,sadness]

	return emotionLevels

#test
#String = "A word is dead when it is said, some say. Emily Dickinson"
#strang = makeWatsonCall(String)
#processJSON(strang)