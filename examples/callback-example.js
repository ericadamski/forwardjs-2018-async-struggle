const fs = require('fs');

console.log('I am about to write a file!');

fs.writeFile('/tmp/a.file', 'Some things for the file', err => {
  if (err) return console.error('Oops, I broke.');

  console.log("I didn't break!");
});

console.log('I may not be done writing the file');
