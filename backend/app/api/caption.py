from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

import os
import shutil

from app.ai.caption_service import generate_caption
from app.ai.embedding_service import generate_embedding
from app.database.dependencies import get_db
from app.utils.hash_utils import calculate_image_hash

from app.crud.dashboard_crud import increase_duplicate_count

from app.crud.image_crud import (
    create_image,
    get_image_by_hash
)

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/caption")
async def caption_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    # Save uploaded image
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Calculate SHA-256 hash
    image_hash = calculate_image_hash(file_path)

    # Check duplicate using image hash
    existing = get_image_by_hash(
        db,
        image_hash
    )

    if existing:

        os.remove(file_path)

        increase_duplicate_count(db)

        return {
            "duplicate": True,
            "message": "This image already exists.",
            "existing_image": {
                "id": existing.id,
                "filename": existing.filename,
                "caption": existing.caption
            }
        }

    # Generate AI caption
    caption = generate_caption(file_path)

    # Generate semantic embedding
    embedding = generate_embedding(caption)

    # Save image details to database
    image = create_image(
        db=db,
        filename=file.filename,
        caption=caption,
        embedding=embedding,
        image_hash=image_hash
    )

    return {
        "duplicate": False,
        "id": image.id,
        "filename": image.filename,
        "caption": image.caption,
        "uploaded_at": image.uploaded_at
    }