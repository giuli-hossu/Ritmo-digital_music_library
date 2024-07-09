import React, { useState, useEffect } from "react";
import axios from "axios";

function Search({ setSelectedArtist }) {
  // State for storing the search results
  const [results, setResults] = useState([]);
  // State for storing the user's query
  const [query, setQuery] = useState("");
  // State for storing the artist suggestions
  const [suggestions, setSuggestions] = useState([]);

  // Fetch the list of artists on component mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/artists");
        console.log("Fetched artists:", response.data);
        const artistNames = response.data.map(artist => artist.name);
        setSuggestions(artistNames);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []); // Empty dependency array ensures this runs only once

  // Handle changes in the search input
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // If the input is empty, clear the results
    if (inputValue.trim() === "") {
      setResults([]);
    } else {
      // Filter suggestions based on the input and limit results to 2
      const filteredResults = suggestions
        .filter(suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 2); 
      setResults(filteredResults);
    }
  };

  // Handle the search button click
  const handleSearch = async () => {
    try {
      setSelectedArtist(query); // Pass the selected artist to the parent component
      setResults([]); // Clear the results after selection
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <section id="search" className="row">
      <article className="col-lg-12">
        {/* Search header */}
        <h1>Let's search for your desired artist:</h1>
        
        {/* Search bar */}
        <div className="form-outline search-bar">
          <section className="d-flex justify-content-between align-items-center question-section">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Type the name of the artist..."
              value={query}
              onChange={handleChange}
              autoComplete="off"
            />
            <button
              type="button"
              className="btn btn-light ml-2 delete-button"
              onClick={handleSearch}
            >
              <i className="fas fa-search"></i>
            </button>
          </section>
          
          {/* Autocomplete suggestions */}
          <ul className="autocomplete-suggestions">
            {results.map((result, index) => (
              <li
                key={index}
                className="autocomplete-suggestion"
                onClick={() => setQuery(result)}
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}

export default Search;
