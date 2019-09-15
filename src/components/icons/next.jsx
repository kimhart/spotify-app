import React from "react";

const NextIcon = (props) => {
  const fill = props.fill || "#213279";
  return (
    <svg className="next-icon" width="12px" height="13px" viewBox="0 0 12 13">
      <g id="Tablet" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="/" transform="translate(-268.000000, -921.000000)" fill={fill} fillRule="nonzero">
          <g id="next" transform="translate(274.000000, 927.500000) scale(1, -1) translate(-274.000000, -927.500000) translate(268.000000, 921.000000)">
            <path d="M10.1538462,1.49304869 L10.1538462,5.93924695 L0.387692308,0.0582530053 C0.175384615,-0.0668745255 0,0.0165438284 0,0.241773384 L0,12.7545265 C0,12.979756 0.175384615,13.0715162 0.387692308,12.9380468 L10.1538462,7.04871106 L10.1538462,11.4949093 L12,11.4949093 L12,1.48470686 L10.1538462,1.49304869 Z" id="Path"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default NextIcon;
