import { Router } from 'express';
import jwt from "jsonwebtoken";
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import auth from '../middleware/auth.mid.js'
const PASSWORD_HASH_SALT_ROUNDS =10;
const router = Router();

router.post('/login', handler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
      const tokenResponse = generateTokenResponse(user); 
      res.send(tokenResponse);
      return;
  }

  res.status(400).send('Username or password is invalid!');
}));


router.post(
  '/register',
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(400).send('User already exists, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password,PASSWORD_HASH_SALT_ROUNDS);

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
    };

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  })
);




router.put('/updateProfile', auth, handler(async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
      return res.status(400).send('Name and address are required');
  }

  const user = await UserModel.findByIdAndUpdate(req.user.id, { name, address }, { new: true });
  
  if (!user) {
      return res.status(404).send('User not found');
  }

  res.send(generateTokenResponse(user));
}));


router.put('/changePassword', auth, handler(async (req, res) => {
  const { currentPassword, newPassword} = req.body;
  const user= await UserModel.findById(req.user.id);
  if(!user) {
    res.status(400).send('Failed changing the password!');
    return;
  }

  const equal = await bcrypt.compare(currentPassword,user.password);
  if(!equal){
    res.status(400).send('Current Password is Not Current!');
    return;
  }
  user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
  await user.save();
  res.send();
}));




const generateTokenResponse = (user) => {
  const token = jwt.sign(
      {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
  );

  return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token, 
  };
};


export default router;