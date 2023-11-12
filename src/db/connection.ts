import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";

configDotenv({
  path: `.env.local`,
  override: true
});


if ( ! process.env.MONGODB_URI ){
  throw "Cannot read connection string.";
  
}

export const client = new MongoClient( process.env.MONGODB_URI );
