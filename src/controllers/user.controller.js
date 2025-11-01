import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(401).json({
      success: false,
      message: 'name , email and password are required ',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User Already exists with this email Id',
      });
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const createUser = await User.create(user);

    if (!createUser) {
      return res.status(401).json({
        success: false,
        message: 'Error in crearting user in DB',
      });
    }

    const data = {
      name: createUser.name,
      email: createUser.email,
    };
    return res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: 'Email and Password are equired',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: 'invalid password',
      });
    }

    const fastorToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'login successful',
      fastorToken: fastorToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}
