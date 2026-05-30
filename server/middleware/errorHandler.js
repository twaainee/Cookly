export const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` })
}

export const errorHandler = (error, _req, res, _next) => {
  console.error(error)

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((item) => item.message)
    return res.status(400).json({ message: messages[0] || 'Validation failed' })
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'Email is already in use' })
  }

  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong',
  })
}
