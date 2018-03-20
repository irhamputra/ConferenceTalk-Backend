import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

require('dotenv').config();

import types from './schemas/schema';
import Talk from './model/Talk';
import resolvers from './resolvers/resolvers'

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds251747.mlab.com:51747/mongodb-graphql-test`
);

const schema = makeExecutableSchema({
    typeDefs: types,
    resolvers
});

const PORT = 3000;
const app = express();

app.use('/graphql',
    bodyParser.json(),
    graphqlExpress({ schema, context: { Talk } }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

app.listen(PORT);

console.log('App running on:', PORT);