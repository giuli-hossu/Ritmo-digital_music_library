import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Artists({selectedArtist}) {
  const [artists, setArtists] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState(null);

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

  const handleToggleAlbum = (albumId) => {
    setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
  };

  return (
    <section id="artists" className="row">
      {artists.map(artist => (
        <article
        key={artist.name}
        className={`card col-lg-3 col-md-6 col-sm-12 col-xs-12 ${
          selectedArtist === artist.name ? 'border border-warning' : ''
        }`}
      >
          <h3 className="card-title">{artist.name}</h3>
          <ul className="list-group list-group-flush">
            {artist.albums.map(album => (
              <li key={album.title} className="list-group-item">
                <h6 className={expandedAlbum === album.title ? 'fw-bold' : ''}>
                  {album.title}
                </h6>
                <button
                  className={`btn ms-2 ${expandedAlbum === album.title ? 'rotate-icon' : ''}`}
                  onClick={() => handleToggleAlbum(album.title)}
                >
                  <i className="fa-solid fa-play"></i>
                </button>
                {expandedAlbum === album.title && (
                  <section className="mt-2">
                    <p><em>{album.description}</em></p>
                    <p><strong>Songs:</strong></p>
                    <ol>
                      {album.songs.map(song => (
                        <li key={song._id}> {song.title} <span>{song.length}</span></li>
                      ))}
                    </ol>
                  </section>
                )}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
};

export default Artists;

