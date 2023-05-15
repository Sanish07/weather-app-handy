import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FetchWeatherData from "../services/FetchWeatherData";
import { Button, MenuItem, Select } from "@mui/material";
import { Navigation, NearMe,Place,Cloud,WbSunny,AcUnit,Thermostat,
    WbTwilight, Compress, WaterDrop, Visibility, Air} from "@mui/icons-material";
import { indigo } from '@mui/material/colors';

const Main = () => {
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [unit, setUnit] = useState("metric");

  const [measureUnit, setMeasureUnit] = useState({
    temp: "°C",
    wind: "m/s",
  });

  const [displayImage, setDisplayImage] = useState("no_data.jpg");

  const [response, setResponse] = useState({
    data : {
        cod : 1000
    }
  });

//   const [response, setResponse] = useState({
//     data: {
//       coord: {
//         lon: -82.3248,
//         lat: 29.6516,
//       },
//       weather: [
//         {
//           id: 800,
//           main: "Clear",
//           description: "clear sky",
//           icon: "01d",
//         },
//       ],
//       base: "stations",
//       main: {
//         temp: 19.08,
//         feels_like: 19.29,
//         temp_min: 17.73,
//         temp_max: 19.49,
//         pressure: 1021,
//         humidity: 86,
//       },
//       visibility: 10000,
//       wind: {
//         speed: 0,
//         deg: 0,
//       },
//       clouds: {
//         all: 0,
//       },
//       dt: 1684143800,
//       sys: {
//         type: 2,
//         id: 2007294,
//         country: "US",
//         sunrise: 1684147007,
//         sunset: 1684196081,
//       },
//       timezone: -14400,
//       id: 4156404,
//       name: "Gainesville",
//       cod: 200,
//     },
//   });

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    console.log(e.target.value);
    let newObj;
    if (e.target.value === "standard") {
      newObj = {
        temp: "K",
        wind: "m/s",
      };
      setMeasureUnit({ ...measureUnit, temp: newObj.temp, wind: newObj.wind });
    } else if (e.target.value === "imperial") {
      newObj = {
        temp: "°F",
        wind: "mph",
      };
      setMeasureUnit({ ...measureUnit, temp: newObj.temp, wind: newObj.wind });
    } else {
      newObj = {
        temp: "°C",
        wind: "m/s",
      };
      setMeasureUnit({ ...measureUnit, temp: newObj.temp, wind: newObj.wind });
    }
  };

  const handleDataChange = (e) => {
    switch (e.target.id) {
      case "city":
        setCityName(e.target.value);
        break;
      case "state":
        setStateName(e.target.value);
        break;
      case "country":
        setCountryName(e.target.value);
        break;
      default:
        console.log("No changes made.");
        break;
    }
  };

  const handleFetch = () => {
    let obj = {
      city: cityName,
      state: stateName,
      country: countryName,
      units: unit,
    };
    if (cityName.trim() === "") {
      setResponse({
        data: {
          cod: 1000,
        },
      });
    } else {
      const res = FetchWeatherData(obj)
        .then((result) => {
          setResponse(result);
          switch (result.data.weather[0].icon) {
            case "01d":
              setDisplayImage("clear_day_sky.jpeg");
              break;
            case "01n":
              setDisplayImage("clear_sky_night.jpg");
              break;
            case "02d":
              setDisplayImage("few_clouds_day.jpeg");
              break;
            case "02n":
              setDisplayImage("few_clouds_night.jpg");
              break;
            case "03d":
              setDisplayImage("scattered_day.jpg");
              break;
            case "03n":
              setDisplayImage("scattered_night.jpg");
              break;
            case "04d":
              setDisplayImage("broken_day.jpg");
              break;
            case "04n":
              setDisplayImage("broken_night.jpeg");
              break;
            case "09d":
              setDisplayImage("shower_day.jpg");
              break;
            case "09n":
              setDisplayImage("shower_night.jpg");
              break;
            case "10d":
              setDisplayImage("rain_day.jpg");
              break;
            case "10n":
              setDisplayImage("rain_night.jpg");
              break;
            case "11d":
              setDisplayImage("thunder_day.jpg");
              break;
            case "11n":
              setDisplayImage("thunder_night.jpg");
              break;
            case "13d":
              setDisplayImage("snow_day.jpeg");
              break;
            case "13n":
              setDisplayImage("snow_night.jpeg");
              break;
            case "50d":
              setDisplayImage("mist_day.jpg");
              break;
            case "50n":
              setDisplayImage("mist_night.jpg");
              break;
            default:
              setDisplayImage("no_data.jpg");
              break;
          }
          console.log(result);
        })
        .catch((err) => window.alert("Error Fetching the data. " + err));
      console.log(res);
    }
  };

  return (
    <>
      <div id="logo-area"><span>Handy</span> Now</div>
      <div id="input-area">
        <TextField
          id="city"
          label={"City Name"}
          type="text"
          onChange={handleDataChange}
          variant="outlined"
          size="small"
        />
        <TextField
          id="state"
          label={"State Name"}
          type="text"
          onChange={handleDataChange}
          variant="outlined"
          size="small"
        />
        <TextField
          id="country"
          label={"Country Name"}
          type="text"
          onChange={handleDataChange}
          variant="outlined"
          size="small"
        />
        <Select
          id="unit-m"
          onChange={handleUnitChange}
          defaultValue={"metric"}
          size="small"
          variant="outlined"
        >
          <MenuItem value={"standard"}>Standard (Kelvin)</MenuItem>
          <MenuItem value={"metric"}>Metric (Celcius)</MenuItem>
          <MenuItem value={"imperial"}>Imperial (Fahreneit)</MenuItem>
        </Select>
        <Button id="sub-btn" onClick={handleFetch} variant="contained">
          {" "}
          Get Weather Data!{" "}
        </Button>
      </div>
      <div id="display-area">
        {response.data.cod === 200 ? (
          <>
            <img
              src={`card-images/${displayImage}`}
              id="display-img"
              alt="status-img"
            ></img>
            <p>
              <span>
                <strong>
                  <Place fontSize="small" className="mini-icon" size="small" />
                  &nbsp; Location Details : {response.data.name},{" "}
                  {response.data.sys.country}
                </strong>
              </span>
              <br/><br/><br/><br/>
              <div id="weather-details">
              <span>
                <Navigation
                  fontSize="small"
                  className="mini-icon"
                  size="small"
                />{" "}
                Latitude : {response.data.coord.lat}{" "}
              </span>
              <span>
                <NearMe fontSize="small" className="mini-icon" size="small" />{" "}
                Longtitude : {response.data.coord.lon}{" "}
              </span>{" "}
              
              <span>
                <WbTwilight
                  fontSize="small"
                  className="mini-icon"
                  size="small"
                />
                &nbsp; Main : {response.data.weather[0].main}{" "}
              </span>
              <span>
                <Cloud fontSize="small" className="mini-icon" size="small" />
                &nbsp; Description : {response.data.weather[0].description}{" "}
              </span>
              <span>
                <Thermostat
                  fontSize="small"
                  className="mini-icon"
                  size="small"
                />{" "}
                Tempearture : {response.data.main.temp}
                {measureUnit.temp}{" "}
              </span>
              <span>
                <AcUnit fontSize="small" className="mini-icon" size="small" />{" "}
                Min Tempearture : {response.data.main.temp_min}
                {measureUnit.temp}{" "}
              </span>
              <span>
                <WbSunny fontSize="small" className="mini-icon" size="small" />{" "}
                Max Tempearture : {response.data.main.temp_max}
                {measureUnit.temp}{" "}
              </span>
              <span>
                <Compress
                  fontSize="small"
                  className="mini-icon"
                  size="small"
                />{" "}Pressure : {response.data.main.pressure}hPa{" "}
              </span>
              <span>
                <WaterDrop
                  fontSize="small"
                  className="mini-icon"
                  size="small"
                />{" "}Humidity : {response.data.main.humidity}%{" "}
              </span>
              <span>
                <Visibility
                  fontSize="small"
                  className="mini-icon"
                  size="small"
                />{" "}Visibilty : {response.data.visibility / 1000}km{" "}
              </span>
              <span>
                <Air fontSize="small" className="mini-icon" size="small" /> Wind
                Speed : {response.data.wind.speed}
                {measureUnit.wind}
              </span>
              </div>
            </p>{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Main;
