const path = require("path");
const express = require("express");

const [, , userPath] = process.argv;

if (!userPath) {
  console.log(
    "Path to distributable files is missing - provide it as a command line argument."
  );
  process.exit(-1);
}

const pathToStatic = path.resolve(__dirname, userPath);

const app = express();
const port = 8087;

app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(express.static(pathToStatic));

// 0.0.0.0 means a request can come from any host - it is necessary so that both lcoalhost & 127.0.0.1 work
app.listen(port, '0.0.0.0', () => {
  console.log(
    `Static server serving ${pathToStatic} is available at http://localhost:${port}`
  );
});
