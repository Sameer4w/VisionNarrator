from app.ai.embedding_service import generate_embedding

embedding = generate_embedding(
    "A dog running in the park"
)

print("Vector Length:", len(embedding))

print(embedding[:10])