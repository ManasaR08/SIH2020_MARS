from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from ppt_gen import pdf_to_ppt

app = FastAPI()

@app.get('/')
def index():
    return "Welcome to SIH"
    

app.mount("/static", StaticFiles(directory="D:\SIH2020_MARS\Machine_Learning\ppt_gen"), name="ppt_gen")

@app.get('/pdfpptgen/{filepath}')
def pdfpptgen(filepath):
    return pdf_to_ppt(filepath)


@app.get('')
