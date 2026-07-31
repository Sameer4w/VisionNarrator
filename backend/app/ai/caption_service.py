import os
import google.generativeai as genai
from PIL import Image

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def generate_caption(image_path: str):
    image = Image.open(image_path)

    response = model.generate_content([
        "Generate a short descriptive caption for this image.",
        image
    ])

    return response.text.strip()