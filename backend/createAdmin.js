require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./db');

(async () => {
  try {
    const adminPassword = 'Roji@123';
    const staffPassword = 'Deepu@123';
    const adminHash = await bcrypt.hash(adminPassword, 10);
    const staffHash = await bcrypt.hash(staffPassword, 10);

    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, 'admin'), ($4, $5, $6, 'staff')
       ON CONFLICT (email) DO UPDATE
         SET name = EXCLUDED.name,
             password_hash = EXCLUDED.password_hash,
             role = EXCLUDED.role`,
      ['Roji Chaudhary', 'admin@pustak.com', adminHash, 'Dipak Chaudhary', 'staff@pustak.com', staffHash]
    );

    console.log('Admin ready: admin@pustak.com / Roji@123');
    console.log('Staff ready: staff@pustak.com / Deepu@123');
  } catch (err) {
    console.error('Failed:', err.message);
  }
  process.exit();
})();