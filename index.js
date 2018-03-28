import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloEngine } from 'apollo-engine';

require('dotenv').config();

import typeDefs from './schemas/schema';
import Talk from './model/Talk';
import resolvers from './resolvers/resolvers'

const engine = new ApolloEngine({
   apiKey: process.env.AE_API_KEY
});

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds251747.mlab.com:51747/mongodb-graphql-test`
);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/'))
});

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema,
        context: { Talk },

        // Option
        tracing: true,
        cacheControl: true
    })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

engine.listen({
    port: PORT,
    expressApp: app
}, () => console.log(`Server is running at localhost:${PORT}`));