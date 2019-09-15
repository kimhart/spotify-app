import React from "react";

const PlayIcon = props => {
  const fill = props.fill || "#213279";
  return (
    <svg className="play-icon" width = "25px" height = "25px" viewBox = "0 0 25 25">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-559.000000, -613.000000)" fill={fill} fillRule="nonzero">
          <path d="M559.597726,637.922879 C559.441576,638.047864 559.222967,638.016617 559.082432,637.860387 C559.019972,637.782271 558.988743,637.688533 559.004357,637.579171 L559.004357,613.410264 C558.973128,613.207164 559.113662,613.03531 559.301042,613.004064 C559.410346,612.988441 559.504036,613.019687 559.597726,613.066556 L583.754064,625.205691 C584.081979,625.377545 584.081979,625.643137 583.754064,625.799368 L559.597726,637.922879 Z" id="Path"></path>
        </g>
      </g>
    </svg >
  );
};

export default PlayIcon;
