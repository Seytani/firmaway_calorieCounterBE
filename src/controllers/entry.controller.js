const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addEntry(req, res) {
  const { name, calories, category, date } = req.body
  const user = res.locals.user

  const entry = await prisma.entry.create({
    data:
    {
      name,
      calories,
      category,
      date: new Date(date),
      userId: user.id,
    }
  })
  res.send(entry)
}


async function getEntries(req, res) {
  const user = res.locals.user
  const entries = await prisma.entry.findMany({
    where: {
      userId: user.id
    }
  })
  res.send(entries)
}

async function editEntry(req, res) {
  const user = res.locals.user
  const updateData = req.body

  const existingEntry = await prisma.entry.findFirst({
    where: {
      userId: user.id,
      id: parseInt(req.params.id)
    }
  })

  const updatedEntry = await prisma.entry.update({
    where: {
      userId: user.id,
      id: parseInt(req.params.id)
    },
    data: {
      ...existingEntry,
      ...updateData,
    }
  })
  res.send(updatedEntry)
}

async function deleteEntry(req, res) {
  const user = res.locals.user;
  try {
    const deletedEntry = await prisma.entry.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).send('An error occurred while deleting the entry.');
  }
}

module.exports = { addEntry, getEntries, editEntry, deleteEntry }