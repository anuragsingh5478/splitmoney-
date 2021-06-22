import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import useToken from "./useToken";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import Profile from "./profile/Profile";
import CreateNewGroup from "./components/createNewGroup/CreateNewGroup";
import ViewGroup from "./components/viewGroup/ViewGroup";
import "bootstrap/dist/css/bootstrap.min.css";

export const AuthContext = React.createContext();

function App() {
  const { token, setToken, logout } = useToken();

  if (!token) {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/register">
              <Register setToken={setToken} />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }
  return (
    <AuthContext.Provider value={token}>
      <Router>
        <div className="App">
          <Navbar logout={logout} />

          <Switch>
            <Route path="/homepage">
              <Homepage />
            </Route>
            <Route path="/create-new-group">
              <CreateNewGroup />
            </Route>
            <Route path="/group/:groupId">
              <ViewGroup />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Redirect to="/homepage" />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
