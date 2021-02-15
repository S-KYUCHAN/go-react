import React from "react";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
} from "react-router-dom";
import List from "./Routes/List/List";
import Detail from "./Routes/Detail/Detail";
import Header from "./Components/Header/Header"

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/articles" component={List} />
      <Route path="/article/:id" component={Detail} />
      {/* <Redirect exact path="/" to="/articles" /> */}
    </Router>
  )
}

export default App;
