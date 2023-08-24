const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

async function signup(req, res) {
  const { username, email, password } = req.body
  const hashPassword = await bcrypt.hash(password, 10)
  let user
  try {
    user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword
      }
    })
  } catch (error) {
    res.send(error)
    return
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  res.send({ token })
}

async function login(req, res) {
  const { email, password } = req.body
  let user
  try {
    user = await prisma.user.findUnique({ where: { email } })
  } catch (error) {
    res.send(error)
  }
  if (!user) {
    res.sendStatus(401)
    return
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    res.sendStatus(401)
    return
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

  res.send({ token })
}

async function me(req, res) {
  const { id, username, email, profile } = res.locals.user
  res.send({ id, username, email, profile })
}


module.exports = { signup, login, me }