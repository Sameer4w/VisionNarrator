from sentence_transformers import SentenceTransformer

# Load the embedding model only once
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def generate_embedding(text: str) -> list:
    """
    Generate a vector embedding for the given text.
    """

    embedding = model.encode(
        text,
        convert_to_numpy=True
    )

    return embedding.tolist()