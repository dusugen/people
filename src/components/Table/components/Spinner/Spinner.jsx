import React from "react";
import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.root}`}
    >
      <div className=" spinner-border " role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
