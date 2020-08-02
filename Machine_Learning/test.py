import json

with open('response.json') as f:
    data = json.load(f)

questions = []
answers = []

for value in data.values():
    for qa in value:
        if "Question" in qa.keys():
            questions.append(qa["Question"])
            answers.append(qa["Answer"])
        elif "question" in qa.keys():
            questions.append(qa["question"])
            answers.append(qa["answer"])

print(questions)
print(answers)