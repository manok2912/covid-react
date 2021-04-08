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
  colors: ['blue']
};
export default function Active(props) {
  const active = props.data.active == null ? 834733 : props.data.active
  const todayCases = props.data.todayCases == null ? "000000" : props.data.todayCases
  const todayDeaths = props.data.todayDeaths == null ? "000000" : props.data.todayDeaths
  const todayRecovered = props.data.todayRecovered == null ? "0000000" : props.data.todayRecovered
  const todayActive = todayCases + (todayDeaths - todayRecovered)
  return (
    <div className="text-center shadow bg-body rounded" id="active">
      <p className="text-primary"><strong>Active</strong></p>
      <h3 className="text-primary">{(active).toLocaleString()}</h3>
      <Chart
        chartType="AreaChart"
        rows={rows}
        height={50}
        columns={columns}
        options={options}
      />
      <span className="badge bg-primary mb-1">+ {(todayActive).toLocaleString()}</span>
    </div>
  );
}