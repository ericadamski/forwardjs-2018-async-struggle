/* just for reference, I don't actually run */

const fs = require("fs");
const fetch = require("unfetch");

function writeFile(path, data, options = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, err => {
      if (err) return reject(err);

      resolve();
    });
  });
}

writeFile("/tmp/a.file", "Some data")
  .then(() => {
    console.log("I didn't break");

    return fetch("https://somedata.io");
  })
  .then(response => response.json())
  .then(data => {
    console.log(`I got the data! ${data}`);

    return writeFile("/tmp/b.file", data);
  })
  .then(() => console.log("I've done it!"))
  .catch(err => console.log(`Oops. There was an error somewhere. ${err}`));
