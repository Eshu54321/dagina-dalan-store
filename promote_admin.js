const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/jewellery-store';
const TARGET_EMAIL = 'debug_1122@example.com'; // Adjust if needed

async function promoteUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB:', MONGODB_URI);
    
    // Check if user exists
    const user = await mongoose.connection.db.collection('users').findOne({ email: TARGET_EMAIL });
    
    if (!user) {
      console.log(`User ${TARGET_EMAIL} not found. Please register first.`);
      return;
    }
    
    // Promote to Admin
    await mongoose.connection.db.collection('users').updateOne(
      { email: TARGET_EMAIL },
      { $set: { role: 'admin' } }
    );
    
    console.log(`Successfully promoted ${TARGET_EMAIL} to ADMIN! 🔐✨`);
    
  } catch (err) {
    console.error('Promotion Error:', err.message);
  } finally {
    await mongoose.connection.close();
  }
}

promoteUser();
