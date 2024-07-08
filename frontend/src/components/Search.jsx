import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artists');
        console.log('Fetched artists:', response.data);
        // Extragem doar numele artiștilor și le setăm ca sugestii
        const artistNames = response.data.map(artist => artist.name);
        setSuggestions(artistNames);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    if (inputValue.trim() === '') {
        setResults([]);
    } else {
        // Filtrăm sugestiile pe baza valorii de input
        const filteredResults = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );
        setResults(filteredResults);
    }
  };

  const handleSelect = (value) => {
    setQuery(value);
    setResults([]);
  };

  return (
    <section id="search" className="row">
      <article className="col-lg-12">
        <h1>Let's search for your desired artist:</h1>
        <div className="form-outline search-bar" data-mdb-input-init>
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
            <button type="button" className="btn btn-light ml-2 delete-button" >
              <i className="fas fa-search"></i>
            </button>
          </section>
          <ul className="autocomplete-suggestions">
            {results.map((result, index) => (
              <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(result)}>
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
