const axios = require("axios");
require("dotenv").config();

const { REACT_APP_API_KEY } = process.env;

const getUrlFromLocation = (locations) => {
  let locationUrls = [];
  locations.forEach((location) => {
    if (isNaN(location) === false) {
      locationUrls.push({
        name: location,
        url: `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${REACT_APP_API_KEY}&units=metric`,
      });
    } else {
      locationUrls.push({
        name: location,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_APP_API_KEY}&units=metric`,
      });
    }
  });
  return locationUrls;
};

const getTimeFromTimeStamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const time = date.toISOString().match(/(\d{2}:\d{2})/)[1];
  return time;
};

const getUserLocationDetails = (locations) => {
  const locationUrls = getUrlFromLocation(locations);

  locationUrls.forEach((location) => {
    axios
      .get(location.url)
      .then((res) => {
        const {
          name,
          sys: { country, sunrise, sunset },
          main: { temp, humidity },
          weather,
          dt,
          wind: { speed },
          visibility,
        } = res.data;

        const time = getTimeFromTimeStamp(dt);
        const sunriseTime = getTimeFromTimeStamp(sunrise);
        const sunsetTime = getTimeFromTimeStamp(sunset);

        console.log("\n");
        console.log(
          `The current temperature for ${name}/${country} as of ${time} is ${temp}°C with a ${weather[0].description} weather and humidity of ${humidity}%. The wind speed is ${speed}mph with visibility of ${visibility}metres, sunrise is at ${sunriseTime} whilst sunset is at ${sunsetTime}`
        );
      })
      .catch(() => {
        console.log("\n");
        console.log(`Unable to get location details for ${location.name}`);
      });
  });
  return "loading location details... \n";
};

console.log(
  getUserLocationDetails([" New York", 10005, "Tokyo", "São Paulo", "Pluto"])
);

module.exports = {
  getUrlFromLocation,
};
