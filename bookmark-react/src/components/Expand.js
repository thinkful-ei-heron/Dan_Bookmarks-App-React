import React from 'react';

export default function Expand(props) {
  return (
    <div className="siteExpansion">
      <a href={props.url}>Visit Site</a>
      <p>{props.desc}</p>
    </div>
  );
}
