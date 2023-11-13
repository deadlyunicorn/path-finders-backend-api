import express, { Request, Response } from 'express';
import { client } from './db/connection';
import { getUser } from './api/users/get';
import { registerUser } from './api/users/register/register';
import { updateLocation } from './api/users/updateLocation/updateLocation';

const dotenv = require('dotenv')


dotenv.config({
  path: `.env.local`,
  override: true
})

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


app.listen( port, () => {
  console.log( `App is running on ${port}!`);
});

app.get( '/', async( req: Request, res: Response ) => {

})

app.get('/api/users/:userId', getUser );

app.post('/api/users/register', registerUser );
app.put('/api/users/update', updateLocation );