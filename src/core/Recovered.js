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
  colors: ['green']
};
export default function Recovered(props) {
  const recovered = props.data.recovered == null ? 3226763 : props.data.recovered
  const todayRecovered = props.data.todayRecovered == null ? 463 : props.data.todayRecovered
  const hrecovered = props.history.recovered == null ? rows : props.history.recovered
  return (
    <div className="text-center shadow bg-body rounded" id="recovered">
      <p className="text-success"><strong>Recovered</strong></p>
      <h3 className="text-success">{(recovered).toLocaleString()}</h3>
      <Chart
        chartType="AreaChart"
        rows={hrecovered}
        height={50}
        columns={columns}
        options={options}
      />
      <span className="badge bg-success mb-1">+ {(todayRecovered).toLocaleString()}</span>
    </div>
  );
}