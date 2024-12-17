import { model, Schema } from 'mongoose';
import { WaterModel } from './water.model.js';
import { OrderStatus } from '../constants/orderStatus.js';

export const OrderItemSchema = new Schema(
  {
    water: { type: WaterModel.schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

OrderItemSchema.pre('validate', function (next) {
  this.price = this.water.price * this.quantity;
  next();
});

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String },
    paymentId: { type: String },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    scheduleType: { type: String, required: true },
    frequency: { type: Number, required: true },
    deliveryPreference: {type: String},
    scheduleDay:{type: String},
    scheduleTimePeriod:{type: String},
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);


export const OrderModel = model('order', orderSchema);