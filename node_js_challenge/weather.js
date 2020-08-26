const https = require('https');
const http = require('http');
const querystring = require('querystring');
const api = require('./api.json');

// Print out temp details
const printMessage = (place, temp) => {
  const message = `Current temperature in ${place} is ${temp}F`
  console.log(message);
}
// Print out error message
const printError = error => {
  console.error(error.message);
}

const get = query => {
  try {
    const parameters = {
      APPID: api.key,
      units: 'imperial'
    };

    const zipCode = parseInt(query);
    if (!isNaN(zipCode)) {
      parameters.zip = zipCode + ',us';
    } else {
      parameters.q = query + ',us';
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;

    const request = https.get(url, response => {
      if (response.statusCode === 200) {
        let body = "";
        // Read the data
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
          try {
            //Parse data
            const data = JSON.parse(body);
            // console.log(data);
            //Print the data
            printMessage(data.name, data.main.temp);
          } catch(error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the data for ${query} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
};

module.exports.get = get;
