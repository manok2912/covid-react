import React from 'react';
import './App.css';
import logo from './logo.svg'
import Confirmed from './core/Confirmed';
import Active from './core/Active';
import Desceased from './core/Desceased';
import Recovered from './core/Recovered';
import getHttp from './data/api';
import Chart from "react-google-charts";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: logo,
      countries: [],
      country: "API",
      countryInfo: {},
      history: {},
      mapName: "confrimed",
      mapData: [['Country', 'Popularity']],
      mapColor: 'red',
      classCountry: 'World'
    };
  }

  async componentDidMount() {
    var res = await getHttp("countries");
    //console.log(res.data);
    const countries = res.data;
    this.setState({ countries });
    this.updateUI(this.state.country)
  }

  async updateUI(data) {
    const params = (data === 'API') ? "all" : "countries/" + data
    const history = (data === 'API') ? "historical/all" : "historical/" + data
    var res = await getHttp(params);
    var historyRes = await getHttp(history);
    //console.log(historyRes.data);
    var historyArray = {}
    if (historyRes.data.country) {
      //console.log("c");
      //console.log(historyRes.data);
      const cases = Object.entries(historyRes.data.timeline.cases);
      const recovered = Object.entries(historyRes.data.timeline.recovered);
      const deaths = Object.entries(historyRes.data.timeline.deaths);
      historyArray["cases"] = cases
      historyArray["recovered"] = recovered
      historyArray["deaths"] = deaths
      //console.log(historyArray);
    } else {
      //console.log("t");
      //console.log(historyRes.data);
      const cases = Object.entries(historyRes.data.cases);
      const recovered = Object.entries(historyRes.data.recovered);
      const deaths = Object.entries(historyRes.data.deaths);
      historyArray["cases"] = cases
      historyArray["recovered"] = recovered
      historyArray["deaths"] = deaths
      //console.log(historyArray);
    }
    this.setState({ history: historyArray });
    //console.log(data);
    //console.log(params);
    const countryInfo = res.data;
    const flagImg = countryInfo.countryInfo == null ? logo : countryInfo.countryInfo.flag
    const county = countryInfo.country == null ? "World" : countryInfo.country
    this.setState({ countryInfo, imgURL: flagImg, classCountry: county });
    this.UpdateMap()
  }

  handleCountryChange = event => {
    const country = event.target.value;
    console.log(event.target.value);
    this.setState({ country });
    this.updateUI(country)
  };

  handleEvent = async (event, typeData, c) => {
    console.log("I was clicked");
    //console.log(event);
    //console.log(event.currentTarget.parentNode.childNodes);
    var elements = event.currentTarget.parentNode.childNodes
    elements.forEach(function (element) {
      element.className = "col border-white border-4 border-start my-3 pointer"
    });
    //console.log(elements)
    //console.log(type);
    event.currentTarget.className += c;
    event.currentTarget.classList.remove("border-white")
    this.setState({ mapName: typeData })
    this.UpdateMap()
  };

  async UpdateMap() {
    var type = null
    var color = "red"
    var res = await getHttp("countries");
    //console.log(res.data)
    switch (this.state.mapName) {
      case "confrimed":
        type = "cases";
        color = "red"
        break;
      case "active":
        type = "active";
        color = "blue"
        break;
      case "recovered":
        type = "recovered";
        color = "green"
        break;
      case "desceased":
        type = "deaths";
        color = "grey"
        break;
      default:
        type = "cases";
        color = "red"
        break;
    }
    const total = this.state.countries.map(item => item[type]).reduce((prev, next) => prev + next);
    var array = [['Country', type, { type: 'string', role: 'tooltip' }]]
    for (var key in res.data) {
      var tool = {}
      var arr = []
      var obj = res.data[key];
      tool["v"] = obj.countryInfo.iso2
      tool["f"] = obj.country
      //console.log(tool)
      arr.push(tool)
      arr.push(obj[type])
      //console.log(obj[type])
      //console.log(total)
      var percentage = (obj[type] / total * 100).toFixed(2)
      var tooptext = percentage + " % of world"
      arr.push(tooptext)
      array.push(arr)
    }
    //console.log(array)
    this.setState({ mapData: array, mapColor: color });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row m-2">
          <div className="col">
            <div className="row">
              <div className="col-8">
                <h5>Covid-19 Tracker</h5>
                <span className="badge fs-6 bg-dark">{this.state.classCountry}</span>
              </div>
              <div className="col-4"><img src={this.state.imgURL} className="img-thumbnail" alt="..." width="65" height="50"></img></div>
            </div>
          </div>
          <div className="col-sm"></div>
          <div className="col-sm"></div>
          <div className="col-sm">
            <div className="form-floating">
              <select className="form-select"
                id="floatingSelect"
                aria-label="Floating select"
                value={this.state.country}
                onChange={this.handleCountryChange}
              >
                <option value="API" >World</option>
                {this.state.countries.map(({ countryInfo: { iso3 }, country }, index) => {
                  return (
                    <option key={index} value={iso3}>
                      {country}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingSelect">Countries</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="col border-4 border-start my-3 border-danger pointer" onClick={(e) => this.handleEvent(e, "confirmed", " border-danger")}><Confirmed data={this.state.countryInfo} history={this.state.history}></Confirmed></div>
            <div className="col border-white border-4 border-start my-3 pointer" onClick={(e) => this.handleEvent(e, "active", " border-primary")}><Active data={this.state.countryInfo} history={this.state.history}></Active></div>
            <div className="col border-white border-4 border-start my-3 pointer" onClick={(e) => this.handleEvent(e, "recovered", " border-success")}><Recovered data={this.state.countryInfo} history={this.state.history}></Recovered></div>
            <div className="col border-white border-4 border-start my-3 pointer" onClick={(e) => this.handleEvent(e, "desceased", " border-secondary")}><Desceased data={this.state.countryInfo} history={this.state.history}></Desceased></div>
          </div>
          <div className="col-9">
            <Chart
              chartType="GeoChart"
              data={this.state.mapData}
              loader={<div className="text-center">Loading Chart.......</div>}
              options={
                {
                  colorAxis: { colors: ["#fff", this.state.mapColor] },
                  tooltip: { showColorCode: true }
                }
              }
              rootProps={{ 'data-chartid': '1' }}
              mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;