from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from ppt_gen import pdf_to_ppt
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Upload(BaseModel):
    filepath: str

app = FastAPI()
app.mount("/static", StaticFiles(directory=directory), name=name)
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
    



@app.post('/pdfpptgen')
async def pdfpptgen(upload: Upload):
    directory, name = pdf_to_ppt(upload["filepath"])
    response = RedirectResponse(url='/static/'+ name)
    return {"filepath": response}
