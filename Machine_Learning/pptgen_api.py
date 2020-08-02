from fastapi import FastAPI
from ppt_gen import pdf_to_ppt, text_to_ppt

app = FastAPI()

@app.get('/')
def index():
    return "Welcome to SIH"

@app.get('/pdfpptgen/{filepath}')
def pdfpptgen(filepath):
    return pdf_to_ppt(filepath)

@app.get('textpptgen/{title}/{text}')
def textpptgen(title, text):
    return text_to_ppt(title, text)

@app.get('')
