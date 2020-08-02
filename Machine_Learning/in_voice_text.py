# Import the required module for text  
# to speech conversion 
from gtts import gTTS 
  
# This module is imported so that we can  
# play the converted audio 
import os
import nltk
from textblob import TextBlob

# The text that you want to convert to audio 
def texttospeech(mytext):
    language = 'en'
    myobj = gTTS(text=mytext, lang=language, slow=False)
    myobj.save("welcome.mp3")
    A=os.path.join(os.path.dirname(__file__), 'welcome.mp3')
    return A
    #print('__file__:    ', __file__)
    #print('relative path',B)
    


from google_images_download import google_images_download   #importing the library
def visual(l):
    response = google_images_download.googleimagesdownload()
    lis=[]

    for a in l:
        arguments = {"keywords":l,"limit":2,"print_urls":True}   #creating list of arguments
        paths = response.download(arguments)   #passing the arguments to the function
        for s in paths[0][a]:
            #print('str',s)
            lis.append(s)
        #print(paths[0][a])
    #print('final_list',lis)
    return lis
        
    
        

def noundetect(mytext):
    blob = TextBlob(mytext)
    l=[]
    
    for nouns in blob.noun_phrases:
        l.append(nouns)
    lis=visual(l)
    return lis 
    

def main(para):
    text=nltk.tokenize.sent_tokenize(para)
    mp3path=[]
    path_pics=[]
    mp3path=texttospeech(para)
    for t in text:
        pics_path=noundetect(t)
        #print(pics_path)
        path_pics.append(pics_path)
    print(path_pics)
    print(mp3path)
    #print(imagepath)

main('This is a white panda. It ia eating a red apple')
#print(a)
    
    




