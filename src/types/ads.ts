export type OutlineAd = {
  id: number;
  analysis: number;
  img: string;
  img_width: number;
  img_height: number;
  title: string;
  redirect_url: string;
  ad_company_name: string;
  site_company_name: string;
  site_company_url: string;
  mobile: number; // 0: PC, 1: Mobile
  createtime: string;
  createtime_format: string;
  position_top_per: number;
  position_left_per: number;
  position: AdPositions; //"全て" is for search. do not return.
};

export type SearchOutlineAds = {
  keyword: string;
  excludedKeyword: string;
  excludedDomain: string;
  duringStart: Date | null;
  duringEnd: Date | null;
  domein: string;
  adType: AdTypes;
  device: Devices;
  analysisRangeStart: number;
  analysisRangeEnd: number;
  page: number;
};

export type DetailAd = {
  id: number;
  analysis: number;
  img: string;
  img_width: number;
  img_height: number;
  title: string;
  redirect_url: string;
  ad_company_name: string;
  site_company_name: string;
  site_company_url: string;
  mobile: number; // 0: PC, 1: Mobile
  createtime: string;
  createtime_format: string;
  position_top_per: number;
  position_left_per: number;
  position: AdPositions; //"全て" is for search. do not return.
  pasts: { date: string; count: number }[];
};

export type AdPositions =
  | "全て"
  | "上-左"
  | "上-中"
  | "上-右"
  | "中-左"
  | "中-中"
  | "中-右"
  | "下-左"
  | "下-中"
  | "下-右";
export type AdTypes = "全て" | "テキスト広告" | "画像広告";
export type Devices = "全て" | "携帯" | "パソコン";
