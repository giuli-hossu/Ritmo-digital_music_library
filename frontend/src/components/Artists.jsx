import React, { useEffect, useState } from "react";

function Artists({ selectedArtist }) {
  // State variables for artists, expanded album, editing state, and edited data
  const [artists, setArtists] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState(null);
  const [editingArtistId, setEditingArtistId] = useState(null);
  const [editedArtistName, setEditedArtistName] = useState("");
  const [editedAlbums, setEditedAlbums] = useState([]);

  // Fetch artists data from the API on component mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists");
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  // Toggle expanded state of an album
  const handleToggleAlbum = (albumId) => {
    setExpandedAlbum((prevAlbumId) => (prevAlbumId === albumId ? null : albumId));
  };

  // Set editing state for a selected artist
  const handleEditArtist = (artistId) => {
    const artistToEdit = artists.find((artist) => artist._id === artistId);
    setEditingArtistId(artistId);
    setEditedArtistName(artistToEdit.name);
    setEditedAlbums(artistToEdit.albums);
  };

  // Delete an artist
  const deleteArtist = async (artistName) => {
    try {
      const url = `http://localhost:5000/api/artists/${encodeURIComponent(artistName)}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete artist');
      }

      // Refresh the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  // Add a new album to the editedAlbums state
  const addAlbum = () => {
    const newAlbum = {
      title: "",
      description: "",
      songs: [{ title: "", length: "" }],
    };
    setEditedAlbums([...editedAlbums, newAlbum]);
  };

  // Delete an album from the editedAlbums state
  const deleteAlbum = (albumIndex) => {
    const updatedAlbums = editedAlbums.filter((album, index) => index !== albumIndex);
    setEditedAlbums(updatedAlbums);
  };

  // Add a new song to a specific album in editedAlbums
  const addSong = (albumIndex) => {
    const updatedAlbums = [...editedAlbums];
    updatedAlbums[albumIndex].songs.push({ title: "", length: "" });
    setEditedAlbums(updatedAlbums);
  };

  // Delete a song from a specific album in editedAlbums
  const deleteSong = (albumIndex, songIndex) => {
    const updatedAlbums = [...editedAlbums];
    updatedAlbums[albumIndex].songs = updatedAlbums[albumIndex].songs.filter((song, index) => index !== songIndex);
    setEditedAlbums(updatedAlbums);
  };

  // Cancel the edit mode for an artist
  const handleCancelEdit = () => {
    setEditingArtistId(null);
    setEditedArtistName("");
    setEditedAlbums([]);
  };

  // Update the artist data after editing
  const updateData = async () => {
    try {
      const updatedArtist = {
        name: editedArtistName,
        albums: editedAlbums.map(album => ({
          albumName: album.title,
          albumDescription: album.description,
          songs: album.songs.map(song => ({
            songName: song.title,
            songDuration: song.length
          }))
        }))
      };

      // Find the original artist name and send PUT request to update data
      const artistName = artists.find(artist => artist._id === editingArtistId).name;
      const response = await fetch(
        `http://localhost:5000/api/artists/${encodeURIComponent(artistName)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedArtist),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update artist');
      }

      // Refresh the page after successful update
      window.location.reload();
    } catch (error) {
      console.error('Error updating artist:', error);
      // Refresh the page on error
      window.location.reload();
    }
  };

  return (
    <section id="artists" className="row">
      {/* Render each artist as a card */}
      {artists.map((artist) => (
        <article
          key={artist._id}
          className={`card col-lg-3 col-md-6 col-sm-12 col-xs-12 ${selectedArtist === artist.name ? "border border-warning" : ""}`}
        >
          {/* If in editing mode for an artist */}
          {editingArtistId === artist._id ? (
            <div>
              {/* Edit form for artist details */}
              <label htmlFor="artistName">
                <h3>Artist name</h3>
              </label>
              {/* Delete artist button */}
              <button type="button" className="btn add-button" onClick={() => deleteArtist(artist.name)} style={{ float: "right", margin: "20px 10px" }}>
                Delete Artist
              </button>
              <input
                type="text"
                id="artistName"
                name="artistName"
                className="form-control"
                value={editedArtistName}
                onChange={(e) => setEditedArtistName(e.target.value)}
                readOnly
              />
              <br />

              {/* Editable albums and songs */}
              {editedAlbums.map((album, albumIndex) => (
                <div key={albumIndex} className="album-style">
                  <label htmlFor={`albumName${albumIndex}`}>
                    <h6>Album name</h6>
                  </label>
                  {/* Delete album button */}
                  <button type="button" className="btn add-button" onClick={() => deleteAlbum(albumIndex)} style={{ float: "right" }}>
                    Delete Album
                  </button>
                  <input
                    type="text"
                    id={`albumName${albumIndex}`}
                    name={`albumName${albumIndex}`}
                    className="form-control"
                    value={album.title}
                    onChange={(e) => {
                      const updatedAlbums = [...editedAlbums];
                      updatedAlbums[albumIndex].title = e.target.value;
                      setEditedAlbums(updatedAlbums);
                    }}
                  />
                  <br />

                  <label htmlFor={`albumDescription${albumIndex}`}>
                    <h6>Album description</h6>
                  </label>
                  <textarea
                    id={`albumDescription${albumIndex}`}
                    name={`albumDescription${albumIndex}`}
                    className="form-control"
                    value={album.description}
                    onChange={(e) => {
                      const updatedAlbums = [...editedAlbums];
                      updatedAlbums[albumIndex].description = e.target.value;
                      setEditedAlbums(updatedAlbums);
                    }}
                  />
                  <br />

                  {/* Editable songs within the album */}
                  {album.songs.map((song, songIndex) => (
                    <div key={`${albumIndex}_${songIndex}`} className="row">
                      <article className="col-lg-7 col-md-7 col-sm-12">
                        <label htmlFor={`songName${albumIndex}_${songIndex}`}>
                          <h6>Song name</h6>
                        </label>
                        <input
                          type="text"
                          id={`songName${albumIndex}_${songIndex}`}
                          name={`songName${albumIndex}_${songIndex}`}
                          className="form-control"
                          value={song.title}
                          onChange={(e) => {
                            const updatedAlbums = [...editedAlbums];
                            updatedAlbums[albumIndex].songs[songIndex].title = e.target.value;
                            setEditedAlbums(updatedAlbums);
                          }}
                        />
                      </article>
                      <article className="col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor={`songDuration${albumIndex}_${songIndex}`}>
                          <h6>Duration</h6>
                        </label>
                        <input
                          type="text"
                          id={`songDuration${albumIndex}_${songIndex}`}
                          name={`songDuration${albumIndex}_${songIndex}`}
                          className="form-control"
                          value={song.length}
                          onChange={(e) => {
                            const updatedAlbums = [...editedAlbums];
                            updatedAlbums[albumIndex].songs[songIndex].length = e.target.value;
                            setEditedAlbums(updatedAlbums);
                          }}
                        />
                        <br />
                      </article>
                      <article className="col-lg-2 col-md-2 col-sm-12">
                        {/* Delete song button */}
                        <label htmlFor={`delete${albumIndex}_${songIndex}`} style={{ color: "#fff" }} className="delete-label">
                          <h6>D</h6>
                        </label>
                        <button type="button" id={`delete${albumIndex}_${songIndex}`} className="btn trash-button" onClick={() => deleteSong(albumIndex, songIndex)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </article>
                    </div>
                  ))}

                  {/* Button to add a new song */}
                  <button type="button" className="btn add-button" onClick={() => addSong(albumIndex)}>
                    Add Song
                  </button>
                </div>
              ))}

              {/* Button to add a new album */}
              <button type="button" className="btn add-button finish-button" onClick={addAlbum}>
                Add album
              </button>
              <article>
                {/* Save and cancel buttons */}
                <button type="button" className="btn add-button finish-button" onClick={updateData}>
                  Save
                </button>
                <button type="button" className="btn add-button finish-button" onClick={handleCancelEdit} style={{ float: "right" }}>
                  Cancel
                </button>
              </article>

            </div>
          ) : (
            // Display artist details
            <div>
              <section className="card-title">
                <h3>{artist.name}</h3>
                {/* Button to edit artist */}
                <button className="btn edit-button icon-button" onClick={() => handleEditArtist(artist._id)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
              </section>

              {/* List of albums for the artist */}
              <ul className="list-group list-group-flush">
                {artist.albums.map((album) => (
                  <li key={album.title} className="list-group-item">
                    <h6 className={expandedAlbum === album.title ? "fw-bold" : ""}>{album.title}</h6>

                    {/* Button to toggle album details */}
                    <button
                      className={`btn ms-2 icon-button${expandedAlbum === album.title ? "rotate-icon" : ""}`}
                      onClick={() => handleToggleAlbum(album.title)}
                    >
                      <i className="fa-solid fa-play"></i>
                    </button>

                    {/* Display album details if expanded */}
                    {expandedAlbum === album.title && (
                      <section className="mt-2">
                        <p>
                          <em>{album.description}</em>
                        </p>
                        <p>
                          <strong>Songs:</strong>
                        </p>
                        <ol>
                          {album.songs.map((song, songIndex) => (
                            <li key={`${album.title}_${songIndex}`}>
                              {song.title} <span>{song.length}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

export default Artists;
