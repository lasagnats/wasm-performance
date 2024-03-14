#  Rust Julia Set Generator

This is a Rust (WASM) implementation of the Julia Set Image Generator.
This program is used for Rust WASM performance evaluation.

## Pre-requisites
Tools used:
- Rust
- Cargo package manager
- Node.js
- Vite
- Puppeteer
- wasm-pack (installable via cargo)
- rsw  (installable via cargo)


## Running the program

From the `./rust-impl/`, first build the WASM module via `npm run rsw:b`.
Then execute `npm run build-only`.
Serve the page, for example, via `npx http-server -p 8087` from `dist/` folder. This will make it available on the [http://127.0.0.1:8087](http://127.0.0.1:8087).