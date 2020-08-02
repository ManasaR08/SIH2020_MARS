
#token = '39505901-fbac-3dfc-9c5c-5bc25b5b60ca'

import requests
import PyPDF2

headers = {
    'accept': '*/*',
    'Content-Type': 'text/plain',
    'Authorization': 'Bearer 39505901-fbac-3dfc-9c5c-5bc25b5b60ca',
}

params = (
    ('shortAnswer', 'true'),
    ('recall', 'true'),
    ('mcq', 'true'),
    ('whQuestions', 'true'),
    ('title', 'World War 2'),
)

def qa_gen(filename):
    #r = requests.get(filename, allow_redirects=True)
    #open('temp.pdf', 'wb').write(r.content)
    pdfFileObj = open(filename, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    
    net_text = ''
    for page in range(pdfReader.numPages):
        pageObj = pdfReader.getPage(page)
        content = pageObj.extractText()
        #print(content)
        net_text = net_text + content

        if len(net_text) > 2500:
            break

    return net_text

data = qa_gen('temp.pdf')
print(data)
print("[INFO] Loading Model")

response = requests.post('https://app.quillionz.com:8243/quillionzapifree/1.0.0/API/SubmitContent_GetQuestions', headers=headers, params=params, data=data.encode('utf-8'))
response = response.json()
print(response)

#for qa_pair in response['Data']['shortAnswer']:
#    print(qa_pair['Question'])
#    print()
#    print(qa_pair['Answer'])
#    print()
#    print()