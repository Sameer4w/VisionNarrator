from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.ai.caption_service import generate_caption

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/caption")
async def caption_image(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    caption = generate_caption(file_path)

    return {
        "filename": file.filename,
        "caption": caption
    }