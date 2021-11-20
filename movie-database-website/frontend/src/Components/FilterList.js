/* eslint-disable react/prop-types */

import { React, useRef, useState, useEffect } from "react";

function FilterParameters({setData, originalData}) {

  const [starFilter, setStarFilter] = useState("5")

  function handleStarFilterChange(option) {

    setStarFilter(option.target.value);
  }
  function handleRatingSubmit() {
    const result = originalData.filter((movie) => movie.rating >= starFilter)

    setData(result)
  }
  
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const showMenu = () => setIsActive(!isActive);

  const ActiveGenres = () => {
    const result = originalData.reduce((acc, curr) => {
      return [...acc, curr.genre]
    }, [])

    const finResult = result
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((el) => {
        return (<div key={`genre-${el}`}>
          <button onClick={() => filterByGenre(el)}>
            {el}
          </button>
        </div>)
      })

    return (
      <div className="filter-genre-dropdown">
        <div key={"genre-revert"}><button onClick={() => setData(originalData)}>Remove Filters</button></div>
        {finResult}
      </div>
    )
  }

useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isActive])

  function filterByGenre(genre) {
    const result = originalData.filter((movie) => movie.genre === genre);
    setData(result);
  }

  const [titleFilter, setTitleFilter] = useState("");

  function handleTitleFilterChange(event) {
    setTitleFilter(event.target.value);
  }

  function filterByTitle() {
    const result = originalData.filter((movie) => {
      return movie.title.search(titleFilter) >= 0 || movie.description.search(titleFilter) >= 0

    });
    setData(result)
  }

  return (
    <div className="filter-container">
      <div className="filter-by-genre">
        <button onClick={showMenu} className="filter-menu-trigger">
          Genre Options
        </button>
        <div ref={dropdownRef} className={`menu-filter ${isActive ? 'active' : 'inactive'}`}>
          <ActiveGenres/>
        </div>
      </div>

      <div className="filter-by-rating">
          <label>
            <p>Number of Stars:</p>
            <select value={starFilter} onChange={handleStarFilterChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <button onClick={handleRatingSubmit}>OK</button>
      </div>

      <div className="filter-by-title">
        <label>
          <p>Movie Title:</p>
          </label>
        <input onChange={handleTitleFilterChange}></input>
        <button onClick={filterByTitle}>OK</button>
      </div>
    </div>
  )
}

export default FilterParameters;
