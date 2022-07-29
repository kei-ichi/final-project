// Prisma Client
const { PrismaClient } = require('@prisma/client');

// Master endpoint
const devEndpoint = 'mysql://root:admin@localhost:3306/user';

const tokyoWriteEndpoint =
  'mysql://admin:admin0729@ojt22-aurora-1a.cluster-co7scheoqs6o.ap-northeast-1.rds.amazonaws.com:3306/user';

const osakaWriteEndpoint =
  'mysql://admin:admin0729@ojt22-aurora-3a.cluster-cpz0zjyan50t.ap-northeast-3.rds.amazonaws.com:3306/user';

// Replica endpoint
const tokyoReadEndpoint =
  'ojt22-aurora-1a.cluster-ro-co7scheoqs6o.ap-northeast-1.rds.amazonaws.com';
const osakaReadEndpoint =
  'ojt22-aurora-3a.cluster-ro-cpz0zjyan50t.ap-northeast-3.rds.amazonaws.com';

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
    name: 'ブーブァンフェ',
    strength_1: '学習欲',
    strength_2: '分析思考',
    strength_3: '親密性',
    strength_4: '調和性',
    strength_5: '責任感',
    imgUrl:
      'https://aq-22-final-project-img-bucket.s3.ap-northeast-1.amazonaws.com/hue.jpg',
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
  try {
    // Get data from Tokyo read endpoint

    // Innit Prisma client with Tokyo read endpoint
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: tokyoReadEndpoint,
        },
      },
    });

    // Get data from database
    const result = await prisma.user.findMany();

    if (result.length === 0) {
      console.log('                             ');
      console.log('-----------------------------');
      console.log('Database is empty');
      console.log('-----------------------------');
      console.log('                             ');
    } else {
      console.log('                             ');
      console.log('-----------------------------');
      console.log(result);
      console.log('-----------------------------');
      console.log('                             ');
    }

    // Send back data to Client
    res.send(result);
  } catch (error) {
    // Show error
    console.log('                                                ');
    console.log('------------------------------------------------');
    console.log('Can not get data from Tokyo Cluster - Read Endpoint');
    console.log('Trying get data from Osaka Cluster - Read Endpoint ');
    console.log('                                                ');
    console.log('------------------------------------------------');

    // Innit Prisma client with Osaka read endpoint
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: osakaReadEndpoint,
        },
      },
    });

    // Get data from database
    const result = await prisma.user.findMany();

    if (result.length === 0) {
      console.log('                             ');
      console.log('-----------------------------');
      console.log('Database is empty');
      console.log('-----------------------------');
      console.log('                             ');
    } else {
      console.log('                             ');
      console.log('-----------------------------');
      console.log(result);
      console.log('-----------------------------');
      console.log('                             ');
    }

    // Send back data to Client
    res.send(result);
  }
});

app.post('/', async (req, res) => {
  try {
    // Write data to database by using Tokyo CLuster - Write endpoint
    // Innit Prisma client with Tokyo CLuster - Write endpoint
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: tokyoWriteEndpoint,
        },
      },
    });

    // Write data to database
    for (const member of members) {
      const data = await prisma.user.create({
        data: member,
      });

      console.log('                             ');
      console.log('-----------------------------');
      console.log(data);
      console.log('-----------------------------');
      console.log('                             ');
    }

    // Get latest data from database
    const inputtedData = await prisma.user.findMany();

    // Send back data to Client
    res.send(inputtedData);
  } catch (error) {
    // Show error
    console.log('                                                ');
    console.log('------------------------------------------------');
    console.log('Can not write data to Tokyo Primary Cluster');
    console.log('Trying to write data to Osaka Secondary Cluster');
    console.log('                                                ');
    console.log('------------------------------------------------');

    // Write data to database by using Osaka CLuster - Write endpoint
    // Innit Prisma client with Osaka CLuster - Write endpoint
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: osakaWriteEndpoint,
        },
      },
    });

    // Write data to database
    for (const member of members) {
      const data = await prisma.user.create({
        data: member,
      });

      console.log('                             ');
      console.log('-----------------------------');
      console.log(data);
      console.log('-----------------------------');
      console.log('                             ');
    }

    // Get latest data from database
    const inputtedData = await prisma.user.findMany();

    // Send back data to Client
    res.send(inputtedData);
  }
});

app.delete('/', async (req, res) => {
  try {
    // Delete data by using Tokyo Cluster - Write endpoint
    // Innit Prisma client with Tokyo Cluster - Write endpoint
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: tokyoWriteEndpoint,
        },
      },
    });

    // Delete all data from database
    const result = await prisma.user.deleteMany({});

    console.log('                             ');
    console.log('-----------------------------');
    console.log(`Deleted ${result.count} items from database`);
    console.log('-----------------------------');
    console.log('                             ');

    // Send back result to Client
    res.send(result);
  } catch (error) {
    // Show error
    console.log('                                                ');
    console.log('------------------------------------------------');
    console.log('Can not delete data by using Tokyo Cluster - Write Endpoint');
    console.log(
      'Trying to delete data by using Osaka Cluster - Write Endpoint'
    );
    console.log('                                                ');
    console.log('------------------------------------------------');

    // Delete data by using Osaka Cluster - Write endpoint
    // Innit Prisma client with Osaka Cluster - Write endpoint
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: osakaWriteEndpoint,
        },
      },
    });

    // Delete all data from database
    const result = await prisma.user.deleteMany({});

    console.log('                             ');
    console.log('-----------------------------');
    console.log(`Deleted ${result.count} items from database`);
    console.log('-----------------------------');
    console.log('                             ');

    // Send back result to Client
    res.send(result);
  }
});

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
