"use client"
import React, { useState, useEffect } from 'react';

export default function Albums ()  {
  const url = "https://jsonplaceholder.typicode.com/albums";
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {albums.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>{album.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};


