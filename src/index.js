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

const getUserLocationDetails = (locations) => {
  const locationUrls = getUrlFromLocation(locations);

  locationUrls.forEach((location) => {
    axios
      .get(location.url)
      .then((res) => {
        // console.log("res", res.data);
        const {
          name,
          sys: { country, sunrise, sunset },
          main: { temp, humidity },
          weather,
          dt,
          wind: { speed },
          visibility,
        } = res.data;

        const date = new Date(dt * 1000);
        const time = date.toISOString().match(/(\d{2}:\d{2})/)[1];

        const sunriseDate = new Date(sunrise * 1000);
        const sunriseTime = sunriseDate.toISOString().match(/(\d{2}:\d{2})/)[1];

        const sunsetDate = new Date(sunset * 1000);
        const sunsetTime = sunsetDate.toISOString().match(/(\d{2}:\d{2})/)[1];

        console.log("\n");
        console.log(
          `The current temperature for ${name}/${country} as of ${time} is ${temp}°C with a ${weather[0].description} weather and humidity of ${humidity}%. The wind speed is ${speed}mph with visibility of ${visibility}metres, sunrise is at ${sunriseTime} whilst sunset is at ${sunsetTime}`
        );
        console.log("\n");
      })
      .catch((err) =>
        console.log(`Unable to get location details for ${location.name}`)
      );
  });
  return "loading location details... \n";
};

console.log(
  getUserLocationDetails([" New York", 10005, "Tokyo", "São Paulo", "Pluto"])
);

module.exports = {
  getUrlFromLocation,
};
