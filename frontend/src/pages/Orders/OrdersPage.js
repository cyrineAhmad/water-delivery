import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/orderService';
import classes from './OrdersPage.module.css';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                const data = await getAll('');
                setOrders(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return <div className={classes.loading}>Loading orders...</div>;
    }

    if (error) {
        return <div className={classes.error}>Error: {error}</div>;
    }

    return (
        <div className={classes.ordersPage}>
            <header className={classes.ordersHeader}>
                <h1>Your Orders</h1>
            </header>
            {orders.length > 0 ? (
                <div className={classes.ordersContainer}>
                    {orders.map((order) => (
                        <div key={order._id} className={classes.orderCard}>
                            <div className={classes.orderHeader}>
                                <h2 className={classes.orderId}>Order ID: #{order._id}</h2>
                            </div>
                            <div className={classes.orderDetails}>
                                <div>
                                    <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                                </div>
                                <div>
                                    <strong>Address:</strong> {order.address}
                                </div>
                                  <div>
                                    <strong>Status:</strong>
                                    <span className={`${classes.orderStatus} ${order.status === 'PAYED' ? classes.payedStatus : ''}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div>
                                    <strong>Items:</strong>
                                    <ul>
                                        {order.items.map((item) => (
                                            <li key={item.id}>
                                                {item.water.name} x {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={classes.noOrders}>No orders found.</p>
            )}
        </div>
    );
}