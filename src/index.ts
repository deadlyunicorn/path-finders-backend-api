import express, { Request, Response } from 'express';
import { client } from './db/connection';

const dotenv = require('dotenv')

dotenv.config({
  path: `.env.local`,
  override: true
})

const app = express();
const port = process.env.PORT || 3000;

app.get( '/', async( req: Request, res: Response ) => {

  await client
    .db('path_finders')
    .collection('accounts')
    .findOne({})
    .then( res => console.log( res ));
  res.send( "Hello world" );
})

app.listen( port, () => {
  console.log( `App is running on ${port}!`);
})