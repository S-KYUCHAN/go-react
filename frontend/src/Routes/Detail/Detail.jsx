import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
} from "react-router-dom";
import withListLoading from "../../Components/WithListLoading";
import axios from "axios";
import "./Detail.scss";

const DetailView = (props) => {
  const { articles } = props;
  if (!articles || articles.length === 0) return <p>No articles</p>;
  return (
    <ul>
      {articles.map((article, index) => {
        return (
          <div key={`containerKey ${index}`} className="detail-container">
            <h2 className="detail-head">{article.Title}</h2>
            <div key={`detailKey ${index}`} className='detail' >
              <div key={`detailDesc ${index}`} className="detail-desc">{article.desc}</div>
              <div key={`detailCont ${index}`} className="detail-cont">{article.content}</div>
            </div>
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
    articles: null,
  });

  const fetchApi = useCallback(async () => {
    const apiUrl = `/article/${id}`;
    axios.get(apiUrl).then((articles) => {
      const allArticle = articles.data;
      setDetailState({ loading: false, articles: allArticle });
    }).catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setDetailState({ loading: true });
    fetchApi();
  }, [setDetailState, fetchApi]);

  return (
    <div className='Container'>
      <ListLoading isLoading={detailState.loading} articles={detailState.articles} />
      <button onClick={fetchApi}>Reset</button>
    </div>
  )
}
