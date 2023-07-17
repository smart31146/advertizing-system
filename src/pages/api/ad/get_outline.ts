import { OutlineAd, SearchOutlineAds } from "@/types/ads";
import type { NextApiRequest, NextApiResponse } from "next/types";

export type OutlineAdsResponse =
  | { ads: OutlineAd[]; total: number }
  | { error: string }
  | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutlineAdsResponse>
) {
  const { method } = req;
  const searchData = req.query as unknown as SearchOutlineAds;

  switch (method) {
    case "GET": {
      console.log(searchData);
      const ad: OutlineAd = {
        id: 52011541,
        img: "https://imageaws.popin.cc/ML/87fd5c62b1422b7c1c2623bc8e5960f7.png",
        img_width: 300,
        img_height: 250,
        title:
          "キャンプにBBQに！ アウトドアワインの決定版［イエローテイル］BE-PAL FOREST CAMPでも大人気！ AD（サッポロビール株式会社）",
        redirect_url:
          "https://www.bepal.net/archives/318749?utm_source=popinad&utm_medium=paid&utm_campaign=230615yellowtail_sgk&a0v5la7bquf89=d88568e161b45df470a9dc07b5d796f3&uy3ubftvh0u6o8=c21b7ad361d2d2e617418d16368b2761&tripid=c21b7ad361d2d2e617418d16368b2761&xnfrr0ncac=977&zsmoi87pih9=trace.popin.cc&lzzgnpz8d=6e22bb022cd37340eb88f5c2f2512e40",
        ad_company_name: "popin",
        site_company_name: "ORICON NEWS",
        site_company_url: "https://www.oricon.co.jp/",
        mobile: 0,
        position_top_per: 3271,
        position_left_per: 249,
        createtime: "2023-07-07 00:00:00",
        analysis: 1000,
        createtime_format: "7/7 0時頃",
        position: "上-左",
      };
      const ads = Array(20).fill(ad);

      return res.status(200).json({ ads, total: 3567 });
    }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
