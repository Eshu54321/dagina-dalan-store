import dbConnect from './dbConnect';
import User from '../models/User';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  try {
    await dbConnect();
    
    const email = 'admin@daginadalan.com';
    const password = 'admin_password_123';
    
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const adminUser = new User({
      name: 'Dagina Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin account created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    process.exit();
  }
}

seedAdmin();
