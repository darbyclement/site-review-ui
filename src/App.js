import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signin from "./components/Signin.jsx"
import Signup from "./components/Signup.jsx"
<<<<<<< HEAD
import Welcome from "./components/Welcome.jsx"
=======
>>>>>>> 319beb69d3a78d2f556227ddb3c85ed3a9c29978

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
        <Switch>
<<<<<<< HEAD
          <Route exact path="/">
            <Welcome />
          </Route>
=======
>>>>>>> 319beb69d3a78d2f556227ddb3c85ed3a9c29978
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
