import Axios from 'axios';

const FetchWeatherData = ({ city, state, country, units }) => {
    let appid = "917d96819d5fc0a46884f234d7047670";
    let location = city;

    if(state.trim() !== "") location += `,${state}`;
    if(country.trim() !== "") location += `,${country}`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}&units=${units}`;
    
    const apiResponse = Axios.get(url);

    return apiResponse;
}

export default FetchWeatherData;