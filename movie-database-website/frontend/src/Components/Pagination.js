/* eslint-disable react/prop-types */

import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UsePagination({data, itemsPerPage, setData}) {
  
  const [currentData, setCurrentData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  useEffect(() => {
    setCheckedBoxes(new Array(data.length).fill(false))

  }, [data])

  const handleBoxCheck = (position) => {
    const updatedCheckedState = checkedBoxes.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedBoxes(updatedCheckedState);

  }

  function handleMovieHiding() {
    const result = data.filter((movie) => checkedBoxes[data.findIndex((iterMovie) => iterMovie.id === movie.id)] !== true)

    setData(result)
  }


  useEffect(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    setCurrentData(data.slice(begin, end));
  }, [data, currentPage, itemsPerPage])


  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    // eslint-disable-next-line no-unused-vars
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }


  return (
    <div className="movies-list">
      <div className="pagination-buttons">
        <button onClick={() => jump(1)}> {'<<<'} First</button>
        <button onClick={prev}>PreV</button>
        <p>{currentPage}</p>
        <button onClick={next}>NeXt</button>
        <button onClick={() => jump(maxPage)}> {'>>>'} Last</button>
        
      </div>
      {
      currentData.map((movie) => 

      <div key={movie.id}
        className="movie-main">

        <Link to={`/movie/${movie.id}`}>
            <div className="movie-container">

              <div className="movie-image">
                <img src={movie.image_url}/>
              </div>

              <div className="movie-details">
                <div className="movie-head">

                  <div className="movie-title"> 
                    <p>{movie.title}</p>
                  </div>
                  <div className="movie-year">
                    <p>{movie.year}</p>
                  </div>

                </div>
                <div className="movie-body">
                  <div className="movie-genre">
                    <p>{movie.genre}</p>
                  </div>
                  {/* KOMPONENT WYSWIETLAJACY OCENE */}
                </div>
              </div>

            </div>
        </Link>

        <div className="movie-hide">
          <label>Hide</label>
          <input
              type="checkbox" 
              className="hide-movie"
              checked={checkedBoxes[data.findIndex((iterMovie) => iterMovie.id === movie.id)] || false}
              onChange={() => handleBoxCheck(data.findIndex((iterMovie) => iterMovie.id === movie.id))}
              />
        </div>

      </div>
      )}
      <div className="hide-movies-button">
        <button onClick={handleMovieHiding}>Hide Selected</button>
      </div>
    </div>
  )
}

export default UsePagination;

