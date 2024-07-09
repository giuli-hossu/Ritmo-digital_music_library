import React from "react";

function Header() {
  return (
    <header>
      {/* Navigation bar with fixed positioning */}
      <nav className="navbar navbar-expand-lg fixed-top ">
        <a href="/">
          <img className="navbar-brand logo" src="logo-ritmo.png" alt="logo-ritmo" />
        </a>

         {/* Navigation Links Section */}
        <button className="navbar-toggler " type="button" 
        data-toggle="collapse" data-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
        >
        <i className="fa-solid fa-bars"style={{ color: '#C4E0F9' }}></i>
        </button>
        
         {/* Navigation Links Section */}
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="#search">Search</a>
            <a className="nav-item nav-link" href="#add-artist">Add artist</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;