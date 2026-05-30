import bcrypt from 'bcryptjs'
import { User } from '../schemas/User.js'
import { createToken } from '../utils/auth.js'

const userSummary = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
})

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash })
    const token = createToken(user)

    res.status(201).json({ token, user: userSummary(user) })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    const isMatch = user ? await bcrypt.compare(password, user.passwordHash) : false

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = createToken(user)
    res.json({ token, user: userSummary(user) })
  } catch (error) {
    next(error)
  }
}

export const me = (req, res) => {
  res.json({ user: userSummary(req.user) })
}
