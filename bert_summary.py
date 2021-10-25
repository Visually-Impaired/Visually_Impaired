  
from summarizer import Summarizer, TransformerSummarizer
from newspaper import fulltext
import requests
import sys
import re
article_url=str(sys.argv[1])
article = fulltext(requests.get(article_url).text)
 
bert_model = Summarizer()
bert_summary = ''.join(bert_model(article, ratio=0.1))  #summary length is 10% of article length
final_bert_summary = re.sub("[[@*&?].*[]@*&?]", "", bert_summary)
print(bert_summary)
sys.stdout.flush()
