import React from 'react';
import {Button} from "react-bootstrap";
import styles from "./Filters.module.scss"

function Filters(props) {
  const handleReset = () => {
    setName('');
    setEmail('');
    setGender('')
    setActiveStatus(false)
    setInActiveStatus(false)
  }

  const {
          name,
          setName,
          email,
          setEmail,
          setGender,
          activeStatus,
          setActiveStatus,
          inActiveStatus,
          setInActiveStatus
        } = props
  return (
    <div className={`col-lg-3  ${styles.main}`}>
      <h3 className={`fw-bolder text-center`}>Filters</h3>
      <input className={`form-control mb-3`} placeholder={`Name`}
             value={name}
             onChange={e => setName(e.target.value)}/>
      <input className={`form-control mb-3`} placeholder={`Email`}
             value={email}
             onChange={e => setEmail(e.target.value)}/>
      <select className={`form-select mb-4`} aria-label={`Default select example`}
              onChange={event => setGender(event.target.value)}>
        <option value={``}>Choose your gender</option>
        <option value={`male`}>Male</option>
        <option value={`female`}>Female</option>
      </select>
      <div className={`mb-4`}>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="activeCheckbox" value="active"
                 checked={activeStatus} onChange={() => {
            setActiveStatus(!activeStatus)
          }}/>
          <label className="form-check-label" htmlFor="inlineCheckbox1">Active</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inActiveCheckbox"
                 checked={inActiveStatus} onChange={() => setInActiveStatus(!inActiveStatus)} value="inactive"/>
          <label className="form-check-label" htmlFor="inlineCheckbox2">Inactive</label>
        </div>
      </div>
      <Button className={` btn-danger btn-lg`} onClick={handleReset}>Reset</Button>
    </div>);
}

export default Filters;