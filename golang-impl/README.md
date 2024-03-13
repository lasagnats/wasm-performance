#  Golang Julia Set Generator

This is a Golang implementation of the Julia Set Image Generator.
This program is used for Golang WASM  performance evaluation.


## Running the program

Build the program via `GOOS=js GOARCH=wasm go build -o main.wasm`
Then serve it, for example, via `npx http-server -p 8087` from `<projectRoot>/golang-impl/`

