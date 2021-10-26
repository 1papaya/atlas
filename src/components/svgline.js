import React from "react";

const SvgLine = (props) => {
  return (
    <svg className={props.className} style={{ width: props.width, height: props.height, ...props.style }}>
      {props.lines.map((line, idx) => {
        let lnY = (props.height - line.strokeWidth) / 2;
        return (
          <line key={idx} x1={0} x2={"100%"} y1={lnY} y2={lnY} {...line}></line>
        );
      })}
    </svg>
  );
};

SvgLine.defaultProps = {
  width: 12,
  height: 12,
  lines: [
    {
      strokeWidth: 2,
      stroke: "#fff",
    },
    {
      strokeWidth: 1,
      stroke: "#000",
    },
  ],
  style: {},
  className: ""
};

export default SvgLine;
