import { DetailAd } from "@/types/ads";
import type { NextApiRequest, NextApiResponse } from "next/types";
import clientPromise from "@/components/db";
import { Db } from "mongodb";
import { ObjectId } from "mongodb";
export type DetailAdResponse = { ad: DetailAd } | { error: string } | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DetailAdResponse>
) {
  const { method } = req;
  console.log("query",req.query)
  const {id} = req.query
  const dd : ObjectId = new ObjectId(String(id));
  const client = await clientPromise
  const db:Db=client.db('test')
  const collection = db.collection('adMainList')
  const collection1 = db.collection('adDetailList')

  console.log("test is",dd)
  const query1 = { _id: dd };
  const query2 = { id: dd };
  const data =  await collection.find(query1).toArray()
  const dataDetail =  await collection1.find(query2, { projection: { _id:0,id:0 } }).toArray()
  console.log("detaildata",dataDetail)
  let detail: any[] = [];
  let lastdate : string =''
  dataDetail.map((item)=>{
    const temp = {
      date: item.date,
      count: item.count
    }
    lastdate=item.date
    detail.push(temp)
  })
  switch (method) {
    case "GET": {
      console.log("detail: ", dd);
      const ad: DetailAd = {
        id: data[0]._id,
        img: data[0].img,
        img_width: data[0].img_width,
        img_height: data[0].img_height,
        title: data[0].title,
        redirect_url:data[0].redirect_url,
        ad_company_name: data[0].ad_company_name,
        site_company_name: data[0].site_company_name,
        site_company_url: data[0].site_company_url,
        mobile: 0,
        position_top_per: data[0].position_top_per,
        position_left_per: data[0].positon_left_per,
        createtime: data[0].createtime,
        createtime_format: dataDetail[0].date,
        position: data[0].position,
        pasts: detail,
      };

      return res.status(200).json({ ad });
    }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
