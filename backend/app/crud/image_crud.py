from sqlalchemy.orm import Session
from app.models.image import Image


def create_image(db: Session, filename: str, caption: str):
    image = Image(
        filename=filename,
        caption=caption
    )

    db.add(image)
    db.commit()
    db.refresh(image)

    return image


def get_all_images(db: Session):
    return db.query(Image).all()


def get_image_by_id(db: Session, image_id: int):
    return db.query(Image).filter(Image.id == image_id).first()


def delete_image(db: Session, image: Image):
    db.delete(image)
    db.commit()