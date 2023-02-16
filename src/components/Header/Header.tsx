import React from "react";
import styles from "../UsersTable/UsersTable.module.scss";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light  justify-content-between ">
      <div className="container-fluid p-0 mb-1 flex-nowrap">
        <Link
          className="navbar-brand fw-bolder me-0 p-0 d-flex align-items-center"
          to="/"
        >
          <img
            className={styles.logoImg}
            src="https://cdn.dribbble.com/users/3494217/screenshots/6423133/01_preview.jpg?compress=1&resize=768x576&vertical=top"
            alt=""
          />
          <span className={`h1`}>People</span>
        </Link>
        <div>
          <Link
            className={`btn btn-outline-primary me-4 ${
              pathname === "/" ? "active" : ""
            }`}
            type="button"
            to={`/`}
          >
            Users list
          </Link>
          <Link
            className={`btn btn-outline-success ${
              pathname === "/addUser" ? "active" : ""
            }`}
            type="button"
            to={`/addUser`}
          >
            Add user
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
