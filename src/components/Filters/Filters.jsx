import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import styles from "./Filters.module.scss";
import { Link } from "react-router-dom";

const Filters = React.memo(function Filters({ onFiltering, filters }) {
  const handleReset = useCallback(() => {
    onFiltering({
      name: "",
      email: "",
      gender: "",
      activeStatus: false,
      inActiveStatus: false,
    });
  }, [filters]);

  return (
    <div className={`col-lg-3  ${styles.main}`}>
      <h3 className={`fw-bolder text-center`}>Filters</h3>
      <input
        className={`form-control mb-3`}
        placeholder={`Name`}
        value={filters.name}
        onChange={(e) => onFiltering({ name: e.target.value })}
      />
      <input
        className={`form-control mb-3`}
        placeholder={`Email`}
        value={filters.email}
        onChange={(e) => onFiltering({ email: e.target.value })}
      />
      <select
        className={`form-select mb-4`}
        aria-label={`Default select example`}
        onChange={(e) => onFiltering({ gender: e.target.value })}
      >
        <option value={``}>Choose your gender</option>
        <option value={`male`}>Male</option>
        <option value={`female`}>Female</option>
      </select>
      <div className={`mb-4`}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="activeCheckbox"
            value="active"
            checked={filters.activeStatus}
            onChange={() => {
              onFiltering({ activeStatus: !filters.activeStatus });
            }}
          />
          <label className="form-check-label" htmlFor="activeCheckbox">
            Active
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inActiveCheckbox"
            checked={filters.inActiveStatus}
            onChange={() => {
              onFiltering({ inActiveStatus: !filters.inActiveStatus });
            }}
            value="inactive"
          />
          <label className="form-check-label" htmlFor="inActiveCheckbox">
            Inactive
          </label>
        </div>
      </div>
      <Button className={` btn-danger btn-lg`} onClick={handleReset}>
        <Link className={styles.link} to={"/"}>
          Reset
        </Link>
      </Button>
    </div>
  );
});

export default Filters;
