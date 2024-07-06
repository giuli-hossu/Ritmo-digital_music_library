import React from "react";

function Search() {
    return (
        <section id="search" className="row">
            <article className="col-lg-12">
                <h1>Let's search for your desired artist:</h1>
                <div className="form-outline search-bar" data-mdb-input-init>
                    <section className="d-flex justify-content-between align-items-center question-section">
                        <input type="search" id="form1" className="form-control" placeholder="Type the name of the artist..." />
                        <button type="button" className="btn btn-light ml-2 delete-button" id=""> <i className="fas fa-search"></i></button>
                    </section>
                </div>
            </article>
        </section>
    );
}

export default Search;