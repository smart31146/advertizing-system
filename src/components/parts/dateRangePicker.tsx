import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  during: (Date | null)[];
  setDuring: Dispatch<SetStateAction<(Date | null)[]>>;
};

const DateRangePicker = ({ during, setDuring }: Props) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    during[0] ? dayjs(during[0]) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    during[1] ? dayjs(during[1]) : null
  );

  const handleDateChange =
    (startOrEnd: "start" | "end") => (date: Dayjs | null) => {
      if (startOrEnd === "start") {
        setStartDate(date);
        if (date) {
          setDuring([date.toDate(), during[1]]);
        } else {
          setDuring([null, during[1]]);
        }
      }
      if (startOrEnd === "end") {
        setEndDate(date);
        if (date) {
          setDuring([during[0], date.toDate()]);
        } else {
          setDuring([during[0], null]);
        }
      }
    };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <DatePicker
        label="詳細期間指定(開始)"
        sx={{ flexGrow: 1 }}
        value={startDate}
        onChange={handleDateChange("start")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="p">
          〜
        </Typography>
      </Box>
      <DatePicker
        label="(終了)"
        sx={{ flexGrow: 1 }}
        value={endDate}
        onChange={handleDateChange("end")}
      />
    </Box>
  );
};

export default DateRangePicker;
