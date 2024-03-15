const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const testCaseExecCount = 60;

//  Performance measuring script


(async () => {

  const testDataFilePath = path.join(__dirname, "test-data", "data.json");

  const rawData = fs.readFileSync(testDataFilePath);
  const inputData = JSON.parse(rawData);

  await runTestSuite(inputData.inputs, "M");
  // TODO: call for M, L
})();

async function runTestSuite(inputs, size = "S") {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let timeStorage = [];

  await page.exposeFunction("onCustomEvent", (data) => {
    timeStorage.push(data);
  });

  await page.goto("http://127.0.0.1:8087/");
  await page.waitForSelector(`#julia-title`, { visible: true });

  await page.$eval(`#height`, (input) => (input.value = ""));
  await page.$eval(`#width`, (input) => (input.value = ""));
  let imgWidth, imgHeight;
  switch(size) {
    case "M":
      imgHeight = imgWidth = 1000;
      break;
    case "L":
      imgHeight = imgWidth = 3000;
      break;
    default:
      imgHeight = imgWidth = 300;
      break;
  }

  await page.type(
    `#height`,
    imgHeight+""
  );
  await page.type(
    `#width`,
    imgWidth + ""
  );



  for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < testCaseExecCount; j++) {
      await clearInputFields(page);
      const input = inputs[i];
      let res = await testInput(page, input);
      timeStorage[i*testCaseExecCount + j] = { ...res, ...timeStorage[i*testCaseExecCount + j] };
    }
  }

  console.log(`Results:`);
  // if (matrixCount > ignoreFirstN) {
  //   timeStorage.splice(0, ignoreFirstN);
  // }
  console.log(JSON.stringify(timeStorage));

  await browser.close();
  // TODO: write results to an output file
}

async function clearInputFields(page) {
  await page.$eval(`#imaginary`, (input) => (input.value = ""));
  await page.$eval(`#real`, (input) => (input.value = ""));

}

async function testInput(page, input) {
  const initialHeapSize = (await page.metrics()).JSHeapUsedSize;
  await page.type(
    `#real`,
   input.real
  );
  await page.type(
    `#imaginary`,
   input.imaginary
  );

  await page.click(`#clear`);
  await page.waitForSelector(`#status-message`, {hidden : true});

  // Measure execution time including render of the results
  const startTime = performance.now();


  await page.click(`#generate-img`);

  await page.waitForSelector(`#status-message`, { visible: true });


  const endTime = performance.now();

  const timeWithRender = endTime - startTime;

  const performanceMetrics = await page.metrics();
  const heapSize = performanceMetrics.JSHeapUsedSize;
  // In order to convert to megabytes
  // const heapMB = performanceMetrics.JSHeapUsedSize / (1024 * 1024);
  const deltaHeapSize = performanceMetrics.JSHeapUsedSize - initialHeapSize;
  const testRunResult = {
    heapSize,
    deltaHeapSize,
    timeWithRender,
  };


  return testRunResult;
}
