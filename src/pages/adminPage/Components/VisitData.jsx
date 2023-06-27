import { Column } from "@ant-design/plots";
import React from "react";
import "./components.css";

const VisitData = () => {
  const data = [
    {
      type: "Januari",
      sales: 22,
    },
    {
      type: "Februari",
      sales: 54,
    },
    {
      type: "Maret",
      sales: 23,
    },
    {
      type: "April",
      sales: 44,
    },
    {
      type: "Mei",
      sales: 109,
    },
    {
      type: "Juni",
      sales: 54,
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
      <p className="sales-visit-title">Stores Visits Trend</p>
      <Column {...config} />
    </div>
  );
};

export default VisitData;
