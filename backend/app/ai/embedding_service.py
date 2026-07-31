import os
import requests

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}


def generate_embedding(text: str) -> list:
    response = requests.post(
        API_URL,
        headers=headers,
        json={
            "inputs": text
        },
        timeout=60
    )

    if response.status_code != 200:
        raise Exception(response.text)

    embedding = response.json()

    return embedding