from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

from app.ai.caption_service import generate_caption
from app.database.dependencies import get_db
from app.crud.image_crud import create_image

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

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    caption = generate_caption(file_path)

    image = create_image(
        db,
        filename=file.filename,
        caption=caption
    )

    return {
        "id": image.id,
        "filename": image.filename,
        "caption": image.caption,
        "uploaded_at": image.uploaded_at
    }