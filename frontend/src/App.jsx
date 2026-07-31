import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import api from "./api/api";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import UploadImage from "./components/UploadImage";
import Gallery from "./components/Gallery";
import SearchImages from "./components/SearchImages";
import Footer from "./components/Footer";

function App() {

  const [images, setImages] = useState([]);

  const fetchImages = async () => {

    try {

      const response = await api.get("/images");

      setImages(response.data);

    }

    catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchImages();

  }, []);

  return (

    <>

      <Toaster
        position="top-right"
      />

      <div className="app-background">

        <Navbar />

        <Hero />

        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          <Stats />

          <UploadImage
            refreshGallery={fetchImages}
          />

          <Gallery
            images={images}
            refreshGallery={fetchImages}
          />

          <SearchImages
            refreshGallery={fetchImages}
          />

        </motion.div>

        <Footer />

      </div>

    </>

  );

}

export default App;