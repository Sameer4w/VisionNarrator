import UploadImage from "./components/UploadImage";
import SearchImages from "./components/SearchImages";

function App() {

    return (

        <div className="container">

            <div className="header">

                <h1>🖼️ VisionNarrator</h1>

                <p className="subtitle">
                    AI-Powered Image Captioning & Semantic Search
                </p>

            </div>

            <UploadImage />

            <SearchImages />

        </div>

    );

}

export default App;