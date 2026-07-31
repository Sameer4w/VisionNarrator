import os
import requests

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}


def generate_caption(image_path: str) -> str:
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    response = requests.post(
        API_URL,
        headers=headers,
        data=image_bytes
    )

    if response.status_code != 200:
        raise Exception(response.text)

    result = response.json()

    return result[0]["generated_text"]