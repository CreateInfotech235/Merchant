import React from "react";
import './Breadcrumb.css'
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/dashboard").filter((x) => x);

  return (<>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/dashboard")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
              {isLast ? (
                name.slice(1,name.length)[0].toUpperCase() +
                name.slice(2 , name.length)
              ) : (
                <Link to={routeTo}>{name}</Link>
              
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
};

export default Breadcrumb;
