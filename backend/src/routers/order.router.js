import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

const router = Router();
router.use(auth);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;

    if (!order.items || order.items.length <= 0) return res.status(400).send('Your Cart is Empty!');
    if (!order.name || !order.address) return res.status(400).send('Missing required order details!');
  await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
  });
    const newOrder = new OrderModel({ ...order, user: req.user.id, addressLatLng: order.addressLatLng || null, });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId, paymentMethod } = req.body;
    const validPaymentMethods = ['cash', 'card'];

    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).send('Invalid payment method!');
    }

    try {
       const order = await getNewOrderForCurrentUser(req);
      if (!order) return res.status(400).send('Order not found!');
    
      if (['card'].includes(paymentMethod) && !paymentId) {
          return res.status(400).send('Payment ID is required for this payment method!');
      }

      order.paymentId = paymentId || 'N/A';
      order.status = OrderStatus.Paid;
      order.paymentMethod = paymentMethod;
      await order.save();

      res.send({ orderId: order._id, message: 'Payment successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error while processing payment');
    }
  })
);


router.get('/:status?', handler(async (req, res) => {
  console.log('--- /api/orders GET request started ---');
  console.log('Request parameters:', req.params);
  console.log('Request User:', req.user);

  const status = req.params.status;

  const filter = {};
  filter.user = req.user.id;
  if (status) filter.status = status;

  console.log('Query filter:', filter); 

  try {
    const orders = await OrderModel.find(filter).sort('-createdAt');
    console.log('Orders found:', orders); 
    res.send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Failed to fetch orders');
  }
  console.log('--- /api/orders GET request finished ---');
}));


const getNewOrderForCurrentUser = async req => {
    console.log('User ID:', req.user.id); 
    const order = await OrderModel.findOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    }).populate('user');
  
    console.log('Fetched Order:', order);  
    if (order) {
      console.log('Order Status:', order.status);
    } else {
      console.log('No new order found for this user');
    }
  
    return order;
  };

export default router;