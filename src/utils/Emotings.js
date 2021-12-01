import React from "react";
import Euphoric from "../assets/emotings/euphoric.gif";
import Happy from "../assets/emotings/happy.gif";
import Thrilled from "../assets/emotings/thrilled.gif";
import Funny from "../assets/emotings/funny.gif";
import Bored from "../assets/emotings/bored.gif";
import Angry from "../assets/emotings/angry.gif";
import Sad from "../assets/emotings/sad.gif";
import Depressed from "../assets/emotings/depressed.gif";
import Image from "./shared/Image";
import { Tooltip } from "@mui/material";
import * as _ from 'lodash'
const emotions = {
  Euphoric: {
    emotion: "Euphoric",
    image: Euphoric,
  },
  Happy: {
    emotion: "Happy",
    image: Happy,
  },
  Funny: {
    emotion: "Funny",
    image: Funny,
  },
  Thrilled: {
    emotion: "Thrilled",
    image: Thrilled,
  },
  Bored: {
    emotion: "Bored",
    image: Bored,
  },
  Angry: {
    emotion: "Angry",
    image: Angry,
  },
  Sad: {
    emotion: "Sad",
    image: Sad,
  },
  Depressed: {
    emotion: "Depressed",
    image: Depressed,
  },
};

export default function Emotings({ variant, id, size = "30px" }) {
  const emotion = emotions[variant]
  if(!_.has(emotions, variant)){
    return null
  }
  return (
    <Tooltip key={emotion.emotion} title={emotion?.emotion.toUpperCase()} placement="bottom">
      <div
        style={{
          height: size,
          width: size,
        }}
      >
        <Image imagePath={emotion.image} />
      </div>
    </Tooltip>
  );
}
