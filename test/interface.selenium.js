const assert = require("node:assert/strict");
const { test } = require("node:test");

const { Builder, Browser, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const { createServer } = require("../src/app");

function startTestServer() {
  const server = createServer();

  return new Promise((resolve) => {
    server.listen(0, () => {
      resolve(server);
    });
  });
}

async function stopServer(server) {
  if (!server.listening) {
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function createChromeDriver() {
  const options = new chrome.Options();

  options.addArguments(
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--window-size=1280,720",
  );

  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }

  return new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
}

test("Selenium opens the home page and validates the interface", async (t) => {
  const server = await startTestServer();
  const driver = await createChromeDriver();

  t.after(async () => {
    await driver.quit();
    await stopServer(server);
  });

  const { port } = server.address();

  await driver.get(`http://127.0.0.1:${port}/`);

  const title = await driver.getTitle();
  const heading = await driver.wait(until.elementLocated(By.css("h1")), 5000);
  const message = await driver.findElement(By.css("p"));
  const status = await driver.findElement(By.css("code"));

  assert.equal(title, "DevOps ADS");
  assert.equal(await heading.getText(), "DevOps ADS");
  assert.match(
    await message.getText(),
    /Aplicacao Node\.js rodando com CI, CD e testes de unidade\./,
  );
  assert.match(await status.getText(), /Status: ok/);
  assert.match(await status.getText(), /Versao: 1\.0\.0/);
});
