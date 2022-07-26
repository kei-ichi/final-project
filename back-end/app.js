// Prisma Client
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Express.js
const express = require('express');
const cors = require('cors');
const app = express();



// Default port
const PORT = 5000;

// Enable CORS
app.use(cors({
  origin: '*'
}))

// Set json as default body parser
app.use(express.json());


app.get('/', async (req, res) => {
  const result = await prisma.user.findMany();

  console.log(result)

  res.send(result);
})

app.post('/', async (req, res) => {
  const result = await prisma.user.create({
    data: {
      name: 'Nimi Anna',
      strength_1: '1',
      strength_2: '2',
      strength_3: '3',
      strength_4: '4',
      strength_5: '5'
    }
  })

  console.log(result)

  res.send('Created new data')
})

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`)
})

