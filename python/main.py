from bs4 import BeautifulSoup
import urllib2, re

def textFromUrl(url):
	# soup = BeautifulSoup(html_doc, 'html.parser')
	html = urllib2.urlopen(urllib2.Request(url)).read()
	html = re.sub(r'<script type="text/javascript">[\s\S]*?</script>', '', html)
	html = re.sub(r'<a.*?>(.*?)</a>', r'\1 ', html)

	soup = BeautifulSoup(html, 'html.parser')
	pretty = soup.get_text()
	pretty = re.sub(r'\n', ' ', pretty)
	pretty = re.sub(r'\t', ' ', pretty)
	pretty = re.sub(r' +', ' ', pretty)
	print pretty

textFromUrl('http://web.cs.dartmouth.edu/undergraduate/modified-majors')