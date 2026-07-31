import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key=os.getenv("HF_TOKEN"),
)

def generate_embedding(text):
    result = client.feature_extraction(
        text,
        model="sentence-transformers/all-MiniLM-L6-v2"
    )

    return result