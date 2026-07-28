from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.crud.image_crud import (
    get_all_images,
    get_image_by_id,
    delete_image
)

router = APIRouter(prefix="/images", tags=["Images"])


@router.get("/")
def read_images(db: Session = Depends(get_db)):
    return get_all_images(db)


@router.get("/{image_id}")
def read_image(image_id: int, db: Session = Depends(get_db)):

    image = get_image_by_id(db, image_id)

    if image is None:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    return image


@router.delete("/{image_id}")
def remove_image(image_id: int, db: Session = Depends(get_db)):

    image = get_image_by_id(db, image_id)

    if image is None:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    delete_image(db, image)

    return {
        "message": "Image deleted successfully"
    }