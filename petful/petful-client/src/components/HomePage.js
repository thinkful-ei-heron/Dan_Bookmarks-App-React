import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../images/homeImage.jpg';

export default function HomePage(props) {
  return (
    <>
      <img src={homeImage} alt="cute puppy"></img>
      <p>testing</p>
      <Link to="/adopt">
        <button>Adopt Now</button>
      </Link>
    </>
  );
}
