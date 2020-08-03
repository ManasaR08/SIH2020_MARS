from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from ppt_gen import pdf_to_ppt
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cosine_sim;

class Upload(BaseModel):
    filepath: str
    name: str
class Search(BaseModel):
    text: str
    types: str

app = FastAPI()
app.mount("/static", StaticFiles(directory='static'), name='static')
origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/')
async def index():
    return "Welcome to SIH"


@app.post('/search')
async def search(search: Search):
    # search.types => answer or visualise
    # text => TExt to get answer to or visualise
    if (search.types == 'answer'):
        text = cosine_sim.find_answer(search.text);
        return {'result':[{'text': text, 'voice': '', 'image':''}]}
    else:
        return {'result':[{'text': 'Lorem ipsum dolor sit, amet consectetu elit', 'image':'assets/images/image.png', 'voice': ''},{'text': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit', 'image':'assets/images/image.png', 'voice': ''}]}
@app.post('/pdfpptgen')
async def pdfpptgen(upload: Upload):
    directory, name, qa_pair = pdf_to_ppt(upload.filepath)
    # response = RedirectResponse(url='/static/'+ name)
    return {"filepath": 'http://localhost:8000/'+name,
            "questions": qa_pair}

