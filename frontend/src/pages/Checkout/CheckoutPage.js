import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Title from '../../components/Title/Title';
import './checkoutPage.css';
import RefillRequestModal from '../../components/RefillRequestModal/RefillRequestModal';
import axios from 'axios';

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [totalPrice, setTotalPrice] = useState(cart.totalPrice);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [deliveryPreference, setDeliveryPreference] = useState('');
  const [scheduleDay, setScheduleDay] = useState('');
  const [scheduleTimePeriod, setScheduleTimePeriod] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    let newTotal = cart.totalPrice;
    if (scheduleType === 'fixed' && frequency > 1) {
      newTotal *= frequency;
      toast.info(`Total updated for ${frequency} deliveries per month!`);
    }

    if (cart.items.some(item => item.needsRefill)) {
      const refillDiscount = 0.1;
      newTotal *= 1 - refillDiscount;
      toast.info('Refill discount applied!');
    }

    setTotalPrice(newTotal.toFixed(2));
  }, [scheduleType, frequency, cart.totalPrice, cart.items]);


  const handleRefillSubmit = async (data) => {
    if (!user?.id) {
        toast.error('User not authenticated!');
        return;
    }

    try {
        const refillData = {
            userId: user.id,
            brandName: data.brandName,
            quantity: data.quantity,
            containerType: data.containerType,
            comments: data.comments,
        };

        const response = await axios.post('/api/refills', refillData);

        if (response.status === 201) {
            toast.success('Your refill request has been submitted. We will contact you shortly.');
        } else if (response.status === 400) {
            toast.error('Invalid refill request data.');
        } else {
            toast.error('There was an error submitting your refill request.');
        }
    } catch (error) {
        console.error('Error submitting refill request:', error);
        toast.error('There was an error submitting your refill request. Please try again later.');
    } finally {
        setShowRefillModal(false);
    }
};

  const generateTimeOptions = () => {
    return [
      <option key="morning" value="morning">Morning (7 AM - 12 PM)</option>,
      <option key="afternoon" value="afternoon">Afternoon (12 PM - 5 PM)</option>,
      <option key="evening" value="evening">Evening (5 PM - 8 PM)</option>,
    ];
  };


    const submit = async (data) => {
      if (!scheduleType || !frequency || !deliveryPreference) {
        toast.warning('All fields are required to be filled!');
        return;
      }


    const orderData = {
        ...cart,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        street: data.street,
        building: data.building,
        floor: data.floor || '',
        scheduleType,
        frequency,
        totalPrice,
        deliveryPreference,
        scheduleDay,
        scheduleTimePeriod
      };

      navigate('/payment', { state: { orderData } });
    };

  return (
    <form onSubmit={handleSubmit(submit)} className="checkout-container">
      <div className="checkout-header">
        <Title title="Checkout" fontSize="2rem" />
        <p className="checkout-phrase">You're one step closer to refreshing hydration!</p>
      </div>

      <div className="checkout-main">
        <div className="checkout-section">
          <h2>Order Summary</h2>
          {cart.items.map(item => (
            <div className="checkout-item" key={item.water.id}>
              <img src={item.water.imageUrl} alt={item.water.name} />
              <div>
                <p>{item.water.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p className="checkout-price">${item.price}</p>
            </div>
          ))}
          <div className="checkout-total">
            <p>Total Items: {cart.totalCount}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>

          <button
            type="button"
            className="checkout-refill-button"
            onClick={() => setShowRefillModal(true)}
          >
            Request Refill
          </button>
        </div>

        {showRefillModal && (
          <RefillRequestModal
            onClose={() => setShowRefillModal(false)}
            onSubmit={handleRefillSubmit}
          />
        )}


        <div className="checkout-section">
          <h2>Delivery Details</h2>
          <input
            defaultValue={user.name}
            placeholder="Your Name"
            {...register('name', { required: true })}
            className={`${errors.name && 'checkout-error'} checkout-input`}
            autoComplete="name"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone', { required: true })}
            className={`${errors.name && 'checkout-error'} checkout-input`}
            autoComplete="tel"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register('email', { required: true })}
            className={`${errors.name && 'checkout-error'} checkout-input`}
            autoComplete="email"
          />
          <input
            defaultValue={user.address}
            placeholder="Delivery Address"
            {...register('address', { required: true })}
            className={`${errors.name && 'checkout-error'} checkout-input`}
            autoComplete="street-address"
          />
          <input
              placeholder="City"
              {...register('city', { required: 'City is required' })}
              className={`${errors.city && 'checkout-error'} checkout-input`}
              autoComplete="address-level2"
            />
            <input
              placeholder="Street"
              {...register('street', { required: 'Street is required' })}
              className={`${errors.street && 'checkout-error'} checkout-input`}
              autoComplete="address-line1"
            />
            <input
              placeholder="Building"
              {...register('building', { required: 'Building is required' })}
              className={`${errors.building && 'checkout-error'} checkout-input`}
              autoComplete="address-line2"
            />
            <input
              placeholder="Floor (Optional)"
              {...register('floor')}
              className="checkout-input"
              autoComplete="address-floor"
  />
        </div>

        <div className="checkout-section">
          <h2>Schedule Your Delivery</h2>
          <div  className="checkout-radio-group">
            <label>
              <input
                type="radio"
                name="scheduleType"
                value="fixed"
                onChange={e => setScheduleType(e.target.value)}
                className="checkout-radio-button"
              />
              Fixed Date Delivery (weekly)
            </label>
            <label>
              <input
                type="radio"
                name="scheduleType"
                value="oneTime"
                onChange={e => setScheduleType(e.target.value)}
                 className="checkout-radio-button"
              />
              One-Time Delivery
            </label>
            {scheduleType === 'fixed' && (
              <>
                <select
                  className="checkout-select"
                  onChange={e => setFrequency(Number(e.target.value))}
                >
                  <option value="1">1 time per month</option>
                  <option value="2">2 times per month</option>
                  <option value="3">3 times per month</option>
                  <option value="4">4 times per month</option>
                </select>
                <select className="checkout-select" onChange={e => setScheduleDay(e.target.value)}>
                  <option value="">Select a Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                   <option value="Wednesday">Wednesday</option>
                   <option value="Thursday">Thursday</option>
                   <option value="Friday">Friday</option>
                   <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>

                <select className="checkout-select" onChange={e => setScheduleTimePeriod(e.target.value)}>
                <option value="">Select a Time Period</option>
                   {generateTimeOptions()}
                 </select>

              </>
            )}
          </div>
        </div>

        <div className="checkout-section">
          <h2>How would you like the delivery man to handle your delivery?</h2>
          <div className="checkout-radio-group">
          <label>
            <input
              type="radio"
              name="deliveryPreference"
              value="knock"
              onChange={e => setDeliveryPreference(e.target.value)}
              className="checkout-radio-button"
            />
            Knock the door and wait
          </label>
          <label>
            <input
              type="radio"
              name="deliveryPreference"
              value="leave"
              onChange={e => setDeliveryPreference(e.target.value)}
              className="checkout-radio-button"
            />
            Just leave the water outside
          </label>
        </div>
        </div>
      </div>

      <button type="submit" className="checkout-submit-button">
        Proceed to Payment
      </button>
    </form>
  );
}