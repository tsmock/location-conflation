[![npm version](https://badge.fury.io/js/%40ideditor%2Flocation-conflation.svg)](https://badge.fury.io/js/%40ideditor%2Flocation-conflation)
[![Build Status](https://travis-ci.org/ideditor/location-conflation.svg?branch=master)](https://travis-ci.org/ideditor/location-conflation)


# location-conflation

🧩 Define complex geographic regions by including and excluding country codes and geojson shapes.


### What is it?

**Location-conflation** is a tool for generating [GeoJSON](https://geojson.org/) features by
including and excluding other locations and shapes.

⚡️ Try it now!:  https://ideditor.github.io/location-conflation/


You can define a *location set* as an Object with `include` and `exclude` properties:
```js
let locationSet = {
  include: [ Array of locations ],
  exclude: [ Array of locations ]
};
```

The "locations" can be any of the following:
* Strings recognized by the [country-coder library](https://github.com/ideditor/country-coder#readme). These should be [ISO 3166-1 2 or 3 letter country codes](https://en.wikipedia.org/wiki/List_of_countries_by_United_Nations_geoscheme) or [UN M.49 numeric codes](https://en.wikipedia.org/wiki/UN_M49).<br/>_Example: `"de"`_
* Filenames for `.geojson` features. If you want to use your own features, pass them to the LocationConflation constructor in a `FeatureCollection` - each `Feature` must have an `id` that ends in `.geojson`.<br/>_Example: `"de-hamburg.geojson"`_
* Points as `[longitude, latitude]` coordinate pairs.  A 25km radius circle will be computed around the point.<br/>_Example: `[8.67039, 49.41882]`_


## Usage

To install location-conflation as a dependency in your project:
```bash
$  npm install --save @ideditor/location-conflation
```

**location-conflation** is distributed in both UMD and ES6 module formats for maxmimum compatibility. ([Read more about Javascript module formats](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm))
* `index.mjs`  - ES6 module
* `dist/index.js` - UMD module, ES6 syntax
* `dist/index.es5.js` - UMD module, ES5 syntax

Whether you require or import it, it should just work.

```js
const LocationConflation = require('@ideditor/location-conflation');    // UMD import all
// or
import * as LocationConflation from '@ideditor/location-conflation';    // ES6 import all
```

You can also use **location-conflation** directly in a web browser. A good way to do this is to fetch the file from the [jsDelivr CDN](https://www.jsdelivr.com/), which can even deliver minified versions.

The latest versions of many web browsers now support [ES6 modules in script tags](https://caniuse.com/#feat=es6-module) like this:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@ideditor/location-conflation@0/index.min.mjs"></script>
```

Older versions of modern ES6-capable browsers can still load the UMD build:
```html
<script src="https://cdn.jsdelivr.net/npm/@ideditor/location-conflation@0/dist/index.min.js"></script>
```

Or if you need to support even older browsers like Internet Explorer, fetch the ES5 version:
```html
<script src="https://cdn.jsdelivr.net/npm/@ideditor/location-conflation@0/dist/index.es5.min.js"></script>
```

&nbsp;

### Examples
```js
const LocationConflation = require('@ideditor/location-conflation');
const myFeatures = require('./path/to/FeatureCollection.json');   // optional
const loco = new LocationConflation(myFeatures);
```

#### Southern Europe:
```js
let result = loco.resolveLocationSet({ include: ['039'] });   // 039 = Southern Europe
```
<img width="800px" alt="Southern Europe" src="https://raw.githubusercontent.com/ideditor/location-conflation/master/docs/images/example1.png"/>


#### Southern Europe and Northern Africa:
```js
let result = loco.resolveLocationSet({ include: ['039','015'] });   // 015 = Northern Africa
```
<img width="800px" alt="Southern Europe and Northern Africa" src="https://raw.githubusercontent.com/ideditor/location-conflation/master/docs/images/example2.png"/>


#### Southern Europe and Northern Africa, _excluding_ Egypt and Sudan:
```js
let result = loco.resolveLocationSet({ include: ['039','015'], exclude: ['eg','sd'] });
```
<img width="800px" alt="Southern Europe and Northern Africa, excluding Egypt and Sudan" src="https://raw.githubusercontent.com/ideditor/location-conflation/master/docs/images/example3.png"/>


#### The Alps, _excluding_ Liechtenstein and regions around Bern and Zürich
```js
let result = loco.resolveLocationSet({ include: ['alps.geojson'], exclude: ['li', [8.55,47.36], [7.45,46.95]] });
```
<img width="800px" alt="The Alps, excluding Liechtenstein and regions around Bern and Zürich" src="https://raw.githubusercontent.com/ideditor/location-conflation/master/docs/images/example4.png"/>



### Other Fun facts
* This library is a wrapper around
    * [Country-coder](https://github.com/ideditor/country-coder) for world boundaries, and
    * [Turf.js](https://github.com/Turfjs/turf) for geospatial union/difference functions
* Results contain an `area` property containing the approximate size of the feature in km²<br/>(This is helpful for sorting features)
* Results contain a stable `id` in the form `+[included]-[excluded]`<br/>(e.g. "+[015,039]-[eg,sd]")
* Results are cached, so if you ask for the same thing multiple times we don't repeat the expensive turf calls.



#### Prerequisites

* [Node.js](https://nodejs.org/) version 10 or newer
* [`git`](https://www.atlassian.com/git/tutorials/install-git/) for your platform


#### Installing

* Clone this project, for example:
  `git clone git@github.com:ideditor/location-conflation.git`
* `cd` into the project folder,
* Run `npm install` to install libraries


#### Building

* `npm run build`


### License

This project is available under the [ISC License](https://opensource.org/licenses/ISC).
See the [LICENSE.md](LICENSE.md) file for more details.
