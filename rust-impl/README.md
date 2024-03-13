# WebAssembly and JavaScript performance comparison

This project is dedicated to the performance testing of WebAssembly and JavaScript programs.
Here, you can find a minimal prototype that allows to measure the performance of a WebAssembly (Rust) and JavaScript matrix multiplication program in an automated way.

Tools used:
- Rust
- Cargo package manager
- Node.js
- Vite
- Puppeteer
- wasm-pack (installable via cargo)
- rsw  (installable via cargo)


## Project Setup

As a pre-requisite, make sure you have the required tools installed.

### Run DEV version of the project
Note: This will make the matrix multiplication app available on port 5137 (which might require adaptation of the Puppeteer script)
To run the matrix multiplication app:
```sh
npm run start
```

Once it is up and available on http://localhost:5173/, run the performance tests:

```sh
npm run perf-test:js
```

### Run PROD (highly optimized) version of the project
Note: This will make the matrix multiplication app available on port 4137 (which might require adaptation of the Puppeteer script)

First build the wasm binary:
```sh
npm run rsw:b
```

Then, run the app:
```sh
npm run build-only
```
```sh
npm run preview
```

Once it is up and available on http://localhost:4173/, run the performance tests:

```sh
npm run perf-test:js
```