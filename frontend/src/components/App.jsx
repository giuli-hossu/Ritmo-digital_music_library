import React, { useState } from "react";
import Header from "./Header";
import Description from "./Description";
import Search from "./Search";
import Artists from "./Artists";
import Footer from "./Footer";

function App() {
  // State to keep track of the selected artist, initially an empty string
  const [selectedArtist, setSelectedArtist] = useState("");

  return (
    <section>
      {/* Components */}
      <Header />
      <Description />
      <Search setSelectedArtist={setSelectedArtist} />
      <Artists selectedArtist={selectedArtist} />
      <Footer />
    </section>
  );
}

export default App;
