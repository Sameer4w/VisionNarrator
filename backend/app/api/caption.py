from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

import shutil
import os

from app.ai.caption_service import generate_caption
from app.ai.embedding_service import generate_embedding
from app.database.dependencies import get_db
from app.crud.image_crud import create_image

from app.crud.image_crud import (
    create_image,
    get_image_by_filename
)
router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/caption")
async def caption_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )
    existing = get_image_by_filename(
        db,
        file.filename
    )

    if existing:
        return {
            "duplicate": True,
            "message": "Image already exists.",
            "image": {
                "id": existing.id,
                "filename": existing.filename,
                "caption": existing.caption
            }
        }

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    caption = generate_caption(file_path)

    embedding = generate_embedding(caption)

    image = create_image(
        db,
        filename=file.filename,
        caption=caption,
        embedding=embedding
    )

    return {
        "id": image.id,
        "filename": image.filename,
        "caption": image.caption,
        "uploaded_at": image.uploaded_at
    }