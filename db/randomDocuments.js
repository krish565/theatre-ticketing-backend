const moment = require("moment");
const plays = require("./plays.json");

function getRandomInteger(num) {
  return Math.floor(Math.random() * num);
}
function randomDocuments() {
  let numCustomers = 100;
  let startDate = +moment("1/1/2021", "DD-MM-YYYY").utc().format("x");
  let endDate = +moment("30/4/2021", "DD-MM-YYYY").utc().format("x");
  let msInDay = 24 * 60 * 60 * 1000;
  let dates = [];
  let tickets = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate += msInDay;
  }
  for (let index = 0; index < dates.length; index++) {
    let date = dates[index];
    let numPlaysOnDate = getRandomInteger(plays.length);
    for (let i = 0; i < numPlaysOnDate; i++) {
      let ind = getRandomInteger(plays.length);
      let performanceTitle = plays[ind];
      let customerName = "Customer " + getRandomInteger(numCustomers);
      let ticketPrice = 10 + ind;
      let performanceTime = +moment(date)
        .add(getRandomInteger(11), "hours")
        .add(getRandomInteger(59), "minutes")
        .format("x");
      let ticket = {
        creationDate: date,
        performanceTime,
        performanceTitle,
        customerName,
        ticketPrice,
      };
      tickets.push(ticket);
    }
  }
  return tickets;
}

module.exports = {
  randomDocuments,
};
