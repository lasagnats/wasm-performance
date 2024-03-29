const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const testCaseExecCount = 20;

//  Performance measuring script


(async () => {

  const testDataFilePath = path.join(__dirname, "test-data", "data.json");

  const rawData = fs.readFileSync(testDataFilePath);
  const inputData = JSON.parse(rawData);

  await runTestSuite(inputData.inputs, "S");
  await runTestSuite(inputData.inputs, "M");
  await runTestSuite(inputData.inputs, "L");
})();

async function runTestSuite(inputs, size = "S") {
  const browser = await puppeteer.launch({ headless: false, args: ["--js-flags=--expose-gc", "--enable-benchmarking"] });
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
        await forceGarbageCollector(page);
        await wait(40);
        let memUsage = (await page.evaluate("performance.measureUserAgentSpecificMemory()")).bytes / 1024 / 1024;
        timeStorage[i*testCaseExecCount + j] = { ...res, ...timeStorage[i*testCaseExecCount + j], memUsageMB: memUsage };
    }
  }

  let printable = "";
  timeStorage.forEach(el => {
    // JavaScript implementation does NTO have el.calcTime
    // printable += `${el.heapSize};${el.deltaHeapSize};${el.timeWithRender}\n`;
    printable += `${el.heapSize};${el.deltaHeapSize};${el.timeWithRender};${el.calcTime}\n`;
  })

  try {
    fs.writeFileSync(`./${size}_test.txt`, printable);
  } catch (err) {
    console.error(err);
  }
  console.log(`Results:`);
  console.log(JSON.stringify(timeStorage));

  await browser.close();
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

async function forceGarbageCollector(page) {
  for (let i = 0; i < 5; i++) {
    await page.evaluate("window.gc()");
  }
}

function wait (delay = 1000) { return new Promise((res) => setTimeout(res, delay)); }