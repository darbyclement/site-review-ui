import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar.jsx"
import Signin from "./components/Signin.jsx"
import Signup from "./components/Signup.jsx"
import Welcome from "./components/Welcome.jsx"
import Dashboard from "./components/Dashboard.jsx"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        { /*
        <nav>
          <ul>
            <li>
              <Link to="/">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>
        */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
        <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
