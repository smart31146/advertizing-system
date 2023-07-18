import { AdPastschartData, DetailAd } from "@/types/ads";
import { Grid, Link, Typography } from "@mui/material";
import CountCard from "./countCard";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Toaster, toast } from "react-hot-toast";
const DynamicStudyChart = dynamic(() => import("./adPastsChart"), {
  ssr: false,
});

type Props = {
  ad: DetailAd;
};

const Detail = ({ ad }: Props) => {
  const [pastsFormat, setPastsFormat] = useState<AdPastschartData>([]);
  const [during, setDuring] = useState<number>(7);

  useEffect(() => {
    setPastsFormat([]);
    const pastsFormat_: AdPastschartData = [];
    const length = ad.pasts.length;
    let displayNum = 0;
    if (length >= during) {
      displayNum = during;
    } else {
      displayNum = length;
      toast.error(
        `過去のデータが足ないため，全てのデータ(${length}日分)を表示しています．`
      );
      setDuring(length);
    }

    const pasts = ad.pasts.slice(-displayNum);
    pasts.forEach((past) => {
      const dateFormat = dayjs(past.date).format("MM/DD");
      const count = past.count;
      pastsFormat_.push({ dateFormat, count });
    });
    setPastsFormat(pastsFormat_);
  }, [ad, during]);

  const duringCount = (n: number) => {
    const length = ad.pasts.length;
    if (length >= 2 * n) {
      const pasts = ad.pasts.slice(-2 * n);
      const current = pasts.slice(n);
      const last = pasts.slice(0, n);
      const currentCount = current.reduce(
        (sum, current) => sum + current.count,
        0
      );
      const lastCount = last.reduce((sum, last) => sum + last.count, 0);
      return { currentCount, lastCount };
    } else if (length >= n) {
      const current = ad.pasts.slice(-n);
      const last = ad.pasts.slice(0, length - n);
      const currentCount = current.reduce(
        (sum, current) => sum + current.count,
        0
      );
      const lastCount = last.reduce((sum, last) => sum + last.count, 0);
      return { currentCount, lastCount };
    } else {
      const currentCount = ad.pasts.reduce(
        (sum, current) => sum + current.count,
        0
      );
      const lastCount = 0;
      return { currentCount, lastCount };
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <img src={ad.img} alt={ad.title} width="100%" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
          {ad.title}
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          掲載サイト &emsp;:{" "}
          <Link href={ad.site_company_url} underline="none">
            {ad.site_company_name}
          </Link>
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          広告会社 &emsp;&emsp;: {ad.ad_company_name}
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          掲載開始 &emsp;&emsp;: {ad.createtime_format}
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          広告URL &emsp;&emsp;&nbsp;:{" "}
          <Link href={ad.redirect_url} underline="none">
            {ad.redirect_url.slice(0, 30) + "..."}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard
          during={"本日"}
          count={duringCount(1).currentCount}
          lastCount={duringCount(1).lastCount}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard
          during={"過去3日"}
          count={duringCount(3).currentCount}
          lastCount={duringCount(3).lastCount}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard
          during={"過去1週間"}
          count={duringCount(7).currentCount}
          lastCount={duringCount(7).lastCount}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <CountCard
          during={"過去1ヶ月"}
          count={duringCount(30).currentCount}
          lastCount={duringCount(30).lastCount}
        />
      </Grid>
      <Grid item xs={12}>
        <DynamicStudyChart
          data={pastsFormat}
          during={during}
          setDuring={setDuring}
        />
      </Grid>
      <Toaster position="top-right" reverseOrder={false} />
    </Grid>
  );
};

export default Detail;
