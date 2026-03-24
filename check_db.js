const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/jewellery-store';

async function checkDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB:', MONGODB_URI);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    if (collections.some(c => c.name === 'users')) {
      const users = await mongoose.connection.db.collection('users').find({}, { projection: { password: 0 } }).toArray();
      console.log('Users found:', users.length);
      users.forEach(u => console.log(`- ${u.email} [${u.role}]`));
    } else {
      console.log('Users collection NOT found!');
    }
  } catch (err) {
    console.error('DB Error:', err.message);
  } finally {
    await mongoose.connection.close();
  }
}

checkDb();
