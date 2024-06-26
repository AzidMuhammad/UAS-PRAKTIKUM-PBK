<template>
  <div class="weather">
  <div class="container">
    <div class="weather__header">
      <form class="weather__search" @submit.prevent="searchCity">
        <input type="text" v-model="searchQuery" placeholder="Masukkan Nama Kota" class="weather__searchform">
        <span class="material-icons search-icon">search</span>
      </form>
      <div class="weather__units">
        <span :class="{ active: units === 'metric' }" @click="switchToCelsius">°C</span>
        <span :class="{ active: units === 'imperial' }" @click="switchToFahrenheit">°F</span>
      </div>
    </div>
    <div class="weather__body">
      <h1 class="weather__city">{{ weather.city }}</h1>
      <div class="weather__datetime">{{ weather.datetime }}</div>
      <div class="weather__forecast">{{ weather.forecast }}</div>
      <div class="weather__icon">
        <img :src="weather.icon" alt="Weather Icon">
      </div>
      <p class="weather__temperature">{{ weather.temperature }} ({{ weather.temperatureF }})</p>
      <div class="weather__minmax">
        <p>Min: {{ weather.min }} ({{ weather.minF }})</p>
        <p>Max: {{ weather.max }} ({{ weather.maxF }})</p>
      </div>
    </div>
    <div class="weather__info">
      <div class="weather__card">
        <span class="material-icons">device_thermostat</span>
        <div>
          <p>Suhu</p>
          <p class="weather__realfeel">{{ weather.realFeel }} ({{ weather.realFeelF }})</p>
        </div>
      </div>
      <div class="weather__card">
        <span class="material-icons">water_drop</span>
        <div>
          <p>Kelembapan</p>
          <p class="weather__humidity">{{ weather.humidity }}%</p>
        </div>
      </div>
      <div class="weather__card">
        <span class="material-icons">air</span>
        <div>
          <p>Angin</p>
          <p class="weather__wind">{{ weather.wind }}</p>
        </div>
      </div>
      <div class="weather__card">
        <span class="material-icons">speed</span>
        <div>
          <p>Tekanan</p>
          <p class="weather__pressure">{{ weather.pressure }} hPa</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'Weather',
  setup() {
    const searchQuery = ref('Pekanbaru');
    const units = ref('metric');
    const weather = ref({
      city: '',
      datetime: '',
      forecast: '',
      icon: '',
      temperature: '',
      temperatureF: '',
      min: '',
      minF: '',
      max: '',
      maxF: '',
      realFeel: '',
      realFeelF: '',
      humidity: '',
      wind: '',
      pressure: ''
    });

    const getWeather = async () => {
      try {
        const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery.value}&appid=${API_KEY}&units=${units.value}`);

        const data = response.data;
        const tempInCelsius = data.main.temp;
        const tempInFahrenheit = (tempInCelsius * 9/5) + 32;
        const minInCelsius = data.main.temp_min;
        const minInFahrenheit = (minInCelsius * 9/5) + 32;
        const maxInCelsius = data.main.temp_max;
        const maxInFahrenheit = (maxInCelsius * 9/5) + 32;
        const realFeelInCelsius = data.main.feels_like;
        const realFeelInFahrenheit = (realFeelInCelsius * 9/5) + 32;

        weather.value = {
          city: `${data.name}, ${convertCountryCode(data.sys.country)}`,
          datetime: convertTimeStamp(data.dt, data.timezone),
          forecast: data.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
          temperature: `${tempInCelsius.toFixed()}°`,
          temperatureF: `${tempInFahrenheit.toFixed()}°`,
          min: `${minInCelsius.toFixed()}°`,
          minF: `${minInFahrenheit.toFixed()}°`,
          max: `${maxInCelsius.toFixed()}°`,
          maxF: `${maxInFahrenheit.toFixed()}°`,
          realFeel: `${realFeelInCelsius.toFixed()}°`,
          realFeelF: `${realFeelInFahrenheit.toFixed()}°`,
          humidity: `${data.main.humidity}`,
          wind: `${data.wind.speed} ${units.value === 'imperial' ? 'mph' : 'm/s'}`,
          pressure: `${data.main.pressure}`
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const searchCity = () => {
      getWeather();
    };

    const switchToCelsius = () => {
      units.value = 'metric';
      getWeather();
    };

    const switchToFahrenheit = () => {
      units.value = 'imperial';
      getWeather();
    };

    const convertTimeStamp = (timestamp, timezone) => {
      const convertTimezone = timezone / 3600;
      const date = new Date(timestamp * 1000);

      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(convertTimezone)}`,
        hour12: true,
      };
      return date.toLocaleString('id', options);
    };

    const convertCountryCode = (country) => {
      let regionNames = new Intl.DisplayNames(['id'], { type: 'region' });
      return regionNames.of(country);
    };

    getWeather();

    return {
      searchQuery,
      units,
      weather,
      searchCity,
      switchToCelsius,
      switchToFahrenheit
    };
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.weather {
  overflow: hidden;
}

.container {
  background: #171717;
  color: #fff;
  padding: 20px;
  width: 70%;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px dotted whitesmoke;
  height: 560px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
}

.weather__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  border: 1px dotted whitesmoke;
  background: #1e1e1e;
  outline: none;
  color: #fff;
  padding: 0.5rem 2.5rem;
  border-radius: 5px;
}

input::placeholder {
  color: #fff;
}

.weather__search {
  position: relative;
  cursor: pointer;
}

.weather__searchform {
  font-size: 14px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 20px;
  color: #fff;
}

.weather__units {
  font-size: 1.2rem;
}

.weather__units span {
  cursor: pointer;
  margin-right: 0.5rem;
}

.weather__units span.active {
  font-weight: bold;
  text-decoration: dotted;
}

.weather__city {
  font-size: 26px; 
  margin: 0;
  margin-bottom: -20px;
  font-weight: bold;
}

.weather__body {
  text-align: center;
  margin-top: 1rem;
}

.weather__datetime {
  margin-bottom: 1rem;
  font-size: 14px;
}

.weather__forecast {
  background: #1e1e1e;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 15px; 
}

.weather__icon img {
  width: 80px; 
}

.weather__temperature {
  font-size: 1.25rem; 
  margin: 0.5rem 0;
}

.weather__minmax {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.weather__minmax p {
  font-size: 14px; 
  margin: 0.25rem 0;
}

.weather__info {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
}

.weather__card {
  background: #1e1e1e;
  flex-basis: 49%;
  padding: 10px; 
  border-radius: 10px; 
  display: flex;
  align-items: center;
  border: 2px dotted whitesmoke;
}

.weather__card span {
  font-size: 36px;
  margin-right: 10px;
}

.weather__card p {
  font-size: 14px;
  margin: 0; 
}

.weather__realfeel, .weather__humidity, .weather__wind, .weather__pressure {
  font-size: 12px;
  margin: 0; 
}

.weather__realfeel, .weather__humidity, .weather__wind, .weather__pressure {
  margin-top: 0.25rem;
}
</style>
