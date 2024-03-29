#  WASM Julia Set Generator Performance Testing

This repository contains a collection of WASM implementations of Julia Set image generators. It also includes a performance testing script implemented with Puppeteer.


## Set up

Pre-requisites:
- node, npm

First, make sure to set up the implementation that you intend to test.
Then, run `npm install` in order to install Puppeteer-related dependencies.

## Conduct performance testing

1. Run the npm scrip `npm run start:<implementation name>`, for instance, `npm run start:cpp` from /puppeteer/serv/ to make the app available on your local machine [http://127.0.0.1:8087](http://127.0.0.1:8087).
2. Execute `npm run perf-test` from the root folder of this project.

