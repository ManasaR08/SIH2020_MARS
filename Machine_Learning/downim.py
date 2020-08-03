from serpapi.google_search_results import GoogleSearchResults
import os
import nltk
from textblob import TextBlob
from gtts import gTTS 
def texttospeech(mytext,filename):
    language = 'en'
    myobj = gTTS(text=mytext, lang=language, slow=False)
    myobj.save(filename+".mp3")
    A=os.path.join(os.path.dirname(__file__),'\\static')
    B=os.path.join(A,filename+".mp3")
    #B=os.path.join(A,filename+".mp3")
    return B
    #print('__file__:    ', __file__)
    #print('relative path',B)

def visual(q):
    params = {"q": q,"tbm": "isch","ijn": "0","api_key": "872d5dde1c1b4ad04b1b288b3cc26683597993dd25a9eff1777c5c20a52b7d50"}
    client = GoogleSearchResults(params)
    results = client.get_dict()
    images_results = results['images_results']
    link=images_results[5]["thumbnail"]
    return link

def noundetect(mytext):
    blob = TextBlob(mytext)
    l=[]
    
    for nouns in blob.noun_phrases:
        l.append(visual(nouns,))
    return l

def main(para):
    text=nltk.tokenize.sent_tokenize(para)
    mydict={}
    for index,t in enumerate(text):
        pics_path=noundetect(t)
        st=texttospeech(t,str(index+1))  
        #mydict[st]=pics_path
        mydict["voice"+str(index+1)]=st;
        mydict["image"+str(index+1)]=pics_path
    return mydict["image1"]


print(main("this is a red apple. this is a yellow shirt. this is Taj Mahal"))
    #print(imagepath)

