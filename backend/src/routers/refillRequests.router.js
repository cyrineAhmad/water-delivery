import express from 'express';
import RefillRequest from '../models/refillRequest.model.js';
import handler from 'express-async-handler';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, brandName, quantity, containerType, comments } = req.body; 

        if (!userId || !brandName || !quantity || !containerType) {
            return res.status(400).json({ message: 'Brand name, quantity, and container type are required.' }); 
        }

        const newRequest = new RefillRequest({ userId, brandName, quantity, containerType, comments });
        await newRequest.save();
        res.status(201).json({ message: 'Refill request submitted successfully!' });
    } catch (error) {
        console.error("Error creating refill request:", error); 
        res.status(500).json({ message: 'Error submitting refill request', error: error.message });
    }
});


router.get('/', handler(async (req, res) => {
    if (!req.user?.isAdmin) {
         return res.status(403).send('You do not have permission to view refill requests');
       }
    try {
    const requests = await RefillRequest.find({ userId: req.query.userId });
    res.status(200).json(requests);
    } catch (error) {  
    res.status(500).json({ message: 'Error fetching refill requests', error });
    }
}));

export default router; 
