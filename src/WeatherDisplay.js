import React from "react"

class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial"; 
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} в {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Текущая: {weatherData.main.temp}°</p>
        <p>Максимальная: {weatherData.main.temp_max}°</p>
        <p>Минимальная: {weatherData.main.temp_min}°</p>
        <p>Скорость ветра: {weatherData.wind.speed} mi/hr</p>
        <p>Атмосферное давление на уровне моря: {weatherData.main.grnd_level} </p>
      </div>
    );
  }
}

export default WeatherDisplay;