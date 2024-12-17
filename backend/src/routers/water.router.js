import { Router } from 'express';
import { WaterModel } from '../models/water.model.js';
import handler from 'express-async-handler';
const router = Router();

router.get('/', handler(async (req, res) => {
  const waters =await WaterModel.find({});
  res.send(waters); 
}));

router.get('/search/:searchTerm', handler(async (req, res) => {
  const { searchTerm } = req.params;
  const searchRegex = new RegExp(searchTerm, 'i');
  const waters = await WaterModel.find({ name: {$regex: searchRegex}});
  res.json(waters);
}));

router.get('/:waterId', handler(async (req, res) => {
  const { waterId } = req.params;
  const water = await WaterModel.findById(waterId);
  res.json(water);
}));

export default router;
