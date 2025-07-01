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
import AllTasks from "./components/AllTasks/Alltasks";
import { CreateTasks } from "./components/CreateTasks/CreateTasks";
import { VmockDashboard } from "./components/VmockDashboard/VmockDashboard";
import Layout from "./components/Layout/Layout";
import { NotifyUser } from "./components/NotifyUser";

function App() {
  return (
    <Router>
      <>
        <NotifyUser userId={77} />
      </>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route
            path="/AllTasks"
            render={() => (
              <Layout>
                <AllTasks />
              </Layout>
            )}
          />
          <Route
            path="/UserActivities"
            render={() => (
              <Layout>
                <UserActivities />
              </Layout>
            )}
          />
          <Route
            path="/Dashboard"
            render={() => (
              <Layout>
                <Dashboard />
              </Layout>
            )}
          />
          {/* Add more routes as needed */}
          <Route path="/createtask" component={CreateTasks} />
          <Route path="/VmockDashboard" component={VmockDashboard} />
          <Route path="/Layout" component={Layout} />
          {/* Redirect from root to login */}
          {/* Private routes */}
          {/* <PrivateRoute path="/Dashboard" component={Dashboard} /> */}
          <PrivateRoute path="/logout" component={Logout} />̀
          {/* <Redirect from="/" to="/login" /> */}
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
