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
  vAxis:{
      textPosition:'none',
      gridlines:{ color: "#fff"},
      baselineColor: "#fff",
      minValue: 0
  },
  hAxis:{
      textPosition:'none',
      gridlines:{ color: "#fff"},
  },
  lineWidth:5,
  colors: ['red' ],
};
export default function Confirmed(props) {
  const todayCases = props.data.todayCases == null ? 656 : props.data.todayCases
  const cases = props.data.cases == null ? 4554367 : props.data.cases
  const hcases = props.history.cases == null ? rows : props.history.cases
  //console.log(hcases)
  return (
    <div className="text-center shadow bg-body rounded" id="confirmed">
        <p className="text-danger"><strong>Confirmed</strong></p>
        <h3 className="text-danger">{(cases).toLocaleString()}</h3>
        <Chart
          chartType="AreaChart"
          rows={hcases}
          height={50}
          columns={columns}
          options={options}
        />
        <span className="badge bg-danger mb-1">+ {(todayCases).toLocaleString()}</span>
    </div>
  );
}