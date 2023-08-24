const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createProfile(req, res) {
  const { gender, age, weight, height } = req.body
  const profile = await prisma.profile.create({
    data: {
      age, gender, weight, height, userId: res.locals.user.id
    }
  })
  res.send(profile)
}

async function getProfile(req, res) {
  const user = res.locals.user
  res.send(user.profile)
}

async function editProfile(req, res) {
  const user = res.locals.user
  const existingProfile = user.profile
  const updateData = req.body
  const updatedProfile = await prisma.profile.update({
    where: {
      userId: user.id
    },
    data: {
      ...existingProfile,
      ...updateData
    }
  })
  res.send(updatedProfile)
}


module.exports = { createProfile, getProfile, editProfile }