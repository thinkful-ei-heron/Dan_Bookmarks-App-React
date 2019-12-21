import React from 'react';

export default function Adopted(props) {
  return (
    <>
      <h3>Congratulations</h3>
      <p>You adopted {props.adoptee.name} </p>
    </>
  );
}
