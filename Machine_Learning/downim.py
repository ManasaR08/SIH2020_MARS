from serpapi.google_search_results import GoogleSearchResults
import os
import nltk
from textblob import TextBlob
from gtts import gTTS 
from datetime import datetime

def texttospeech(mytext,filename):
    language = 'en'
    myobj = gTTS(text=mytext, lang=language, slow=False)
    A=os.path.join('/home/vatsalk/Documents/SIH2020_MARS/Machine_Learning','static')
    print(A);
    strr = "".join(str(datetime.utcnow()).split(" "))
    strr = strr.replace(":","")
    strr = strr.replace(".","")
    B=os.path.join(A,filename+strr+".mp3")
    myobj.save(B);
    #B=os.path.join(A,filename+".mp3")
    return filename+strr+".mp3";
    #print('__file__:    ', __file__)
    #print('relative path',B)

def visual(q):
    params = {"q": q,"tbm": "isch","ijn": "0","api_key": "872d5dde1c1b4ad04b1b288b3cc26683597993dd25a9eff1777c5c20a52b7d50"}
    client = GoogleSearchResults(params)
    results = client.get_dict();
    images_results = results['images_results']
    link=images_results[5]["original"]
    return link;

def noundetect(mytext):
    blob = TextBlob(mytext)
    l=[]
    
    for nouns in blob.noun_phrases:
        l.append(visual(nouns,))
    return l

def main(para):
    text=nltk.tokenize.sent_tokenize(para)
    result = [];
    for index,t in enumerate(text):

        pics_path=noundetect(t)
        st=texttospeech(t,str(index+1))  
        #mydict[st]=pics_path
        for i in pics_path:
            mydict={}
            base = 'http://localhost:8000/static/'
            mydict["voice"]=base + st;
            mydict["image"]=i;
            mydict["text"]="".join(text);
            result.append(mydict);
    return result;


#print(main("this is a red apple. this is a yellow shirt. this is Taj Mahal"))
    #print(imagepath)

