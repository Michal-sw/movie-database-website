/* eslint-disable react/prop-types */

import { React,  useEffect,  useRef, useState } from "react";


function SortListButtons({data, setData}) {

  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const showMenu = () => setIsActive(!isActive);

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

  function sortAlphabetically() {
    const dummyList = [...data]
    dummyList.sort((first, second) => {
      return (first.title > second.title) ? 1 : -1
    })
    setData(dummyList);
  }

  function sortByOldest() {
    const dummyList = [...data]
    dummyList.sort((first, second) => {
      return (first.year > second.year) ? 1 : -1
    })

    setData(dummyList);
  }

  function sortByNewest() {
    const dummyList = [...data]
    dummyList.sort((first, second) => {
      return (first.year < second.year) ? 1 : -1
    })

    setData(dummyList);
  }

  function sortByMostRated() {
    const dummyList = [...data]
    dummyList.sort((first, second) => {
      return (first.rating_count < second.rating_count) ? 1 : -1
    })

    setData(dummyList);
  }

  function sortByBestRated() {
    const dummyList = [...data]
    dummyList.sort((first, second) => {
      return (first.rating < second.rating) ? 1 : -1
    })

    setData(dummyList);
  }

  return (
    <div className="sort-by-container">
      <button onClick={showMenu} className="sort-menu-trigger">
        Sort Options
      </button>

      <div ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>

        <div className="sort-by">
          <button onClick={sortAlphabetically}>Sort Alphabetically!</button>
        </div>

        <div className="sort-by">
          <button onClick={sortByOldest}>Sort By Oldest!</button>
        </div>

        <div className="sort-by">
          <button onClick={sortByNewest}>Sort By Newest!</button>
        </div>

        <div className="sort-by">
          <button onClick={sortByMostRated}>Sort By Most Rated!</button>
        </div>

        <div className="sort-by">
          <button onClick={sortByBestRated}>Sort By Best Rated!</button>
        </div>

      </div>
    
    </div>
  )
}

export default SortListButtons;