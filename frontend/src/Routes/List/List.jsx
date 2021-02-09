import React, { useEffect, useState, useCallback } from "react";
import {
  Link,
  // useRouteMatch,
} from "react-router-dom";
import withListLoading from "../../Components/WithListLoading";
import axios from "axios";
import "./List.scss";

const ListView = (props) => {
  // let { url } = useRouteMatch();
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No repos</p>;
  return (
    <ul>
      <h2 className="list-head">List!!</h2>
      {repos.map((repo, index) => {
        return (
          <div key={`containerKey ${index}`} className="list-container">
            <div key={`listKey ${index}`} className='list' >
              <Link to={`article/${repo.Id}`} className="list-title">{repo.Title}</Link>
              <div key={`listDesc ${index}`} className="list-desc">{repo.desc}</div>
              <div key={`listCont ${index}`} className="list-cont">{repo.content}</div>
            </div>
          </div>
        );
      })}
    </ul >
  );
};

export default function List() {
  const ListLoading = withListLoading(ListView);
  const [listState, setListState] = useState({
    loading: false,
    repos: null,
  });

  const fetchApi = useCallback(async () => {
    const apiUrl = '/articles/';
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos.data;
      setListState({ loading: false, repos: allRepos });
    }).catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    setListState({ loading: true });
    fetchApi();
  }, [setListState, fetchApi]);

  return (
    <div className='Container'>
      <ListLoading isLoading={listState.loading} repos={listState.repos} />
      <button onClick={fetchApi}>Reset</button>
    </div>
  )
}
