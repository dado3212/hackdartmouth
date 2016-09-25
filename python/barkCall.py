import json
import requests
requests.packages.urllib3.disable_warnings()


cyberScore = 0
profaneSeverity = 0

def makeBarkCall ( text ):
	url = 'https://partner.bark.us/api/v1/messages?token=kUSvsx47Lg56kUfCfZDvQNKa'
	data = {'message': text}
	headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
	r = requests.post(url, data=json.dumps(data), headers=headers)

	return (r.text)


def process( text ):
	parsed_json = json.loads(makeBarkCall(text))
	
	# cyberbullying score (1-5)
	cyberLikely = parsed_json['results']['cyberbullying']['likelihood']
	print(cyberLikely)
	
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


#Test
#Strang = "I love you"
#process(Strang)