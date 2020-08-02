import PyPDF2
import requests
from pptx import Presentation
from pptx.util import Inches, Pt


def summerizer(title, content):

    url = "https://aylien-text.p.rapidapi.com/summarize"

    querystring = {"title":title,"text": content}

    headers = {
        'x-rapidapi-host': "aylien-text.p.rapidapi.com",
        'x-rapidapi-key': "e4573ac34fmshc71719554be1369p1d0fcajsnc45c98c12e74"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    response = response.json()

    return response['sentences']



def extract_text_from_pdf(filename):

    prs = Presentation()
    bullet_slide_layout = prs.slide_layouts[1]


    pdfFileObj = open(filename, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    print("There are {} pages in the document".format(pdfReader.numPages))

    for page in range(pdfReader.numPages):
        pageObj = pdfReader.getPage(page)
        content = pageObj.extractText()

        page_summary = summerizer(filename[:-4], content)

        bullet_slide_layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(bullet_slide_layout)
        shapes = slide.shapes

        title_shape = shapes.title
        body_shape = shapes.placeholders[1]

        title_shape.text = filename[:-4]

        tf = body_shape.text_frame
        tf.text = 'Summery'

        for line in page_summary:
            p = tf.add_paragraph()
            #p.text = line
            run = p.add_run()
            run.text = line
            font = run.font
            font.name = 'Calibri'
            font.size = Pt(16)
            #p.level = 1
    
    prs.save('summary.pptx')


extract_text_from_pdf('dyslexia.pdf')
