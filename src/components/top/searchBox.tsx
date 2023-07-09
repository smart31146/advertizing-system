import { OutlineAds } from "@/types/ads";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  outlines: OutlineAds[]
  setOutlines: Dispatch<SetStateAction<OutlineAds[]>>
}

const SearchBox = ( {outlines, setOutlines}: Props ) => {

  useEffect(() => {
    console.log("outlines", outlines)
  }, [])
  return (
    <div>あああ</div>
  )
}

export default SearchBox;