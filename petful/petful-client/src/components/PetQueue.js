import React from 'react';

export default function PetQueue(props) {
  let first = null;
  if (props.q.first) first = props.q.first.value;
  console.log(props);
  console.log(first);
  return (
    <>
      <h2>Currently Up For Adoption</h2>
      <img className="PetQueue__currentImg" src={first.imageURL} alt="pet images"></img>
      <h3>Info: </h3>
      <ul>
        <li>name: {first.name}</li>
        <li>sex: {first.sex}</li>
        <li>age: {first.age}</li>
        <li>breed: {first.breed}</li>
        <li>since: {first.date}</li>
        <li>story: {first.story}</li>
      </ul>
    </>
  );
}
