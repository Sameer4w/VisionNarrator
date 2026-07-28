import json

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def calculate_similarity(query_embedding, stored_embedding):

    stored_embedding = json.loads(stored_embedding)

    score = cosine_similarity(
        np.array(query_embedding).reshape(1, -1),
        np.array(stored_embedding).reshape(1, -1)
    )[0][0]

    return float(score)