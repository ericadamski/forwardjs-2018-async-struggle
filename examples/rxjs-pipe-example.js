const fs = require("fs");
const nodeFetch = require("node-fetch");
const { fromPromise } = require("rxjs/observable/fromPromise");
const { bindNodeCallback } = require("rxjs/observable/bindNodeCallback");
const { switchMap, mergeMap, mapTo, retry } = require("rxjs/operators");
require("rxjs/add/operator/switch");
require("rxjs/add/operator/catch");

const writeFile = bindNodeCallback(fs.writeFile);

function fetch() {
  return fromPromise(nodeFetch(...arguments)).pipe(
    switchMap(response => response.json())
  );
}

fetch("https://api.github.com/gitignore/templates")
  .switch()
  .pipe(
    mergeMap(template =>
      fetch(`https://api.github.com/gitignore/templates/${template}`)
    ),
    mergeMap(({ name, source }) =>
      writeFile(`/tmp/templates/${name}.gitignore`, source).pipe(mapTo(name))
    )
  )
  .subscribe(template => console.log(`Finished writing ${template}`));
