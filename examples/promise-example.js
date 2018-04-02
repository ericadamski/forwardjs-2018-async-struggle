const fs = require('fs');

// ./fs-writeFile-promise
function writeFile(path, data, options = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, err => {
      if (err) reject(err);

      resolve();
    });
  });
}

console.log('I am about to write a file!');

writeFile('/tmp/a.file', 'Some things for the file')
  .catch(err => console.error('Oops, I broke.'))
  .then(() => console.log("I didn't break!"));

console.log('I may not be done writing the file');
