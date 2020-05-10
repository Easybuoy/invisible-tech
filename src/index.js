require('dotenv').config();

const {REACT_APP_API_KEY} = process.env;

console.log(REACT_APP_API_KEY);

const getUserLocationDetails = (locations) => {
    const locationUrls = getUrlFromLocation(locations);
    console.log(locationUrls)
    // Promise.all(locations)
}

 const getUrlFromLocation = (locations) => {
    l
}

console.log(getUserLocationDetails([{location_name: 'New York', postal_code: 10005}]))

module.exports = {
    getUrlFromLocation
}