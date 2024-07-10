import React, { useEffect, useState } from "react";

function Artists({ selectedArtist }) {
  const [artists, setArtists] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState(null);
  const [editingArtistId, setEditingArtistId] = useState(null);
  const [editedArtistName, setEditedArtistName] = useState("");
  const [editedAlbums, setEditedAlbums] = useState([]);

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

  const handleToggleAlbum = (albumId) => {
    setExpandedAlbum((prevAlbumId) => (prevAlbumId === albumId ? null : albumId));
  };

  const handleEditArtist = (artistId) => {
    const artistToEdit = artists.find((artist) => artist._id === artistId);
    setEditingArtistId(artistId);
    setEditedArtistName(artistToEdit.name);
    setEditedAlbums(artistToEdit.albums);
  };

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

      window.location.reload();
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };
  

  const addAlbum = () => {
    const newAlbum = {
      title: "",
      description: "",
      songs: [{ title: "", length: "" }],
    };
    setEditedAlbums([...editedAlbums, newAlbum]);
  };

  const deleteAlbum = (albumIndex) => {
    const updatedAlbums = editedAlbums.filter((album, index) => index !== albumIndex);
    setEditedAlbums(updatedAlbums);
  };

  const addSong = (albumIndex) => {
    const updatedAlbums = [...editedAlbums];
    updatedAlbums[albumIndex].songs.push({ title: "", length: "" });
    setEditedAlbums(updatedAlbums);
  };

  const deleteSong = (albumIndex, songIndex) => {
    const updatedAlbums = [...editedAlbums];
    updatedAlbums[albumIndex].songs = updatedAlbums[albumIndex].songs.filter((song, index) => index !== songIndex);
    setEditedAlbums(updatedAlbums);
  };

  const handleCancelEdit = () => {
    setEditingArtistId(null);
    setEditedArtistName("");
    setEditedAlbums([]);
  };

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
  
      window.location.reload();
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  };
  

  return (
    <section id="artists" className="row">
      {artists.map((artist) => (
        <article
          key={artist._id}
          className={`card col-lg-3 col-md-6 col-sm-12 col-xs-12 ${selectedArtist === artist.name ? "border border-warning" : ""}`}
        >
          {editingArtistId === artist._id ? (
            <div>
              <label htmlFor="artistName">
                <h3>Artist name</h3>
              </label>
              <button type="button" className="btn add-button" onClick={() => deleteArtist(artist.name)} style={{ float: "right",margin:"20px 10px" }}>
                    Delete Artist
                  </button>
              <input
                type="text"
                id="artistName"
                name="artistName"
                className="form-control"
                value={editedArtistName}
                onChange={(e) => setEditedArtistName(e.target.value)}
              />
              <br />

              {editedAlbums.map((album, albumIndex) => (
                <div key={albumIndex} className="album-style">
                  <label htmlFor={`albumName${albumIndex}`}>
                    <h6>Album name</h6>
                  </label>
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
                        <label htmlFor={`delete${albumIndex}_${songIndex}`} style={{ color: "#fff" }} className="delete-label">
                          <h6>D</h6>
                        </label>
                        <button type="button" id={`delete${albumIndex}_${songIndex}`} className="btn trash-button" onClick={() => deleteSong(albumIndex, songIndex)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </article>
                    </div>
                  ))}

                  <button type="button" className="btn add-button" onClick={() => addSong(albumIndex)}>
                    Add Song
                  </button>
                </div>
              ))}

              <button type="button" className="btn add-button finish-button" onClick={addAlbum}>
                Add album
              </button>
              <article>
              <button type="button" className="btn add-button finish-button" onClick={updateData} >
                Save
              </button>
                <button type="button" className="btn add-button finish-button" onClick={handleCancelEdit} style={{ float: "right" }}>
                Cancel
              </button>
              
              </article>
              
            </div>
          ) : (
            <div>
              <section className="card-title">
                <h3>{artist.name}</h3>
                <button className="btn edit-button icon-button" onClick={() => handleEditArtist(artist._id)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
              </section>

              <ul className="list-group list-group-flush">
                {artist.albums.map((album) => (
                  <li key={album.title} className="list-group-item">
                    <h6 className={expandedAlbum === album.title ? "fw-bold" : ""}>{album.title}</h6>

                    <button
                      className={`btn ms-2 icon-button${expandedAlbum === album.title ? "rotate-icon" : ""}`}
                      onClick={() => handleToggleAlbum(album.title)}
                    >
                      <i className="fa-solid fa-play"></i>
                    </button>

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
