import React, { useEffect, useState } from "react";
import axios from "axios";

function Artists({ selectedArtist }) {
  // State to store the list of artists
  const [artists, setArtists] = useState([]);
  
  // State to track which album is expanded
  const [expandedAlbum, setExpandedAlbum] = useState(null);

  // Fetch artists data from the server on component mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/artists");
        console.log("Fetched artists:", response.data);
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Function to toggle the expanded state of an album
  const handleToggleAlbum = (albumId) => {
    setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
  };

  return (
    <section id="artists" className="row">
      {/* Map through the list of artists */}
      {artists.map(artist => (
        <article
          key={artist.name}
          className={`card col-lg-3 col-md-6 col-sm-12 col-xs-12 ${
            selectedArtist === artist.name ? "border border-warning" : ""
          }`}
        >

          {/* Display artist name */}
          <h3 className="card-title">{artist.name}</h3>
          <ul className="list-group list-group-flush">
            {/* Map through the albums of the current artist */}
            {artist.albums.map(album => (
              <li key={album.title} className="list-group-item">

                {/* Display album title */}
                <h6 className={expandedAlbum === album.title ? "fw-bold" : ""}>
                  {album.title}
                </h6>

                {/* Button to toggle album details */}
                <button
                  className={`btn ms-2 ${expandedAlbum === album.title ? "rotate-icon" : ""}`}
                  onClick={() => handleToggleAlbum(album.title)}
                >
                  <i className="fa-solid fa-play"></i>
                </button>

                {/* Display album description and songs if album is expanded */}
                {expandedAlbum === album.title && (
                  <section className="mt-2">
                    <p><em>{album.description}</em></p>
                    <p><strong>Songs:</strong></p>
                    <ol>
                      {/* Map through the songs of the current album */}
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
}

export default Artists;
