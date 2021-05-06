import React from "react";
import './App.css';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Channels from "./components/Channels";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app__body">
        <Sidebar />
        <Channels/>
      </div>
    </div>
  );
}

export default App;
