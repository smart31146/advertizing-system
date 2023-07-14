import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Props = {
  numbers: number[];
  setNumbers: Dispatch<SetStateAction<number[]>>;
};

const NumberRangePicker = ({ numbers, setNumbers }: Props) => {
  const [startNumber, setStartNumber] = useState<number | null>(numbers[0]);
  const [endNumber, setEndNumber] = useState<number | null>(numbers[1]);

  const handleNumberChange =
    (startOrEnd: "start" | "end") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const number = Number(e.target.value);
      if (startOrEnd === "start") {
        setStartNumber(number);
        if (number) {
          setNumbers([number, numbers[1]]);
        }
      }
      if (startOrEnd === "end") {
        setEndNumber(number);
        if (number) {
          setNumbers([numbers[0], number]);
        }
      }
    };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        label="表示回数(下限)"
        type="number"
        sx={{ flexGrow: 1 }}
        value={startNumber}
        onChange={handleNumberChange("start")}
        size="small"
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
      <TextField
        label="(上限)"
        type="number"
        sx={{ flexGrow: 1 }}
        value={endNumber}
        onChange={handleNumberChange("end")}
        size="small"
      />
    </Box>
  );
};

export default NumberRangePicker;
