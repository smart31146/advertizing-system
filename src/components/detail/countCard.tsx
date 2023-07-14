import { Card, CardContent, Icon, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type Props = {
  during: "本日" | "過去3日" | "過去1週間" | "過去1ヶ月";
  count: number;
  lastCount: number;
};

const CountCard = ({ during, count, lastCount }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="body1"
          fontWeight="bold"
          component="p"
          color="text.secondary"
        >
          {during}の表示回数
        </Typography>
        <Typography variant="h4" component="p" sx={{ my: 1 }}>
          {count}
          {lastCount < count ? (
            <Icon fontSize="large" color="success" sx={{ ml: 2 }}>
              <ArrowUpwardIcon />
            </Icon>
          ) : (
            <>
              {lastCount > count && (
                <Icon fontSize="large" color="error" sx={{ ml: 2 }}>
                  <ArrowDownwardIcon />
                </Icon>
              )}
            </>
          )}
        </Typography>
        <Typography variant="body2">前回: {lastCount}</Typography>
      </CardContent>
    </Card>
  );
};

export default CountCard;
