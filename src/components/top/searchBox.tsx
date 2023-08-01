import { AdTypes, Devices, OutlineAd, SearchOutlineAds } from "@/types/ads";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DateRangePicker from "../parts/dateRangePicker";
import NumberRangePicker from "../parts/numberRangePicker";
import axios from "axios";
import { OutlineAdsResponse } from "@/pages/api/ad/get_outline";

type SimpleDurings =
  | "全期間"
  | "本日"
  | "昨日"
  | "過去3日間"
  | "過去7日間"
  | "過去30日間";

const simpleDuring2Date = (simpleDuring: SimpleDurings): Date[] => {
  const today = new Date();
  const yesterday = new Date();
  const threeDaysAgo = new Date();
  const sevenDaysAgo = new Date();
  const thirtyDaysAgo = new Date();
  switch (simpleDuring) {
    case "全期間":
      return [new Date(), new Date()];
    case "本日":
      return [today, today];
    case "昨日":
      yesterday.setDate(today.getDate() - 1);
      return [yesterday, today];
    case "過去3日間":
      threeDaysAgo.setDate(today.getDate() - 3);
      return [threeDaysAgo, today];
    case "過去7日間":
      sevenDaysAgo.setDate(today.getDate() - 7);
      return [sevenDaysAgo, today];
    case "過去30日間":
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return [thirtyDaysAgo, today];
    default:
      return [new Date(), new Date()];
  }
};

type SearchBoxProps = {
  outlines: OutlineAd[];
  setOutlines: Dispatch<SetStateAction<OutlineAd[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPageCount: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const SearchBox = ({
  outlines,
  setOutlines,
  page,
  setPage,
  setPageCount,
  setLoading,
}: SearchBoxProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [simpleDuring, setSimpleDuring] = useState<SimpleDurings>("全期間");
  const [excludedKeyword, setExcludedKeyword] = useState<string>("");
  const [excludedDomain, setExcludedDomain] = useState<string>("");
  const [during, setDuring] = useState<(Date | null)[]>([null, null]);
  const [domein, setDomein] = useState<string>("");
  const [adType, setAdType] = useState<AdTypes>("全て");
  const [device, setDevice] = useState<Devices>("全て");
  const [analysisRange, setAnalysisRange] = useState<number[]>([0, 100000]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const searchData: SearchOutlineAds = {
      keyword,
      excludedKeyword,
      excludedDomain,
      duringStart: during[0],
      duringEnd: during[1],
      domein,
      adType,
      device,
      analysisRangeStart: analysisRange[0],
      analysisRangeEnd: analysisRange[1],
      page: page,
    };
    try {
    const res = await axios.get<OutlineAdsResponse>("/api/ad/get_outline", {
      params: searchData,
    });
    if (res.data && "ads" in res.data) {
      setOutlines(res.data.ads);
      setPageCount(Math.ceil(res.data.total / 100));
    } else if (res.data && "error" in res.data) {
      console.error(res.data.error);
    }
  } 
  catch (error) {
    console.error(error);
  }
    console.log(outlines);
    setLoading(false);
  }; 

  useEffect(() => {
    setDuring(simpleDuring2Date(simpleDuring));
  }, [simpleDuring]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchButton = () => {
    setPage(1);
    getData();
  };

  return (
    <Card>
      <Box>
        <Accordion expanded={isExpanded}>
          <AccordionSummary>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="キーワード検索"
                  placeholder="広告文章から検索します"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={8} md={4}>
                <TextField
                  select
                  label="掲載日"
                  value={simpleDuring}
                  onChange={(e) =>
                    setSimpleDuring(e.target.value as SimpleDurings)
                  }
                  fullWidth
                  size="small"
                >
                  <MenuItem value="全期間">全期間</MenuItem>
                  <MenuItem value="本日">本日</MenuItem>
                  <MenuItem value="昨日">昨日</MenuItem>
                  <MenuItem value="過去3日間">過去3日間</MenuItem>
                  <MenuItem value="過去7日間">過去7日間</MenuItem>
                  <MenuItem value="過去30日間">過去30日間</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={3} sm={2} md={1}>
                <Button
                  variant="outlined"
                  onClick={() => setIsExpanded(!isExpanded)}
                  fullWidth
                >
                  詳細
                </Button>
              </Grid>
              <Grid item xs={3} sm={2} md={1}>
                <Button
                  variant="contained"
                  onClick={() => handleSearchButton()}
                  fullWidth
                >
                  検索
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="除外キーワード"
                  placeholder="検索から除外するキーワード"
                  value={excludedKeyword}
                  onChange={(e) => setExcludedKeyword(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="除外ドメイン"
                  placeholder="検索から除外するドメイン"
                  value={excludedDomain}
                  onChange={(e) => setExcludedDomain(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateRangePicker during={during} setDuring={setDuring} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="ドメインを指定"
                  placeholder="販売ページのドメインを検索できます"
                  value={domein}
                  onChange={(e) => setDomein(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  select
                  label="広告タイプ"
                  value={adType}
                  onChange={(e) => setAdType(e.target.value as AdTypes)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="全て">全て</MenuItem>
                  <MenuItem value="テキスト広告">テキスト広告</MenuItem>
                  <MenuItem value="画像広告">画像広告</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={2} lg={3}>
                <TextField
                  select
                  label="デバイス"
                  value={device}
                  onChange={(e) => setDevice(e.target.value as Devices)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="全て">全て</MenuItem>
                  <MenuItem value="携帯">携帯</MenuItem>
                  <MenuItem value="パソコン">パソコン</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <NumberRangePicker
                  numbers={analysisRange}
                  setNumbers={setAnalysisRange}
                />
              </Grid>
              <Grid item xs={6} md={4}></Grid>
              <Grid item xs={6} md={4}></Grid>
              <Grid item xs={12} md={4}></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Card>
  );
};

export default SearchBox;
