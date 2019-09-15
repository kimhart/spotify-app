import React from "react";
import Soundwaves from "./soundwaves";

const SoundwaveBadge = (props) => {
  return (
    <div className={`soundwave-badge -size-${props.size}`}>
      <div className="soundwave-badge__inner">
        <Soundwaves />
      </div>
    </div>
  );
};
export default SoundwaveBadge;
