import { OutlineAd, SearchOutlineAds } from "@/types/ads";
import type { NextApiRequest, NextApiResponse } from "next/types";
import clientPromise from "@/components/db";
import { Db, ObjectId } from "mongodb";
import { Public } from "@prisma/client/runtime/library";
export type OutlineAdsResponse =
  | { ads: OutlineAd[]; total: number }
  | { error: string }
  | null;
/**
 * name
 */

 
// async function getTotalAnalysis(params:ObjectId) : string{
//   return "12"
// }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutlineAdsResponse>
) {
  interface Query {
    title?: { $regex: string, $options: string } | { $not: { $regex: string, $options:string } };
    $where: string;
    site_company_name?: string | { $ne: string };
    img?: string | { $ne: string };
    
  }
  const { method } = req;
  const searchData = req.query as unknown as SearchOutlineAds;
  const client = await clientPromise
  const db:Db=client.db('test')
  const collection = db.collection('adMainList')
  const collection1 = db.collection('adDetailList')
  const site_company_name = searchData.domein
  
  const analysisStart : number = Number(searchData.analysisRangeStart)
  const analysisEnd : number = Number(searchData.analysisRangeEnd)
  const cc = `parseFloat(this.analysis) >= ${analysisStart} && parseFloat(this.analysis) <= ${analysisEnd}`;

  const query: Query = {
    $where: cc
  };
  if (searchData.keyword) query.title =  { $regex: `.*${searchData.keyword}.*`, $options: 'i' }
  if (searchData.excludedKeyword) query.title = { $not: { $regex: `.*${searchData.excludedKeyword}.*`, $options: 'i' }}
  if (searchData.adType=='テキスト広告') query.img='テキスト広告'
  if (searchData.adType=='画像広告') query.img={ $ne: "テキスト広告" }
  if (searchData.excludedDomain) query['site_company_name']={ $ne: searchData.excludedDomain }
  if (site_company_name) query['site_company_name']=site_company_name;
  const totalData =  await collection.find(query,{ sort: { createtime: -1 } })
         .toArray();
  const total=totalData.length
  
  let ads: any[] = [];
  
  switch (method) {
    case "GET": {
      
      let startNumber  :number = (Number(searchData.page)-1)*100
      let endNumber : number = startNumber+100
     
      const data =  await collection.find(query,{ sort: { createtime: -1 } }).skip(startNumber)
      .limit(endNumber - startNumber)
      .toArray();
      // console.log('data',data)
      console.log("search",searchData);
      console.log('query',query)
      // console.log("test ad",data)
      
      // ads = await Promise.all(data.map(async (item) => {
      //   let count:number=0;
      //   const query1 ={id: item._id};
      //   const dataDetail = await collection1.find(query1).toArray()
      //   console.log("count detail",dataDetail)
      //   dataDetail.map((detailItem)=>{
      //     count=count+Number(detailItem.count)
      //   })
      //   console.log("count",count)
        // const filter = {_id : item._id}
        // const update = {$set: {analysis:String(count)}}
                            
        // collection.updateOne(filter, update)
        // const ad: OutlineAd = 
        // {
        //   _id: item._id,
        //   img: item.img,
        //   img_width: item.img_width,
        //   img_height: item.img_height,
        //   title: item.title,
        //   redirect_url:item.redirect_url,
        //   ad_company_name: item.ad_company_name,
        //   site_company_name: item.site_company_name,
        //   site_company_url: item.site_company_url,
        //   mobile: 0,
        //   position_top_per: item.position_top_per,
        //   position_left_per: item.position_left_per,
        //   createtime: item.createtime,
        //   analysis: String(count),
        //   createtime_format: item.createtime_format,
        //   position: item.position,
        // };
        
        // ads.push(ad)
        // console.log("testadd",ads)
        // return ad;
        // console.log('testadoussst',ads)
        // const result = await someAsyncFunction(item);
        // return result.toUpperCase();
      // }));
      // console.log("end", ads,"end")
      data.map((item) => {
        
        // const count :  string = getTotalAnalysis(query1)
       
        
        // console.log("test query main",query1)
        // const dataDetail = collection1.find(query1, { projection: { _id:0,count: 1, date: 1 } }).toArray()
        // console.log("test main detail",dataDetail)
        // const ad: OutlineAd = item
        // {
        //   id: 52011541,
        //   img: "https://imageaws.popin.cc/ML/87fd5c62b1422b7c1c2623bc8e5960f7.png",
        //   img_width: 300,
        //   img_height: 250,
        //   title:
        //     "kkkkkkkkkkkkkkkk",
        //   redirect_url:
        //     "https://www.bepal.net/archives/318749?utm_source=popinad&utm_medium=paid&utm_campaign=230615yellowtail_sgk&a0v5la7bquf89=d88568e161b45df470a9dc07b5d796f3&uy3ubftvh0u6o8=c21b7ad361d2d2e617418d16368b2761&tripid=c21b7ad361d2d2e617418d16368b2761&xnfrr0ncac=977&zsmoi87pih9=trace.popin.cc&lzzgnpz8d=6e22bb022cd37340eb88f5c2f2512e40",
        //   ad_company_name: "popin",
        //   site_company_name: "ORICON NEWS",
        //   site_company_url: "https://www.oricon.co.jp/",
        //   mobile: 0,
        //   position_top_per: 3271,
        //   position_left_per: 249,
        //   createtime: "2023-07-07 00:00:00",
        //   analysis: 1000,
        //   createtime_format: "7/7 0時頃",
        //   position: "上-左",
        // };
        // console.log('testadoussst',item)
        ads.push(item)
        
      })
      
      // const ads = Array(20).fill(ad);

      return res.status(200).json({ ads, total: total });
    }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
