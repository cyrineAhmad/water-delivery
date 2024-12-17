import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { createOrder, pay } from '../../services/orderService';
import Title from '../../components/Title/Title';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [paymentId, setPaymentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const orderData = location.state?.orderData;

    useEffect(() => {
        if (!orderData) {
            toast.error('No order data was found, please try again!');
            navigate('/checkout');
        } else {
            setOrder(orderData);
        }
    }, [location.state, navigate, orderData]);

    const handlePayment = async () => {
        if (!order) return;

        setLoading(true);
        try {
            const fullOrder = {
                ...order,
                paymentMethod: paymentMethod,
            };

            await createOrder(fullOrder); 

            if (paymentMethod === 'card') {
                await pay(paymentId, paymentMethod);
            } else {
                await pay("N/A", paymentMethod);
            }
             toast.success('Payment successful!');
            navigate('/');
        } catch (error) {
            setError(error.message);
            toast.error(`Payment failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!order) return null;

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title="Your Order" fontSize="1.6rem" />
                <div className={classes.summary}>
                    <div>
                        <h3>Name:</h3>
                        <span>{order.name}</span>
                    </div>
                    <div>
                        <h3>Address:</h3>
                        <span>{order.address}</span>
                    </div>
                </div>
                <OrderItemsList order={order} />

                <div className={classes.paymentMethods}>
                    <Title title="Select Payment Method" fontSize="1.6rem" />
                    <div className={classes.paymentOption}>
                        <input
                            type="radio"
                            id="cash"
                            name="paymentMethod"
                            value="cash"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked={paymentMethod === 'cash'}
                        />
                        <label htmlFor="cash">Cash on Delivery</label>
                    </div>
                    <div className={classes.paymentOption}>
                        <input
                            type="radio"
                            id="card"
                            name="paymentMethod"
                            value="card"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked={paymentMethod === 'card'}
                        />
                        <label htmlFor="card">Credit Card</label>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className={classes.paymentIdInput}>
                            <p>This is a simulated credit card payment. This order will be processed with cash on delivery</p>
                            <input
                                type="text"
                                id="paymentId"
                                value={paymentId}
                                onChange={(e) => setPaymentId(e.target.value)}
                                placeholder="Enter card number "
                            />
                        </div>
                    )}

                    {error && <div className={classes.error}>{error}</div>}

                    <button className={classes.payButton} onClick={handlePayment} disabled={loading}>
                        {loading ? 'Processing Payment...' : 'Pay Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}