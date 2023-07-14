import { OutlineAd } from "@/types/ads";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  outlines: OutlineAd[];
  setOutlines: Dispatch<SetStateAction<OutlineAd[]>>;
};

const AdList = ({ outlines, setOutlines }: Props) => {
  useEffect(() => {
    setOutlines([...outlines]);
  }, []);

  return (
    <div>
      <p>広告一覧</p>
    </div>
  );
};

export default AdList;
