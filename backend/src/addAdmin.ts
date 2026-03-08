import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Admin } from './models/Admin'

dotenv.config()

async function addAdmin() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/amu_web'
  await mongoose.connect(uri)
  console.log('✅ Connected to MongoDB')

  const email = 'nasratamiry93@gmail.com'
  const password = '@Mazar2020'

  let admin = await Admin.findOne({ email })
  if (!admin) {
    admin = await Admin.create({ email, password })
    console.log(`✅ Created admin: ${email}`)
  } else {
    console.log(`✅ Admin already exists: ${email}`)
  }

  await mongoose.disconnect()
  console.log('✅ Done')
  process.exit(0)
}

addAdmin().catch((err) => {
  console.error('❌ Failed:', err.message)
  process.exit(1)
})
