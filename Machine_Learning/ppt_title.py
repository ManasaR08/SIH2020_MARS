from rake_nltk import Rake

r = Rake() 

r.extract_keywords_from_text("An apple a day keeps the doctor away")

print(r.get_ranked_phrases())
