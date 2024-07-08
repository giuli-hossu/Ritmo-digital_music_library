import React, { useState } from "react";
import Header from "./Header";
import Description from "./Description";
import Search from "./Search";
import Artists from "./Artists";

function App() {
  const [selectedArtist, setSelectedArtist] = useState("");

  return (
    <div>
      <Header />
      <Description />
      <Search setSelectedArtist={setSelectedArtist} />
      <Artists selectedArtist={selectedArtist} />
    </div>
  );
}

export default App;
