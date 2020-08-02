import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 



import json

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

def cosine_similarity(text1,text2):
    text1_list = word_tokenize(text1)
    text2_list = word_tokenize(text2)
    sw = stopwords.words('english')
    l1=[]
    l2=[]
    text1_set = {w for w in text1_list if not w in sw}
    text2_set = {w for w in text2_list if not w in sw}
    rvector = text1_set.union(text2_set)
    for w in rvector:
        if w in text1_set:
            l1.append(1)
        else:
            l1.append(0)
        if w in text2_set:
            l2.append(1)
        else:
            l2.append(0)
    c=0
    for i in range(len(rvector)):
        c+=l1[i]+l2[i]
    cos_sim = c/float((sum(l1)*sum(l2))**0.5)
    return cos_sim

student_question = "This phenomenon, is probably best 59. Since then the _______, causes, and nature of the disability have been discussed by scores of investigators."

for question in questions:
    similarity = cosine_similarity(student_question, question)
    print(similarity)


