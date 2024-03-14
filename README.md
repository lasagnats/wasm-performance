#  WASM Julia Set Generator Performance Testing

This repository contains a collection of WASM implementations of Julia Set image generators. It also includes a performance testing script implemented with Puppeteer.


## Set up

Pre-requisites:
- node, npm

First, make sure to set up the implementation that you intend to test.
Then, run `npm install` in order to install Puppeteer-related dependencies.

## Conduct performance testing

1. Follow the instructions in the README.md file of the respective implementation to make it available on your local machine [http://127.0.0.1:8087](http://127.0.0.1:8087).
2. Execute `npm run perf-test` from the root folder of this project.

