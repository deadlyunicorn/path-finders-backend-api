import { Request, Response } from "express";
import { client } from "../../db/connection"
import { ObjectId } from "mongodb";
import { ErrorMessages } from "../../../types";

export const getUser = async( req: Request, res: Response ) => {

  const params = req.params as usersParams;
  const userId = params.userId;

  const userLocations = client.db('path_finders').collection('userLocations');

  try{
    const userIdValue = parseInt( userId );
    if ( Number.isNaN ( userIdValue ) ){
      throw ErrorMessages.InvalidRequest
    }
    const data = await userLocations  
    .findOne({
      userId: userIdValue
    }) as userResponse;

    if ( data ){

      const { _id, ...finalData } = data;

      if ( new Date( data.updatedAt ).getTime() - new Date().getTime() < -1800000 ){

        await userLocations.updateOne(
          { userId: userId },
          { $unset: { location: "" } }
        );

        const { location, ...dataWithNoLocation } = finalData; 

        return res.json( {
          data: dataWithNoLocation,
          error: {
            message: "User is not sharing their location right now."
          }
        } );
          
        
      }

      return res.json( { data: finalData } );
    }
    else{
      throw 'User not found';
    }

  }
  catch( err ){
    console.error( err );
    res.json( {
      error:{
        message: err
      }
    } )
  } 
  
}

type usersParams = { 
  userId: string
}

type userResponse = {
  _id: ObjectId,
  userId: string,
  location:{
    longitude: number,
    latitude: number
  },
  updatedAt: number
}