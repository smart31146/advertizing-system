import { OutlineAds } from "@/types/ads";
import { Dispatch, SetStateAction } from "react";

type Props = {
  outlines: OutlineAds[]
  setOutlines: Dispatch<SetStateAction<OutlineAds[]>>
}

const AdList = ( {outlines, setOutlines}: Props ) => {
  return (
    <div>
      <p>広告一覧</p>
    </div>
  );
}

export default AdList;