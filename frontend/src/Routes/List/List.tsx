import React, { useEffect, useState, useCallback } from "react";
import {
  Link,
  // useRouteMatch,
} from "react-router-dom";
import withListLoading from "../../Components/WithListLoading";
import axios from "axios";
// import "./List.scss";

interface IList {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface IState {
  isLoading: boolean;
  repos?: Array<IList> | null;
}

function ListView(props: IState) {
  // let { url } = useRouteMatch();
  const repos = props.repos;
  if (!repos || repos?.length === 0) return <p>No data</p>;
  return (
    <ul>
      <h2 className="list-head">List!!</h2>
      {repos.map((repo, index) => {
        return (
          <div key={`containerKey ${index}`} className="list-container">
            <div key={`listKey ${index}`} className='list' >
              <Link to={`article/${repo.id}`} className="list-title">{repo.title}</Link>
              <div key={`listDesc ${index}`} className="list-desc">{repo.description}</div>
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
  const [listState, setListState] = useState<IState>({
    isLoading: false,
    repos: null,
  });

  const fetchApi = useCallback(async () => {
    const apiUrl = '/articles/';
    axios.get<Array<IList>>(apiUrl).then(response => {
      setListState({ isLoading: false, repos: response.data });
    }).catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    setListState({ isLoading: true, repos: null });
    fetchApi();
  }, [setListState, fetchApi]);

  return (
    <div className='Container'>
      <ListLoading isLoading={listState.isLoading} repos={listState.repos} />
      <button onClick={fetchApi}>Reset</button>
    </div>
  )
}
