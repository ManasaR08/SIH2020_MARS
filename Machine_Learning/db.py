from pymongo import MongoClient;
import pprint
client = MongoClient('mongodb://localhost:27018/')
db = client['ParaDemic']
questions = db.questions;

def findAll():
    listt = [];
    for question in questions.find({}):
        listt.append(question);
    return listt;

# print(findAll());