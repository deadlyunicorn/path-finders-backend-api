import { Request, Response } from "express";
import { client } from "../../db/connection"
import { ObjectId } from "mongodb";

export const getUser = async( req: Request, res: Response ) => {

  const params = req.params as usersParams;
  const userId = params.userId;

  const accounts = client.db('path_finders').collection('accounts');
  const data = await accounts  
  .findOne({
    userId: userId
  }) as userResponse;

  if ( data ){
    const { _id, ...finalData } = data;
    res.json( { data: finalData } );
  }
  else{
    res.json( {
      error: {
        message: 'User not found'
      }
    } )
  }
  
}

type usersParams = { 
  userId: string
}

type userResponse = {
  _id: ObjectId,
  userId: string
}