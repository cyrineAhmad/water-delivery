import {connect,set} from "mongoose";
import { UserModel } from "../models/user.model.js";
import { WaterModel } from "../models/water.model.js";
import { sample_users } from "../data.js";
import { sample_waters } from "../data.js";
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS =10;
set('strictQuery',true); //(security purpose)

export const dbconnect = async () => {
    try {
      connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await seedUsers();
      await seedWaters();
      console.log('MongoDB connected successfully!');
    } catch (error) {
      console.log(error);
    }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      console.log('Users seed is already done!');
      return;
    }
  
    for (let user of sample_users) {
      user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
      await UserModel.create(user);
    }
  
    console.log('Users seed is done!');
  }
  
  async function seedWaters() {
    for (const water of sample_waters) {
      await WaterModel.updateOne(
        { name: water.name }, 
        { $set: water }, 
        { upsert: true } // Insert the water if it doesn't exist
      );
      console.log(`Water ${water.name} seeded/updated.`);
    }
  
    console.log('Water seed is done!');
  }
  