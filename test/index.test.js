const { getUrlFromLocation, getTimeFromTimeStamp } = require("../src");
const chai = require("chai");

const { expect } = chai;
describe("Weather", () => {
  it("tests the getUrlFromLocation function", (done) => {
    const locations = ["New_York", 10005];

    const expectedResponse = [
      {
        name: "New_York",
        url:
          "https://api.openweathermap.org/data/2.5/weather?q=New_York&appid=8712313176531723517631&units=metric",
      },
      {
        name: 10005,
        url:
          "https://api.openweathermap.org/data/2.5/weather?zip=10005&appid=8712313176531723517631&units=metric",
      },
    ];
    expect(getUrlFromLocation(locations).length).to.equals(2);
    // expect(getUrlFromLocation(locations)).to.equals(expectedResponse);
    done();
  });

  it("tests the getTimeFromTimeStamp function", (done) => {
    const locations = ["New_York", 10005];

    const expectedResponse = "06:46";
    expect(getTimeFromTimeStamp(1589131205199)).to.equals(expectedResponse);
    done();
  });
});
