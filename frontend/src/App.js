import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Artists from "./Artists";

import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/artists">Artists</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/" component={Home} />
            <Route path="/artists" component={Artists} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;