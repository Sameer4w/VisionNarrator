from PIL import Image
from transformers import BlipForConditionalGeneration, BlipProcessor
import torch

# Load BLIP model and processor only once
processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

# Put the model in evaluation mode
model.eval()


def generate_caption(image_path: str) -> str:
    """
    Generate an AI caption for an image.
    """

    image = Image.open(image_path).convert("RGB")

    inputs = processor(
        image,
        return_tensors="pt"
    )

    # Disable gradient calculation during inference
    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=30
        )

    caption = processor.decode(
        output[0],
        skip_special_tokens=True
    )

    return caption