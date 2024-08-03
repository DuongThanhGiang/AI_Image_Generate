import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "@fontsource/poppins";

const TextToImageGenerator = () => {
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonText, setButtonText] = useState("Random Image Generate");

    useEffect(() => {
        setButtonText(text ? 'Chuyển đổi ảnh' : 'Hiện ảnh ngẫu nhiên');
    },[text]);

    const generateImage = async () => {
        setLoading(true);
        const options = {
          method: "POST",
          url: "https://ai-image-generator3.p.rapidapi.com/generate",
          headers: {
            "x-rapidapi-key":
              "0d0cbae4bdmshc6895f3f9dcfd87p1df0d1jsn860401447b54",
            "x-rapidapi-host": "ai-image-generator3.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          data: {
            prompt: text,
            page: 1
          }
        };

        try {
            const response = await axios.request(options);
            console.log("API Response:", response);
            setImages(response.data.results.images);
            setCurrentIndex(0);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreImages = () => {
        setCurrentIndex(currentIndex + 4);
    };

    return (
      <div className="container mx-auto p-4">
        <h1
          className="text-3xl font-bold text-center mb-4 text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Chuyển đổi văn bản thành hình ảnh
        </h1>
        <div className="flex flex-col items-center">
          <textarea
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-4 outline-none"
            rows="3"
            placeholder="Viết hình ảnh bạn muốn AI của tôi vẽ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? "Đang vẽ..." : buttonText}{" "}
          </button>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.slice(0, currentIndex + 4).map(
              (
                image,
                index
              ) => (
                <img
                  key={index}
                  src={image}
                  alt={`Generated ${index}`}
                  className="max-w-full rounded shadow-lg"
                />
              )
            )}
          </div>
          {currentIndex + 4 < images.length && (
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
              onClick={loadMoreImages}
            >
              Hiện thêm
            </button>
          )}
        </div>
      </div>
    );
};

export default TextToImageGenerator;