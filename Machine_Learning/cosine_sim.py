import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 

import gensim

import json



def cosine_similarity(text1,text2):
    X_list = word_tokenize(text1)  
    Y_list = word_tokenize(text2) 
    
    # sw contains the list of stopwords 
    sw = stopwords.words('english')  
    l1 =[];l2 =[] 
    
    # remove stop words from the string 
    X_set = {w for w in X_list if not w in sw}  
    Y_set = {w for w in Y_list if not w in sw} 
    
    # form a set containing keywords of both strings  
    rvector = X_set.union(Y_set)  
    for w in rvector: 
        if w in X_set: l1.append(1) # create a vector 
        else: l1.append(0) 
        if w in Y_set: l2.append(1) 
        else: l2.append(0) 
    c = 0
    
    # cosine formula  
    for i in range(len(rvector)): 
            c+= l1[i]*l2[i] 
    cosine = c / float((sum(l1)*sum(l2))**0.5) 
    #print("similarity: ", cosine)
    return cosine


student_question = "This phenomenon, is probably best 59. Since then the _______, causes, and nature of the disability have been discussed by scores of investigators."

def find_answer(student_question):
    with open('response.json') as f:
        data = json.load(f)

    questions = []
    answers = []

    print(data.keys())

    for value in data.values():
        for qa in value:

            if "Question" in qa.keys():
                questions.append(qa["Question"])
                answers.append(qa["Answer"])
            elif "question" in qa.keys():
                questions.append(qa["question"])
                answers.append(qa["answer"])


    similarity_values = []
    for question in questions:
        value = cosine_similarity(student_question, question)
        similarity_values.append(value)

    return answers[similarity_values.index(max(similarity_values))]

answer = find_answer(student_question)
