import React from "react";
import './App.css';

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      <Router>
        {!user ? (            
          <Login/>
        ) : (
          <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/conversation/:roomId">
                <Main user={user} channelType={"channels"} />
              </Route>
              <Route path="/private/:roomId">
                <Main user={user} channelType={"private"} />
              </Route>
              <Route path="/">
                <h2>Pick a channel to start a conversation or create your own</h2>
              </Route>
            </Switch>
          </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
