import React from "react";

const PreviousIcon = props => {
  const fill = props.fill || "#213279";
  return (
    <svg className="previous-icon" width="13px" height="16px" viewBox="0 0 13 16">
      <g id="Table---Simplified" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="/playing" transform="translate(-460.000000, -619.000000)" fill={fill} fillRule="nonzero">
          <g id="next" transform="translate(466.500000, 627.000000) scale(-1, 1) translate(-466.500000, -627.000000) translate(460.000000, 619.000000)">
            <path d="M11,1.83759839 L11,7.30984241 L0.42,0.0716960065 C0.19,-0.0823071084 0,0.0203616349 0,0.297567242 L0,15.6978787 C0,15.9750843 0.19,16.08802 0.42,15.92375 L11,8.67533669 L11,14.1475807 L13,14.1475807 L13,1.82733152 L11,1.83759839 Z" id="Path"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default PreviousIcon;
