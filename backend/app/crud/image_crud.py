from sqlalchemy.orm import Session

from app.models.image import Image


def create_image(
    db: Session,
    filename: str,
    caption: str,
    embedding: list,
    image_hash: str
) -> Image:
    """
    Create a new image record.
    """

    image = Image(
        filename=filename,
        caption=caption,
        embedding=embedding,
        image_hash=image_hash
    )

    db.add(image)
    db.commit()
    db.refresh(image)

    return image


def get_all_images(db: Session):
    """
    Return all images.
    """
    return db.query(Image).all()


def get_image_by_id(db: Session, image_id: int):
    """
    Return one image by ID.
    """
    return (
        db.query(Image)
        .filter(Image.id == image_id)
        .first()
    )


def delete_image(db: Session, image: Image):
    """
    Delete an image.
    """
    db.delete(image)
    db.commit()


def get_images_with_embeddings(db: Session):
    """
    Return only images having embeddings.
    """
    return (
        db.query(Image)
        .filter(Image.embedding.isnot(None))
        .all()
    )


def get_image_by_filename(
    db: Session,
    filename: str
):
    """
    Find image by filename.
    """
    return (
        db.query(Image)
        .filter(Image.filename == filename)
        .first()
    )


def get_image_by_hash(
    db: Session,
    image_hash: str
):
    """
    Find image by SHA-256 hash.
    """
    return (
        db.query(Image)
        .filter(Image.image_hash == image_hash)
        .first()
    )