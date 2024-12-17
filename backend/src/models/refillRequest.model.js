import mongoose from 'mongoose';

const refillRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  brandName: { 
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  containerType: { 
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RefillRequest = mongoose.model('RefillRequest', refillRequestSchema);
export default RefillRequest;