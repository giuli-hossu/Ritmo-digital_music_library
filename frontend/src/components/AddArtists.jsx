import React, { useState } from "react";

function AddArtist() {
    const [name, setName] = useState('');
    const [albums, setAlbums] = useState([
        {
            albumName: '',
            albumDescription: '',
            songs: [{
                songName: '',
                songDuration: ''
            }]
        }
    ]);
    const [albumName, setAlbumName] = useState('');
    const [albumDescription, setAlbumDescription] = useState('');
    const [songName, setSongName] = useState('');
    const [songDuration, setSongDuration] = useState('');

    // Function to add a new album
    const addAlbum = () => {
        const newAlbum = { albumName, albumDescription, songs: [{ songName, songDuration }] };
        setAlbums([...albums, newAlbum]); // Update albums state with new album
        setAlbumName(''); // Clear albumName input field
        setAlbumDescription('');
        setSongName('');
        setSongDuration('');
    };

    // Function to delete an album
    const deleteAlbum = (albumIndex) => {
        const updatedAlbums = albums.filter((album, index) => index !== albumIndex);
        setAlbums(updatedAlbums); // Update albums state after filtering out the deleted album
    };

    // Function to add a new song to a specific album
    const addSong = (albumIndex) => {
        const updatedAlbums = [...albums];
        updatedAlbums[albumIndex].songs.push({ songName, songDuration });
        setAlbums(updatedAlbums); // Update albums state after adding new song
        setSongName('');
        setSongDuration('');
    };

    // Function to delete a song from a specific album
    const deleteSong = (albumIndex, songIndex) => {
        const updatedAlbums = [...albums];
        updatedAlbums[albumIndex].songs = updatedAlbums[albumIndex].songs.filter((song, index) => index !== songIndex);
        setAlbums(updatedAlbums); // Update albums state after filtering out the deleted song
    };

    //Function to reset form
    const resetForm = () => {
        setName('');
        setAlbums([
            {
                albumName: '',
                albumDescription: '',
                songs: [{ songName: '', songDuration: '' }]
            }
        ]);
    };

    const saveData = async () => {
        try {
            const artistData = {
                name: name,
                albums: albums.map(album => ({
                    albumName: album.albumName,
                    albumDescription: album.albumDescription,
                    songs: album.songs.map(song => ({
                        songName: song.songName,
                        songDuration: song.songDuration
                    }))
                }))
            };
    
            const response = await fetch('http://localhost:5000/api/artists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artistData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
          
            // Optionally handle success feedback or navigation logic
        } catch (error) {
            console.error("Error saving artist data:", error);
            // Optionally handle error feedback
        }
        window.location.reload();
        // Reset form after saving data
        resetForm();
    };

    return (
        <section id="add-artist" className="col-lg-12">
          <h1> Add your artist:</h1>
          <article className="col-lg-6 add-artist">
            <label htmlFor="artistName">
              <h3>Artist name</h3>
            </label>
            <input
              type="text"
              id="artistName"
              name="artistName"
              className="form-control"
              value={name}
              placeholder="Type the artist name..."
              onChange={(e) => setName(e.target.value)}
            />
            <br />
    
            {albums.map((album, albumIndex) => (
              <article key={albumIndex} className="album-style">
                <label htmlFor={`albumName${albumIndex}`}>
                  <h6>Album name</h6>
                </label>
                <input
                  type="text"
                  id={`albumName${albumIndex}`}
                  name={`albumName${albumIndex}`}
                  className="form-control"
                  value={album.albumName}
                  placeholder="Type the album name..."
                  onChange={(e) => {
                    const updatedAlbums = [...albums];
                    updatedAlbums[albumIndex].albumName = e.target.value;
                    setAlbums(updatedAlbums); // Update albums state when album name changes
                  }}
                />
                <br />
                <label htmlFor={`albumDescription${albumIndex}`}>
                  <h6>Album description</h6>
                </label>
                <textarea
                  type="text"
                  id={`albumDescription${albumIndex}`}
                  name={`albumDescription${albumIndex}`}
                  className="form-control"
                  value={album.albumDescription}
                  placeholder="Type the album description..."
                  onChange={(e) => {
                    const updatedAlbums = [...albums];
                    updatedAlbums[albumIndex].albumDescription = e.target.value;
                    setAlbums(updatedAlbums); // Update albums state when album description changes
                  }}
                />
                <br />
    
                {album.songs.map((song, songIndex) => (
                  <div key={songIndex} className="row">
                    <article className="col-lg-7 col-md-7 col-sm-12">
                      <label htmlFor={`songName${albumIndex}_${songIndex}`}>
                        <h6>Song name</h6>
                      </label>
                      <input
                        type="text"
                        id={`songName${albumIndex}_${songIndex}`}
                        name={`songName${albumIndex}_${songIndex}`}
                        className="form-control"
                        value={song.songName}
                        placeholder="Type the song name..."
                        onChange={(e) => {
                          const updatedAlbums = [...albums];
                          updatedAlbums[albumIndex].songs[songIndex].songName = e.target.value;
                          setAlbums(updatedAlbums); // Update albums state when song name changes
                        }}
                      />
                    </article>
                    <article className="col-lg-3 col-md-3 col-sm-12">
                      <label htmlFor={`songDuration${albumIndex}_${songIndex}`}>
                        <h6>Song duration</h6>
                      </label>
                      <input
                        type="text"
                        id={`songDuration${albumIndex}_${songIndex}`}
                        name={`songDuration${albumIndex}_${songIndex}`}
                        className="form-control"
                        value={song.songDuration}
                        placeholder="Duration..."
                        onChange={(e) => {
                          const updatedAlbums = [...albums];
                          updatedAlbums[albumIndex].songs[songIndex].songDuration = e.target.value;
                          setAlbums(updatedAlbums); // Update albums state when song duration changes
                        }}
                      />
                      <br />
                    </article>
                    <article className="col-lg-2 col-md-2 col-sm-12">
                      <label htmlFor={`delete${albumIndex}_${songIndex}`} style={{ color: "#fff" }} className="delete-label">
                        <h6>Delete</h6>
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
                <button type="button" className="btn add-button" onClick={() => deleteAlbum(albumIndex)} style={{ float: "right" }}>
                  Delete Album
                </button>
              </article>
            ))}
            <br />
            <section className="button-section">
              <button type="button" className="btn add-button" onClick={addAlbum}>
                Add Album
              </button>
              <button type="button" className="btn add-button" onClick={saveData} style={{ float: "right" }}>
                Done
              </button>
              <button type="button" className="btn add-button" onClick={resetForm} style={{ float: "right", marginRight: "15px" }}>
                Reset
              </button>
            </section>
          </article>
        </section>
      );
    }
    
    export default AddArtist;