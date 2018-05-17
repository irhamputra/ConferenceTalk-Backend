import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloEngine } from 'apollo-engine';

require('dotenv').config();

import typeDefs from './schemas/schema';
import Talk from './model/Talk';
import resolvers from './resolvers/resolvers';

if (!process.env.AE_API_KEY) {
    throw new Error("Please provide the Apollo Engine API_KEY");
}

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds251747.mlab.com:51747/mongodb-graphql-test`
);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const PORT = 8080;
const app = express();

app.use(cors());

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema,
        context: { Talk },
    })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

const engine = new ApolloEngine({
    apiKey: process.env.AE_API_KEY
});

engine.listen({
    port: PORT,
    expressApp: app
}, () => console.log(`Server is running at localhost:${PORT}`));