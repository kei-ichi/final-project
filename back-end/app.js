// Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Express.js
const express = require('express');
const cors = require('cors');
const app = express();

// Default port
const PORT = 5000;

// User data
const members = [
  {
    name: '井川 朋樹',
    strength_1: '調和性',
    strength_2: '最上志向',
    strength_3: '親密性',
    strength_4: '学習欲',
    strength_5: '責任感',
    imgUrl:
      'https://aq-22-final-project-img-bucket.s3.ap-northeast-1.amazonaws.com/ikawa.jpg',
  },
  {
    name: '伊藤 秀也',
    strength_1: '個別化',
    strength_2: '着想',
    strength_3: '慎重さ',
    strength_4: '学習欲',
    strength_5: '分析思考',
    imgUrl:
      'https://aq-22-final-project-img-bucket.s3.ap-northeast-1.amazonaws.com/ito.jpg',
  },
  {
    name: '岸 将史',
    strength_1: '回復志向',
    strength_2: '学習欲',
    strength_3: '個別化',
    strength_4: '責任感',
    strength_5: '調和性',
    imgUrl:
      'https://aq-22-final-project-img-bucket.s3.ap-northeast-1.amazonaws.com/kishi.jpg',
  },

  {
    name: '佐藤 龍也',
    strength_1: '着想',
    strength_2: '学習欲',
    strength_3: '個別化',
    strength_4: '活発性',
    strength_5: '収集心',
    imgUrl:
      'https://aq-22-final-project-img-bucket.s3.ap-northeast-1.amazonaws.com/sato.jpg',
  },
  {
    name: 'ブーブァンフェ',
    strength_1: '学習欲',
    strength_2: '分析思考',
    strength_3: '親密性',
    strength_4: '調和性',
    strength_5: '責任感',
    imgUrl:
      'https://aq-22-final-project-img-bucket.s3.ap-northeast-1.amazonaws.com/hue.jpg',
  },
];

// Enable CORS
app.use(
  cors({
    origin: '*',
  })
);

// Set json as default body parser
app.use(express.json());

app.get('/', async (req, res) => {
  const result = await prisma.user.findMany();

  console.log(result);

  res.send(result);
});

app.post('/', async (req, res) => {
  for (const member of members) {
    const data = await prisma.user.create({
      data: member,
    });

    console.log(data);
  }

  res.send(members);
});

app.delete('/', async (req, res) => {
  const result = await prisma.user.deleteMany({});

  console.log(result);

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
