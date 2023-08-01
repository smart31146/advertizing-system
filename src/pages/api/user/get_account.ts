import prisma from "@/configs/prisma/prisma";
// import { User } from "@prisma/client";
import clientPromise from "@/components/db";
import { Db } from "mongodb";
import {User} from "@/types/ads";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< {userData : User} | { error: string } | null>
) {
  const { method } = req;
  const { name } = req.query as Partial<{ [key: string]: string }>;
  console.log('user name', name)
  const client = await clientPromise
  const db:Db=client.db('test')
  const collection = db.collection('user')
  // console.log('usr collection',collection)
  
  // console.log("id pas", dataDetail)
  switch (method) {
    case "GET": {
      // const user = await prisma.user
      //   .findUnique({
      //     where: {
      //       name,
      //     },
      //   })
      const user=  await collection.find({name:name}).toArray()
      const userData : User = {
        id: user[0]._id,
        name : user[0].name ,
        hash : user[0].hash,
        api_key: user[0].api_key,
        model : user[0].model
      };
        
      console.log("user: get", user)
      res.status(200).json({userData});
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
