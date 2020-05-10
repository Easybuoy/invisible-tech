const axios = require("axios");
require("dotenv").config();

const { REACT_APP_API_KEY } = process.env;

const getUrlFromLocation = (locations) => {
  let locationUrls = [];
  locations.forEach((location) => {
    if (isNaN(location) === false) {
      locationUrls.push({
        name: location,
        url: `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${REACT_APP_API_KEY}`,
      });
    } else {
      locationUrls.push({
        name: location,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_APP_API_KEY}`,
      });
    }
  });
  return locationUrls;
};

const getUserLocationDetails = (locations) => {
  const locationUrls = getUrlFromLocation(locations);
  console.log(locationUrls);
  locationUrls.forEach((location) => {
    axios
      .get(location.url)
      .then((res) => console.log("res", res.data))
      .catch((err) =>
        console.log(`Unable to get location details for ${location.name}`)
      );
  });
};

console.log(
  getUserLocationDetails([" New York", 10005, "Tokyo", "São Paulo", "Pluto"])
);

module.exports = {
  getUrlFromLocation,
};
