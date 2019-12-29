import React from 'react';

export default function Line(props) {
  return (
    <>
      <h3>Currently in line: </h3>
      <ul className="Line_ul">{getLi(props.queue)}</ul>
    </>
  );
}

function getLi(q) {
  if (!q || !q.first) return <li>The line is empty</li>;
  let currNode = q.first;
  let jsx = [];
  while (currNode) {
    jsx.push(<li>{currNode.value.name}</li>);
    currNode = currNode.next;
  }
  return jsx;
}
