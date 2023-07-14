import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import studyDataList, { StudyData } from "./studyData";
import { Card } from "@mui/material";

type RechartsDotPayload = {
  cursor: string;
  cx: number;
  cy: number;
  dataKey: string;
  fill: string;
  index: number;
  r: number;
  stroke: string;
  strokeWidth: number;
  value: number;
  payload: StudyData;
};

const pStyle = {
  color: "blue",
};

const divStyle = {
  background: "linear-gradient(to right, #fff, #fff8)",
  fontWeight: "bold",
  border: "solid 2px blue",
};

const StudyChart = () => {
  const getAccuracy = (date: string): number => {
    // 日付から正解率を取得する
    for (let i = 0; i < studyDataList.length; i += 1) {
      if (studyDataList[i].date === date) {
        return studyDataList[i].正解率;
      }
    }
    // 該当する日のデータが無かった場合
    return 0;
  };

  const getMessage = (accuracy: number): string => {
    // 正解率に応じたメッセージを取得する
    let message = "";
    if (accuracy > 90) {
      message = "🎉大変よくできました🎊";
    } else if (accuracy <= 90 && accuracy > 70) {
      message = "🌸がんばりました🌼";
    } else {
      message = "🥺がんばりましょう🥺";
    }

    return message;
  };

  const handleClickXAxis = (event: never): void => {
    // eslint-disable-next-line dot-notation, no-alert
    alert(getMessage(getAccuracy(event["value"])));
  };

  const handleClickDot = (payload: unknown): void => {
    const dotPayload = payload as Record<keyof RechartsDotPayload, unknown>;
    const studyData = dotPayload.payload as Record<keyof StudyData, unknown>;
    if (typeof studyData.date === "string") {
      // eslint-disable-next-line no-alert
      alert(getMessage(getAccuracy(studyData.date)));
    }
  };

  return (
    <Card>
      <LineChart
        width={700}
        height={300}
        data={studyDataList}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 1" />
        <XAxis
          dataKey="date"
          interval={0}
          angle={-30}
          dx={-10}
          dy={5}
          tick={{
            fontSize: 10,
            fill: "#000",
            cursor: "pointer",
          }}
          onClick={handleClickXAxis}
        />
        <YAxis dataKey="問題数" tickCount={8} />
        <Line type="monotone" dataKey="問題数" stroke="#8054d8" unit="問" />
        <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" unit="問" />
        <Line
          type="monotone"
          dataKey="正解率"
          stroke="#ff0092"
          strokeWidth={2}
          unit="%"
          activeDot={{
            onClick: (_e, payload) => handleClickDot(payload),
            cursor: "pointer",
          }}
        />
        <Legend
          verticalAlign="top"
          height={30}
          iconSize={20}
          iconType="plainline"
        />
        <Tooltip
          contentStyle={divStyle}
          labelStyle={pStyle}
          separator=" "
          cursor={{ stroke: "blue", strokeWidth: 2 }}
        />
      </LineChart>
    </Card>
  );
};

export default StudyChart;
