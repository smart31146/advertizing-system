import { DetailAd } from "@/types/ads";
import { Grid } from "@mui/material";
import CountCard from "./countCard";
import dynamic from "next/dynamic";
const DynamicStudyChart = dynamic(() => import("./studyChart"), { ssr: false });

type Props = {
  ad: DetailAd;
};

const Detail = ({ ad }: Props) => {
  console.log(ad);
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={3}>
        <CountCard during={"本日"} count={1} lastCount={19} />
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard during={"過去3日"} count={44} lastCount={31} />
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard during={"過去1週間"} count={74} lastCount={50} />
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard during={"過去1ヶ月"} count={268} lastCount={321} />
      </Grid>
      <Grid item xs={12}>
        <DynamicStudyChart />
      </Grid>
    </Grid>
  );
};

export default Detail;
