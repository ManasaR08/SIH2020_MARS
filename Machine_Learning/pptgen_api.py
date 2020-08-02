from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from ppt_gen import pdf_to_ppt

app = FastAPI()

@app.get('/')
async def index():
    return "Welcome to SIH"
    



@app.get('/pdfpptgen/{filepath}')
async def pdfpptgen(filepath):
    directory, name = pdf_to_ppt(filepath)
    app.mount("/static", StaticFiles(directory=directory), name=name)
    response = RedirectResponse(url='/static/'+ name)
    return response
