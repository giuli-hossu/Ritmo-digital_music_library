import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artists');
        console.log('Fetched artists:', response.data);
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (

    <section id="artists" className="row row-cols-sm-12 row-cols-md-2 row-cols-lg-4 g-3">
      {artists.map(artist => (
          <article key={artist._id} className="col card">
            <h3 className="card-title">{artist.name}</h3>
            <ul className=" list-group-flush">
              {artist.albums.map(album => (
                <li key={album._id} className="list-group-item">{album.title}<button className="btn"><i className="fa-solid fa-play"></i> </button></li>
              ))}
            </ul>
          </article>
      ))}
    </section>

  );
};

export default Artists;
