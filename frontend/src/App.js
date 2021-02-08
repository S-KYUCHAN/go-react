import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./Components/Header/Header"
import List from "./Components/List/List"
import withListLoading from "./Components/WithListLoading";
import axios from "axios";

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = '/articles/';
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos.data;
      setAppState({ loading: false, repos: allRepos });
    }).catch((err) => console.log(err));
  }, [setAppState]);
  return (
    <div className='App'>
      <Header />
      <div className='Container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     console.log("App start");
//   }

//   hello() {
//     console.log("hello");
//   }

//   render() {
//     return (
//       <div className="App" >
//         <Header />
//         <button onClick={this.hello}>Click</button>
//       </div>
//     );
//   }
// }

export default App;
