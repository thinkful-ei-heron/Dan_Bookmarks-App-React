import React from 'react';
import { Link } from 'react-router-dom';

export default function BookmarkControls(props) {
  const stars = [
    String.fromCharCode(9733, 9734, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9733)
  ];

  return (
    <div className="headerActions">
      <Link to="/addBookmark">
        <button className="newBookmark">New</button>
      </Link>
      <div>
        <label htmlFor="filter">Filter</label>
        <select className="filter" id="filter" value={props.filter} onChange={props.handleFilterEvent}>
          <option value="1">{stars[0]}</option>
          <option value="2">{stars[1]}</option>
          <option value="3">{stars[2]}</option>
          <option value="4">{stars[3]}</option>
          <option value="5">{stars[4]}</option>
        </select>
      </div>
    </div>
  );
}
