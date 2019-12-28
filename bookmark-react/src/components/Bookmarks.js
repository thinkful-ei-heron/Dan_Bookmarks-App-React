import React from 'react';
import { Link } from 'react-router-dom';
import Expand from './Expand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Bookmarks(props) {
  const stars = [
    String.fromCharCode(9733, 9734, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9733)
  ];

  let plusMinus;
  if (props.bm.expanded) plusMinus = <FontAwesomeIcon icon={faMinus} className="icon" tabIndex="0" />;
  else plusMinus = <FontAwesomeIcon icon={faPlus} className="icon" tabIndex="0" />;
  return (
    <li className="site">
      <div className="bookmarkHeader">
        <button className="plusMinus" onClick={e => props.handleExpandEvent(props.bm.id)}>
          {plusMinus}
        </button>
        <div className="siteInfo">
          <h3>{props.bm.title}</h3>
          <p className="rating">{stars[props.bm.rating - 1]}</p>
        </div>
        <div className="siteButtons">
          <Link to={`/edit/${props.bm.id}`}>
            <button className="editBookmark">
              <FontAwesomeIcon icon={faEdit} className="icon" />
            </button>
          </Link>
          <button className="deleteBookmark" onClick={e => props.handleDeleteEvent(props.bm.id)}>
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
        </div>
      </div>
      {props.bm.expanded ? <Expand url={props.bm.Bookmarksurl} desc={props.bm.description} /> : ''}
    </li>
  );
}
