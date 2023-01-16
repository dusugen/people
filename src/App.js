import './App.css';
import Table from "./components/Table/Table";
import React from "react";
import Filters from "./components/Filters/Filters";

function App() {
  return (
    <div className="container">
      <h1 className={'display-3 fw-bold text-center mb-4'}>People</h1>
      <div className="row">
        <div className={`col-8`}>
          <Table/>
        </div>
        <Filters/>
      </div>
    </div>);
}

export default App;
