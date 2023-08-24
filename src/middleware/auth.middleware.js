const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function validateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.sendStatus(401)
    return
  }
  let decoded
  let user
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
    user = await prisma.user.findUnique({ where: { id: decoded.id }, include: { profile: true} })
  } catch (error) {
    res.send(error)
    return
  }
  if (!user) {
    res.sendStatus(401)
    return
  }
  res.locals.user = user
  next()
}

module.exports = { validateToken }