# from rake_nltk import Rake

# r = Rake() 

# r.extract_keywords_from_text("An apple a day keeps the doctor away")

# print(r.get_ranked_phrases())
from datetime import datetime

strr = "".join(str(datetime.utcnow()).split(" "))
strr = strr.replace(":","")
strr = strr.replace(".","")
print(strr);