const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Mocking the User Model structure to avoid TS/import issues in a plain JS script
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  const uri = 'mongodb://localhost:27017/jewellery-store';
  const email = 'admin@daginadalan.com';
  const password = 'admin_password_123';

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash(password, 12);
    
    await User.updateOne(
      { email },
      { 
        $set: { 
          name: 'Dagina Admin',
          password: hashedPassword,
          role: 'admin'
        } 
      },
      { upsert: true }
    );

    console.log('Admin account seeded successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
