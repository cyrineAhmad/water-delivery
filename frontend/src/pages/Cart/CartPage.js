import React from 'react';
import { useCart } from '../../hooks/useCart';
import classes from './cartPage.module.css';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';

export default function CartPage() {
    const { cart, removeFromCart, changeQuantity } = useCart();

    return (
        <>
            <div className={classes.banner}>
                <h2>Sahten in advance! 🥤 You're about to quench your thirst in style!</h2>
            </div>
            {cart.items.length === 0 ? (
                <NotFound message="Your cart is empty! Time to add some hydration to your life." />
            ) : (
                <div className={classes.container}>
                    <ul className={classes.list}>
                        {cart.items.map((item) => (
                            <li key={item.water.id}>
                                <div>
                                    <img src={`${item.water.imageUrl}`} alt={item.water.name} />
                                </div>
                                <div>
                                    <Link to={`/water/${item.water.id}`}>{item.water.name} 💧</Link>
                                </div>
                                <div>
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => changeQuantity(item, Number(e.target.value))}
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Price price={item.price} />
                                </div>
                                <div>
                                    <button
                                        className={classes.remove_button}
                                        onClick={() => removeFromCart(item.water.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={classes.checkout}>
                        <div>
                            <div className={classes.waters_count}>{cart.totalCount}</div>
                            <div className={classes.total_price}>
                                <Price price={cart.totalPrice} />
                            </div>
                        </div>
                        <Link to="/checkout">Proceed To Checkout</Link>

                    </div>
                </div>
            )}
        </>
    );
}
