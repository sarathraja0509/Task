import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5001/api/photos';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${page}`);
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data.nodes]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []); // Fetch photos on component mount

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchPhotos();
    }
  };

  return (
    <div className="App">
      <div className="photo-container">
        {photos.map((photo) => (
          <div className="photo" key={photo.nid}>
            <img src={photo.field_photo_image_section} alt={photo.title} />
            <h2>{photo.title}</h2>
            <p>{new Date(photo.last_update * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
