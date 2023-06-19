import { Column } from "@ant-design/plots";
import React from "react";

const VisitData = () => {
  const data = [
    {
      type: "家具家电",
      sales: 22,
    },
    {
      type: "粮油副食",
      sales: 54,
    },
    {
      type: "生鲜水果",
      sales: 23,
    },
    {
      type: "美容洗护",
      sales: 44,
    },
    {
      type: "母婴用品",
      sales: 109,
    },
    {
      type: "进口食品",
      sales: 54,
    },
    {
      type: "食品饮料",
      sales: 24,
    },
    {
      type: "家庭清洁",
      sales: 56,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };
  return (
    <div>
      <Column {...config} />
    </div>
  );
};

export default VisitData;
