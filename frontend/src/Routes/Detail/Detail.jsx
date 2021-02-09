import React, { useEffect, useState } from "react";
import {
  useParams,
} from "react-router-dom";
import withListLoading from "../../Components/WithListLoading";
import axios from "axios";
import "./Detail.scss";

const DetailView = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No repos</p>;
  return (
    <ul>
      <h2 className="list-head">List!!</h2>
      {repos.map((repo, index) => {
        return (
          <div key={`containerKey ${index}`}>
            <li key={`listKey ${index}`} className='list' >
              <div key={`listTitle ${index}`} className="list-title">{repo.title}</div>
              <div key={`listDesc ${index}`} className="list-desc">{repo.desc}</div>
              <div key={`listCont ${index}`} className="list-cont">{repo.content}</div>
            </li>
          </div>
        );
      })}
    </ul >
  );
};

export default function Detail() {
  let { id } = useParams();

  const ListLoading = withListLoading(DetailView);
  const [detailState, setDetailState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setDetailState({ loading: true });
    const apiUrl = `/article/${id}`;
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos.data;
      setDetailState({ loading: false, repos: allRepos });
    }).catch((err) => console.log(err));
  }, [setDetailState]);

  return (
    <div className='Container'>
      <ListLoading isLoading={detailState.loading} repos={detailState.repos} />
    </div>
  )
}
