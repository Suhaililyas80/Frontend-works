import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Logout from "./components/Logout/Logout";
import UserActivities from "./components/UserActivities/UserActivities";
import { isAuthenticated } from "./api"; // Assuming this function checks authentication status

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <PrivateRoute path="/Dashboard" component={Dashboard} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/UserActivities" component={UserActivities} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

// Add this PrivateRoute component above or below App
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default App;
