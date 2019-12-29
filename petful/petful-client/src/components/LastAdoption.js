import React from 'react';

export default function LastAdoption(props) {
  return (
    <>
      <p>
        Congratulations to {props.adoptee} for adopting {props.adopted}
      </p>
    </>
  );
}
