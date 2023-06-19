import { Pie, measureTextWidth } from "@ant-design/plots";
import React from "react";

const OrderStatus = () => {
  const data = [
    {
      type: "New Orders",
      value: 28.79,
    },
    {
      type: "Processed",
      value: 21.04,
    },
    {
      type: "Finished",
      value: 19.73,
    },
  ];

  const config = {
    appendPadding: 142,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    style: {
      height: "142px",
    },
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 0,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "16px",
          padding: 0,
          margin: 0,
        },
        content: "Orders",
      },
    },
  };

  return (
    <div>
      <Pie {...config} />
    </div>
  );
};

export default OrderStatus;
