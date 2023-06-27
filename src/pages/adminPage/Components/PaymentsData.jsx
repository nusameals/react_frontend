import { Area, Column } from "@ant-design/plots";
import "./components.css";

const PaymentsData = () => {
  const data = [
    {
      type: "Januari",
      sales: 38,
    },
    {
      type: "Februari",
      sales: 52,
    },
    {
      type: "Maret",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "Mei",
      sales: 48,
    },
    {
      type: "Juni",
      sales: 38,
    },
    {
      type: "Juli",
      sales: 38,
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
      <p className="sales-visit-title">Stores Sales Trend</p>
      <Column {...config} />
    </div>
  );
};

export default PaymentsData;
