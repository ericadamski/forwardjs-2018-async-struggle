const fs = require("fs");
const nodeFetch = require("node-fetch");
const { Observable } = require("rxjs");

const writeFile = Observable.bindNodeCallback(fs.writeFile);

function fetch() {
  return Observable.fromPromise(nodeFetch(...arguments)).switchMap(response =>
    response.json()
  );
}

fetch("https://api.github.com/gitignore/templates")
  .switch()
  .mergeMap(template =>
    fetch(`https://api.github.com/gitignore/templates/${template}`)
  )
  .mergeMap(({ name, source }) =>
    writeFile(`/tmp/templates/${name}.gitignore`, source).mapTo(name)
  )
  .subscribe(template => console.log(`Finished writing ${template}`));
