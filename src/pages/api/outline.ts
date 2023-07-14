import { OutlineAd, SearchOutlineAds } from "@/types/ads";
import type { NextApiRequest, NextApiResponse } from "next/types";

export type OutlineAdsResponse =
  | { ads: OutlineAd[] }
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
      console.log("keyword: ", searchData.keyword);
      const ad: OutlineAd = {
        id: 52011541,
        access_site_id: 1009,
        img: "https://imageaws.popin.cc/ML/87fd5c62b1422b7c1c2623bc8e5960f7.png",
        title:
          "キャンプにBBQに！ アウトドアワインの決定版［イエローテイル］BE-PAL FOREST CAMPでも大人気！ AD（サッポロビール株式会社）",
        url: "https://trace.popin.cc/ju/ic?tn=6e22bb022cd37340eb88f5c2f2512e40&trackingid=c21b7ad361d2d2e617418d16368b2761&acid=977&data=1vDfzlHLJhQUgeGfQnhTkaxKPKNtj5hujQmjoUEv52WXl860ClCtD3j9hoyg4nVxk0-4mGA15YADUD86TIaXDy3xgtH9P6XUjohrsAJ_mNaa753jORVpbonZgbTIXW2rKgZ__ump4qt4LMCVOCbQvB8Y1vMkqIuffiNAi6SegSm50VPdhV3x6SeL6Uiqh5FbIbwyAULx6tMytiYhydIquswImfucAO5V1OXNVmlDVlVpodgT62nsXmLTch7pA55tjrbOFyBDUZeNkI1C_yRwhRrL6RXPqVMJJX-CVavJUcybjPr35TuV0RhjvBVr-OyojGfjX9g5XG0OHawhBfKsBEc6VmsWpKpAGbykodMYWDRePJ51ja5E_hoVbVkN00FinY15Ki-vug4HkvyQ2tR_9EkVUGYJrtKzRGE04hOpitKelNSsBUF2clmWbVO4ck5ZxvwT1hCQl2H-HkyNbLG6WHPV0CzL6rfYEaOxxuPGcwXoTP_6k_NMHuGjrYPJin7KPkE15KcnqLEDJlLH7TiAwzJvlIzY5-5F91IKQJeVhGXGxBBSAWUKnBTp9Mse4keUv8e3SJ3L1wyuwyS0J0xu5chQPdPh6i6j94567Vp5_llzCbq-FBONSLNj9XaXnmVAAfGbtRCXyguQ6zMAQxPP5hQ76NoLoF5VUOlC4fxoWwk_mpDISzADDD8RcEGFmj4xQve735AoNa2adCRpkG6tk1zj022jMl00E9l3yp88f1EUEelxjwmtIe5yPWhPD-Ea1BYbBg5H3pS-1Pr-usHwvK6k1BYaQ_7GPOpJ8sHNdAfEXMfDyYBHKT4JdAvFm2Nx&uid=613c1834eba43a274b81688655605581&mguid=&gprice=ryaS1WrMldW6H_qNEikp24_lHAo18I0htTKQzyIO_E4&pb=d&uidct=1688655605581&uu=613c1834eba43a274b81688655605581&tst=1688656596232&ppvs=8&aps=4&rp=8&fs=2&bs=222&tss=23&caid=pc",
        redirect_url:
          "https://www.bepal.net/archives/318749?utm_source=popinad&utm_medium=paid&utm_campaign=230615yellowtail_sgk&a0v5la7bquf89=d88568e161b45df470a9dc07b5d796f3&uy3ubftvh0u6o8=c21b7ad361d2d2e617418d16368b2761&tripid=c21b7ad361d2d2e617418d16368b2761&xnfrr0ncac=977&zsmoi87pih9=trace.popin.cc&lzzgnpz8d=6e22bb022cd37340eb88f5c2f2512e40",
        redirect_url_short: "https://www.bepal.net/archives/318749",
        ad_company: "popin",
        site_company: "Google",
        mobile: 0,
        domain: "スポーツブル",
        position_top: 3271,
        position_left: 249,
        size_top: 4362,
        size_left: 1100,
        createtime: "2023-07-07 00:00:00",
        analysis: 0,
        createtime_format: "7/7 0時ごろ",
        position_top_per: 0,
        position_left_per: 0,
      };
      const ads = Array(20).fill(ad);

      return res.status(200).json({ ads });
    }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
