import 'reflect-metadata';
import 'colors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

const createServer = async () => {
  await createConnection();
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      // credentials: true -- if you need cookie functionality
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [__dirname + '/resolvers/*.js'] }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}/graphql`.blue.bold)
  );
};

createServer().catch((err) => console.log('Root Error: ', err));
