/* just for reference, I don't actually run */

const fs = require('fs');
const fetch = require('unfetch');

function writeFile(path, data, options = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, err => {
      if (err) return reject(err);
        
      resolve();
    });
  });
}

async function() {
  try {
    await writeFile('/tmp/a.file', 'Some data')

    console.log("I didn't break");

    const data = await fetch('https://somedata.io')
      .then(response => response.json())

    console.log(`I got the data! ${data}`);

    await writeFile('/tmp/b.file', data);

    console.log("I've done it!");

  } catch(err) {
    console.log(`Oops. There was an error somewhere. ${err}`);
  }
}
