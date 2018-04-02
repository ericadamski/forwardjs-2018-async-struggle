/* just for reference, I don't actually run */

const fs = require("fs");
const fetch = require("node-fetch");

console.log("I am about to write a file!");

fs.writeFile("/tmp/a.file", "Some things for the file", err => {
  if (err) return console.error("Oops, I broke.");

  console.log("I didn't break!");

  fetch("https://somedata.io", (err, data) => {
    if (err) return console.error("Oops, I broke while fetching");

    console.log("I got the data");

    fs.writeFile("/tmp/b.file", data, err => {
      if (err) return console.error("Oops, I broke again.");

      console.log("Please, no more! 😭");
    });
  });
});

console.log("I may not be done writing the file");
