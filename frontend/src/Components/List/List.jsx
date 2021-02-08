import React from "react";
import "./List.scss";

const List = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No repos</p>
  return (
    <ul>
      <h2 className="list-head">List!!</h2>
      {repos.map((repo) => {
        return (
          <li key={repo.id} className='list'>
            <span className="list-title">{repo.Title}</span>
            <span className="list-desc">{repo.desc}</span>
          </li>
        );
      })}
    </ul>
  )
}

export default List;