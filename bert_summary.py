  
from summarizer import Summarizer, TransformerSummarizer
from newspaper import fulltext
import requests
import sys
import re
article_url=str(sys.argv[1])
article = fulltext(requests.get(article_url).text)

cleanArticle = ""
inBracket = False
roundBracket = 0
inPronounceBracket = False

#data cleaning
for ch in article:
  if roundBracket:
    if ch == '/':
      cleanArticle = cleanArticle[:-1]
      inPronounceBracket = True
  if ch == '[':
    inBracket = True
  if ch == '(':
    roundBracket += 1
  if not inBracket and not inPronounceBracket and ch != '\n':
    cleanArticle += ch
  if ch == ']':
    inBracket = False
  if ch == ')':
    roundBracket -= 1
  if not roundBracket and inPronounceBracket:
    inPronounceBracket = False

#generating summary
bert_model = Summarizer()
bert_summary = ''.join(bert_model(cleanArticle, ratio = 0.2))  #summary length is 20% of article length
final_bert_summary = re.sub("[[@*&?].*[]@*&?]", "", bert_summary)
print(bert_summary)
sys.stdout.flush()