import { useState } from "react";
import api from "../api/api";

function SearchImages() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {

        if (!query.trim()) {
            alert("Enter a search query.");
            return;
        }

        try {

            const response = await api.get("/search", {
                params: {
                    query: query
                }
            });

            setResults(response.data);
            setSearched(true);

        } catch (error) {
            console.error(error);
            alert("Search failed.");
        }
    };

    return (

        <div className="card">

            <h2>Semantic Search</h2>

            <br />

            <input
                type="text"
                placeholder="Search images..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleSearch}>
                Search
            </button>

            <br />
            <br />

            {
                results.map((image) => (

                    <div
                        key={image.id}
                        style={{
                            background: "#ffffff",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            marginBottom: "20px"
                        }}
                    >
                        <img
                            src={`http://127.0.0.1:8000/uploads/${image.filename}`}
                            alt={image.filename}
                            width="250"
                            style={{
                                borderRadius: "10px",
                                marginBottom: "15px"
                            }}
                        />

                        <h3>{image.filename}</h3>

                        <p>
                            <strong>Caption:</strong> {image.caption}
                        </p>

                        <p>
                            ⭐ Similarity Score:
                            <strong> {(image.score * 100).toFixed(1)}%</strong>
                        </p>

                    </div>

                ))
            }

            {searched && results.length === 0 && (
                <p
                    style={{
                        textAlign:"center",
                        color:"gray",
                        marginTop:"20px"
                    }}
                >
                    No matching images found.
                </p>
            )}

        </div>

    );
}

export default SearchImages;