const axios = require("axios");

module.exports = ({ url, method, data = "", headers = {} }) => {
  // console.log(`Hello, logging ${str}!`);
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      headers: headers,
      data: data,
    })
      .then((response) => {
        // console.log(response.status);
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          reject(error.response.data);
        } else if (error.request) {
          console.log("Server conection failed");
          reject(Responses.reponseData("001", "Could not reach server", []));
        } else {
          console.log("Error", error.message);
          reject(Responses.reponseData("001", "Unknown request error", []));
        }
      });
  });
};
