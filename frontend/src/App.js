import React, { Component } from "react";
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Artists from "./Artists";
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/artists">Artists</NavLink></li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" component={Home} />
              <Route path="/artists" component={Artists} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;