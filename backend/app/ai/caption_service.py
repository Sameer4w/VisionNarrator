import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key=os.getenv("HF_TOKEN"),
)


def generate_caption(image_path: str):
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    result = client.image_to_text(
        image_bytes,
        model="Salesforce/blip-image-captioning-base",
    )

    return result.generated_text