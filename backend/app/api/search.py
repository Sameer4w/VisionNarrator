from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.ai.embedding_service import generate_embedding
from app.ai.search_service import calculate_similarity
from app.crud.image_crud import get_images_with_embeddings

router = APIRouter(
    prefix="/search",
    tags=["Semantic Search"]
)


@router.get("/")
def semantic_search(
    query: str,
    db: Session = Depends(get_db)
):

    query_embedding = generate_embedding(query)

    images = get_images_with_embeddings(db)

    results = []

    for image in images:

        similarity = calculate_similarity(
            query_embedding,
            image.embedding
        )

        results.append({
            "id": image.id,
            "filename": image.filename,
            "caption": image.caption,
            "score": round(similarity, 4)
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results[:5]