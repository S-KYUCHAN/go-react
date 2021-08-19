import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface ICreate {
  Title: string;
  description: string;
  content: string;
}

export default function Create() {
  const [createState, setCreateState] = useState<ICreate>({
    Title: "",
    description: "",
    content: ""
  });

  let history = useHistory();

  const postApi = async () => {
    const apiUrl = `/article`;
    await axios.post(
                      apiUrl, JSON.stringify(createState), {
                        headers:{
                          'Conetent-type': 'application/jason',
                          'Accept': 'application/json'
                        }
                      }).then(response => {
                        console.log(response);
                        history.push("/articles");
                      });
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateState({...createState, [name]:value })
  };
  
  const handleSubmit = (event:React.FormEvent) => {
    console.log(createState);
    postApi();
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <input 
        type="text"
        name="Title"
        value={createState.Title}
        onChange={handleChange}
      />
      <input 
        type="text"
        name="description"
        value={createState.description}
        onChange={handleChange}
      />
      <input 
        type="text"
        name="content"
        value={createState.content}
        onChange={handleChange}
      />
      <button type="submit">create</button>
    </form>
  )
}