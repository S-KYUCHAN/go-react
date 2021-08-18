import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
} from "react-router-dom";
import withListLoading from "../../Components/WithListLoading";
import axios from "axios";
// import "./Detail.scss";

interface Detail {
  Id: string;
  Title: string;
  desc: string;
  content: string;
}

interface IState {
  isLoading: boolean;
  articles?: Array<Detail> | null;
}

interface ParamTypes {
  id: string
}

const DetailView = (props: IState) => {
  const articles = props.articles;
  if (!articles || articles?.length === 0) return <p>No article</p>;
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
  let { id } = useParams<ParamTypes>();

  const ListLoading = withListLoading(DetailView);
  const [detailState, setDetailState] = useState<IState>({
    isLoading: false,
    articles: null,
  });

  const fetchApi = useCallback(async () => {
    const apiUrl = `/article/${id}`;
    axios.get<Array<Detail>>(apiUrl).then(response => {
      const allArticle = response.data;
      setDetailState({ isLoading: false, articles: allArticle });
    }).catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setDetailState({ isLoading: true });
    fetchApi();
  }, [setDetailState, fetchApi]);

  return (
    <div className='Container'>
      <ListLoading isLoading={detailState.isLoading} articles={detailState.articles} />
      <button onClick={fetchApi}>Reset</button>
    </div>
  )
}
