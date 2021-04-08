import React from "react";
import Chart from "react-google-charts";
const columns = [
  {
    label: "date"
  },
  {
    label: "units",
  }
];
const rows = [[2015, 5], [2016, 10], [2018, 15]];
const options = {
  legend: 'none',
  vAxis: {
    textPosition: 'none',
    gridlines: { color: "#fff" },
    baselineColor: "#fff"
  },
  hAxis: {
    textPosition: 'none',
    gridlines: { color: "#fff" },
  },
  lineWidth: 5,
  colors: ['grey']
};
export default function Desceased(props) {
  const deaths = props.data.deaths == null ? 986524 : props.data.deaths
  const todayDeaths = props.data.todayDeaths == null ? 936 : props.data.todayDeaths
  const hdeaths = props.history.deaths == null ? rows : props.history.deaths
  return (
    <div className="text-center shadow bg-body rounded" id="desceased">
      <p className="text-secondary"><strong>Desceased</strong></p>
      <h3 className="text-secondary">{(deaths).toLocaleString()}</h3>
      <Chart
        chartType="AreaChart"
        rows={hdeaths}
        height={50}
        columns={columns}
        options={options}
      />
      <span className="badge bg-secondary mb-1">+ {(todayDeaths).toLocaleString()}</span>
    </div>
  );
}