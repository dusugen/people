import React from "react";

import styles from "./NotFound.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not Found
      </h1>
    </div>
  );
}

export default NotFoundBlock;
