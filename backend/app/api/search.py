from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.ai.embedding_service import generate_embedding
from app.ai.search_service import calculate_similarity
from app.crud.image_crud import get_images_with_embeddings
from app.database.dependencies import get_db
from app.crud.dashboard_crud import increase_search_count

router = APIRouter(
    prefix="/search",
    tags=["Semantic Search"]
)


@router.get("/")
def semantic_search(
    query: str,
    db: Session = Depends(get_db)
):
    """
    Perform semantic search on stored image captions.
    """

    increase_search_count(db)
    
    query = query.strip()

    query_embedding = generate_embedding(query)

    images = get_images_with_embeddings(db)

    results = []

    for image in images:

        similarity = calculate_similarity(
            query_embedding,
            image.embedding
        )

        results.append(
            {
                "id": image.id,
                "filename": image.filename,
                "caption": image.caption,
                "score": round(similarity, 4)
            }
        )

    results.sort(
        key=lambda image: image["score"],
        reverse=True
    )

    return results[:5]