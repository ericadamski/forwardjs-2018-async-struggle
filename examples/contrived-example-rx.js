/* just for reference, I don't actually run */

const fs = require("fs");
const fetch = require("unfetch");
const { Observable } = require("rxjs");

const writeFile = Observable.bindNodeCallback(fs.writeFile); // This now returns an Observable!

writeFile("/tmp/a.file", "Some data")
  .switchMap(() =>
    fetch("https://somedata.io").then(response => response.json())
  )
  .switchMap(data => writeFile("/tmp/b.file", data))
  .subscribe(
    () => console.log("I've done it!"),
    err => console.log(`Oops. There was an error somewhere. ${err}`)
  );
