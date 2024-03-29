import React, { useEffect, useState, useCallback } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import withListLoading from "../../Components/WithListLoading";
import axios from "axios";
// import "./Detail.scss";

interface IDetail {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface IState {
  isLoading: boolean;
  articles?: Array<IDetail> | null;
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
            <h2 className="detail-head">{article.title}</h2>
            <div key={`detailKey ${index}`} className='detail' >
              <div key={`detailDesc ${index}`} className="detail-desc">{article.description}</div>
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
  let history = useHistory();

  const ListLoading = withListLoading(DetailView);
  const [detailState, setDetailState] = useState<IState>({
    isLoading: false,
    articles: null,
  });

  const fetchApi = useCallback(async () => {
    const apiUrl = `/article/${id}`;
    axios.get<Array<IDetail>>(apiUrl).then(response => {
      const allArticle = response.data;
      setDetailState({ isLoading: false, articles: allArticle });
    }).catch((err) => console.log(err));
  }, [id]);

  const deleteApi = async () => {
    const apiUrl = `/article/${id}`;
    await axios.delete(apiUrl).then(response => {
      console.log(response);
      history.push("/articles");
    });
  }

  useEffect(() => {
    setDetailState({ isLoading: true });
    fetchApi();
  }, [setDetailState, fetchApi]);

  return (
    <div className='Container'>
      <ListLoading isLoading={detailState.isLoading} articles={detailState.articles} />
      <button onClick={fetchApi}>Reset</button>
      <button onClick={deleteApi}>Delete</button>
    </div>
  )
}
