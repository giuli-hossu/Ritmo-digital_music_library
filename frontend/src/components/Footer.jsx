import React from "react";

function Footer() {
  return (
    <footer>
      {/* LinkedIn link with corresponding icon */}
      <a className="footer-link" href="https://www.linkedin.com/in/ioana-giulia-hossu/">
        <i className="fab fa-linkedin footer-icon"></i>
      </a>
      
      {/* GitHub link with corresponding icon */}
      <a className="footer-link" href="https://github.com/giuli-hossu">
        <i className="fab fa-github footer-icon"></i>
      </a>
      
      {/* Email link with corresponding icon */}
      <a className="footer-link" href="mailto:ioana.hossu@yahoo.com">
        <i className="fas fa-envelope footer-icon"></i>
      </a>
    </footer>
  );
}

export default Footer;
