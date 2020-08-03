import requests


def divide_chunks(l, n): 
      
    for i in range(0, len(l), n):  
        yield l[i:i + n] 

params = (
    ('Secret', 'KvWKLwMcbQ8PahGb'),
)

files = {
    'File': ('sample.pdf', open('sample.pdf', 'rb')),
    'StoreFile': (None, 'true'),
    'OcrLanguage': (None, 'English'),
}

response = requests.post('https://v2.convertapi.com/convert/pdf/to/txt', params=params, files=files)

text_url = response.json()['Files'][0]['Url']

r = requests.get(text_url, allow_redirects=True)
text = r.content.decode('utf-8')
sentences = text.split('. ')
x = list(divide_chunks(sentences, 50))

for batch in x:
    content = ". ".join(line for line in batch)



#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.post('https://v2.convertapi.com/convert/pdf/to/txt?Secret=KvWKLwMcbQ8PahGb', files=files)