import axios from "axios";
import React, { useState } from "react";

interface Create {
  Title: string;
  description: string;
  content: string;
}


export default function Create() {
  const [createState, setCreateState] = useState<Create>({
    Title: "",
    description: "",
    content: ""
  });

  const postApi = async () => {
    const apiUrl = `/article`;
    const response = await axios.post(
                      apiUrl, JSON.stringify(createState), {
                        headers:{
                          'Conetent-type': 'application/jason',
                          'Accept': 'application/json'
                        }
                      }).then(response => console.log(response));
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