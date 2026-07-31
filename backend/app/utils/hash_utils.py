import hashlib


def calculate_image_hash(file_path: str) -> str:
    """
    Calculate the SHA-256 hash of an image file.
    """

    sha = hashlib.sha256()

    with open(file_path, "rb") as file:

        while True:
            chunk = file.read(4096)

            if not chunk:
                break

            sha.update(chunk)

    return sha.hexdigest()