
#token = '39505901-fbac-3dfc-9c5c-5bc25b5b60ca'

import requests
import PyPDF2
import json

headers = {
    'accept': '*/*',
    'Content-Type': 'text/plain',
    'Authorization': 'Bearer 65feb00a-2a2c-3c57-a8b9-ef1b62d5f8ce',
}

params = (
    ('shortAnswer', 'true'),
    ('recall', 'true'),
    ('mcq', 'true'),
    ('whQuestions', 'true'),
    ('title', 'Dyslexia'),
)

def qa_gen(text):
    #r = requests.get(filename, allow_redirects=True)
    #open('temp.pdf', 'wb').write(r.content)

    print("Text Length: ", len(text.split()))
    
    if (len(text.split()) > 2900):
        data = ' '
        text_list = text.split()[:2900]
        data = data.join(text_list)
    else:
        data = text

    print("Data Length: ", len(data.split()))


    response = requests.post('https://app.quillionz.com:8243/quillionzapifree/1.0.0/API/SubmitContent_GetQuestions', headers=headers, params=params, data=data.encode('utf-8'))
    response = response.json()
    response = response['Data']

    print()
    print(response)

    output = {}
    output.update({"shortAnswer" : response["shortAnswer"]})
    output.update({"recall" : response["recall"]})
    output.update({"mcq" : response["multipleChoiceQuestions"]["mcq"]})
    trueFalse_dict = {}
    trueFalse_list = []
    for qs_list in response["multipleChoiceQuestions"]["trueFalse"]:
        qs_list = qs_list["questionList"]
        trueFalse_list = trueFalse_list + qs_list

    output.update({"trueFalse" : trueFalse_list})

    with open('response.json', 'w') as fp:
        json.dump(output, fp)

    return output

