const puppeteer = require("puppeteer");
const matrixGen = require("./matrix-generator");

// Adjustable variables
const matrixCount = 13; // number of test runs
const matrixSize = 4; // will generate matrixSize*(matrixSize-1) matrices
const ignoreFirstN = 10; // number of warm-up test runs that will be ignored

//  Performance measuring script

(async () => {
  let inputData = [];
  for (let i = 0; i < matrixCount; i++) {
    inputData.push(matrixGen.generateMatrixPairs(matrixSize));
  }
  console.log(JSON.stringify(inputData));

  await runTestSuite("js", inputData);
  await runTestSuite("wasm", inputData);
})();

async function runTestSuite(impl, inputData) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let timeStorage = [];

  await page.exposeFunction("onCustomEvent", (data) => {
    timeStorage.push(data);
  });

  await page.goto("http://127.0.0.1:4173/");
  // For dev build, replace the port 4137 ---> 5137

  for (let i = 0; i < inputData.length; i++) {
    const input = inputData[i];
    let res = await testInput(page, input, impl);
    timeStorage[i] = { ...res, ...timeStorage[i] };
  }

  console.log(`${impl.toUpperCase()} time results:`);
  if (matrixCount > ignoreFirstN) {
    timeStorage.splice(0, ignoreFirstN);
  }
  console.log(JSON.stringify(timeStorage));

  await browser.close();
}

async function testInput(page, input, impl) {
  const initialHeapSize = (await page.metrics()).JSHeapUsedSize;

  await page.type(
    `.${impl}-impl #matrix1`,
    matrixGen.serializeMatrix(input.matrix1)
  );
  await page.type(
    `.${impl}-impl #matrix2`,
    matrixGen.serializeMatrix(input.matrix2)
  );

  // Measure execution time including render of the results
  const startTime = performance.now();

  await page.click(`#${impl}-calc`);

  await page.waitForSelector(`#${impl}-result`);

  const endTime = performance.now();

  const timeWithRender = endTime - startTime;

  const performanceMetrics = await page.metrics();
  const heapSize = performanceMetrics.JSHeapUsedSize;
  // In order to convert to megaebytes
  // const heapMB = performanceMetrics.JSHeapUsedSize / (1024 * 1024);
  const deltaHeapSize = performanceMetrics.JSHeapUsedSize - initialHeapSize;
  const testRunResult = {
    heapSize,
    deltaHeapSize,
    timeWithRender,
  };

  // Clear the textareas for the next iteration
  await page.$eval(`.${impl}-impl #matrix1`, (input) => (input.value = ""));
  await page.$eval(`.${impl}-impl #matrix2`, (input) => (input.value = ""));
  return testRunResult;
}
