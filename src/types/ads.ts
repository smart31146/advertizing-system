export type OutlineAd = {
  id: number;
  analysis: number;
  access_site_id: number;
  img: string;
  title: string;
  url: string;
  redirect_url: string;
  redirect_url_short: string;
  ad_company: string;
  site_company: string;
  mobile: number;
  domain: string;
  position_top: number;
  position_left: number;
  size_top: number;
  size_left: number;
  createtime: string;
  createtime_format: string;
  position_top_per: number;
  position_left_per: number;
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
  access_site_id: number;
  img: string;
  title: string;
  url: string;
  redirect_url: string;
  redirect_url_short: string;
  ad_company: string;
  site_company: string;
  mobile: number;
  domain: string;
  position_top: number;
  position_left: number;
  size_top: number;
  size_left: number;
  createtime: string;
  pasts: { date: string; count: number }[];
};

export type AdTypes = "全て" | "テキスト広告" | "画像広告";
export type Devices = "全て" | "携帯" | "パソコン";
