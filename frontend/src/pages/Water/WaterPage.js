import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './waterPage.module.css';
import { getAll, getById } from '../../services/waterService';
import StarRating from '../../components/StarRating/StarRating';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';

export default function WaterPage() {
  const [waters, setWaters] = useState([]);
  const [water, setWater] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getById(id).then(setWater);
    } else {
      getAll().then(setWaters);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (water && water._id) {
      addToCart(water);
      navigate('/cart');
    }
  };

  if (!id && waters.length === 0) {
    return <NotFound message="No waters found!" />;
  }

  if (id && !water) {
    return <NotFound message="Water not found!" />;
  }

  return (
    <>
      {id ? (
        <div className={classes.container}>
          <img className={classes.image} src={water.imageUrl} alt={water.name} />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{water.name}</span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={water.stars} size={25} />
            </div>
            <div className={classes.origins}>
              {water.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className={classes.price}>
              <Price price={water.price} />
            </div>
            <div className={classes.description}>
              <p className="description">{water.description}</p>
            </div>

            <div className={classes.offer}>
              <p>Buy 1 Gallon and get a free bottle!</p>
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          {waters.map((water) => (
            <div key={water.id} className={classes.waterItem} onClick={() => navigate(`/water/${water.id}`)}>
              <img src={water.imageUrl} alt={water.name} className={classes.image} />
              <h3>{water.name}</h3>
              <p>{water.price} USD</p>
              <StarRating stars={water.stars} size={20} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
