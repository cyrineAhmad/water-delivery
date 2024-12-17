import React from "react";
import classes from './notFound.module.css';
import { Link } from "react-router-dom";

export default function NotFound({
  message = 'Nothing Found!',
  LinkRoute = '/',
  LinkText = 'Go to Home Page'
}) {
  return (
    <div className={classes.container}>
      {message}
      <Link to={LinkRoute}>{LinkText}</Link>
    </div>
  );
}
