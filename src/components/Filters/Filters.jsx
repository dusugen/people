import React from 'react';
import {Button} from "react-bootstrap";

function Filters(props) {
  return (
    <div className="col-3 ms-5">
      <h3 className={`fw-bolder text-center`}>Filters</h3>
      <input className={`form-control mb-3`} placeholder={`Name`}/>
      <input className={`form-control mb-3`} placeholder={`Email`}/>
      <select className={`form-select mb-4`} aria-label={`Default select example`}>
        <option selected disabled>Choose your gender</option>
        <option value={`male`}>Male</option>
        <option value={`female`}>Female</option>
      </select>
      <Button className={`d-block btn-danger btn-lg`}>Reset</Button>
    </div>
  );
}

export default Filters;