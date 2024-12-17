import { Link } from 'react-router-dom';
import React from 'react';
import classes from './thumbnails.module.css';
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';

export default function Thumbnails({ waters }) {
  return (
    <ul className={classes.list}>
      {waters.map(water => (
        <li key={water.id} className={classes.card}>
          <div className={classes.cardWrapper}>
            <div className={classes.imageWrapper}>
              <img
                className={classes.image}
                src={water.imageUrl}
                alt={water.name}
              />
            </div>
            <div className={classes.content}>
              <div className={classes.name}>{water.name}</div>
              <div className={classes.stars}>
                <StarRating stars={water.stars} />
              </div>
              <div className={classes.price}>
                <Price price={water.price} />
              </div>
            </div>
            <div className={classes.view}>
              <Link to={`/water/${water.id}`} className={classes.detailsLink}>
                View Details
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
