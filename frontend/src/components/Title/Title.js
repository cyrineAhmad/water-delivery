import React from 'react';
import classes from './title.module.css';

export default function Title({ title, size = 'medium', margin }) {
  let className = classes.title;
  if(size === 'large') className += ` ${classes['title--large']}`;
  if(size === 'medium') className += ` ${classes['title--medium']}`;
  return <h1 className={className} style={{ margin }}>{title}</h1>;
}