import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Typography,
  useTheme,
} from "@mui/material";
import { AdPastschartData } from "@/types/ads";

type Props = {
  data: AdPastschartData;
  during: number;
  setDuring: Dispatch<SetStateAction<number>>;
};

const AdPastsChart = ({ data, during, setDuring }: Props) => {
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const theme = useTheme();
  const chartColor = theme.palette.primary.main;

  useEffect(() => {
    // @ts-ignore
    setCardWidth(cardRef.current ? cardRef.current.offsetWidth : 0);
  }, [cardRef]);

  return (
    <Card ref={cardRef} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
          mr: "40px",
        }}
      >
        <Typography variant="h6" sx={{ display: "inline-block", ml: "40px" }}>
          {during}日間の表示回数
        </Typography>
        <ButtonGroup variant="text" aria-label="during button group">
          <Button onClick={() => setDuring(7)}>7日間</Button>
          <Button onClick={() => setDuring(30)}>30日間</Button>
          <Button onClick={() => setDuring(100)}>100日間</Button>
        </ButtonGroup>
      </Box>
      <AreaChart
        width={cardWidth}
        height={cardWidth / 2}
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateFormat" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="count"
          stroke={chartColor}
          fill={chartColor}
          name="表示回数"
        />
      </AreaChart>
    </Card>
  );
};

export default AdPastsChart;
