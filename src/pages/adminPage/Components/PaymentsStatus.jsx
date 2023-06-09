import { Pie } from "@ant-design/plots";
import React from "react";

const PaymentsStatus = () => {
  const data = [
    {
      type: "Not yet Paid",
      value: 40,
    },
    {
      type: "Already Paid",
      value: 60,
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
          fontSize: "14px",
          padding: 0,
          margin: 0,
        },
        content: "Payments",
      },
    },
  };

  return (
    <div>
      <Pie {...config} />
    </div>
  );
};

export default PaymentsStatus;
