import React from "react";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top ">
        <a href="/">
          <img className="navbar-brand logo" src="logo-ritmo.png" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="#search">Search</a>
            <a className="nav-item nav-link" href="#artists">Artists</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
