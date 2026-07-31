from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def calculate_similarity(query_embedding, stored_embedding):

    # Convert PostgreSQL array string to Python list
    if isinstance(stored_embedding, str):
        stored_embedding = stored_embedding.strip("{}")
        stored_embedding = [
            float(x)
            for x in stored_embedding.split(",")
            if x.strip()
        ]

    query_embedding = np.array(query_embedding, dtype=float)
    stored_embedding = np.array(stored_embedding, dtype=float)

    score = cosine_similarity(
        query_embedding.reshape(1, -1),
        stored_embedding.reshape(1, -1)
    )[0][0]

    return float(score)