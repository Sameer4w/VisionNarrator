import json
from sqlalchemy.orm import Session
from app.models.image import Image


def create_image(
    db: Session,
    filename: str,
    caption: str,
    embedding: list
):

    image = Image(
        filename=filename,
        caption=caption,
        embedding=json.dumps(embedding)
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
    
def get_images_with_embeddings(db: Session):
    return (
        db.query(Image)
        .filter(Image.embedding != None)
        .all()
    )

def get_image_by_filename(db: Session, filename: str):
    return (
        db.query(Image)
        .filter(Image.filename == filename)
        .first()
    )