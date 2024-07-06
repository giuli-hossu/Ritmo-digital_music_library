import React from "react";

function Description() {
  return (
    <section id="description" className="row" >
      <article className="col-lg-6 col-sm-12 description-article">
        <h1><strong>Digital</strong><br /> Music Library</h1>
        <p>Go beyond the ordinary.<br />
          <strong>Explore</strong> genres and  <strong>discover</strong> new artists that resonate with you.<br />
          Relive cherished moments with the songs that defined them.</p>
      </article>

      <article className="col-lg-6 col-sm-12 article-triangle">
        <object className="triangle-article "
          data="https://rive.app/community/files/892-1747-music-listener-musiclistener/embed"></object>
      </article>
    </section>
  );
}

export default Description;