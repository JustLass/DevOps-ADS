const assert = require("node:assert/strict");
const { test } = require("node:test");

const { createServer, getAppInfo, renderHomePage } = require("../src/app");

function startTestServer() {
  const server = createServer();

  return new Promise((resolve) => {
    server.listen(0, () => {
      resolve(server);
    });
  });
}

test("getAppInfo returns application status", () => {
  const info = getAppInfo();

  assert.equal(info.name, "DevOps ADS");
  assert.equal(info.status, "ok");
});

test("renderHomePage includes the application name and status", () => {
  const html = renderHomePage({
    name: "Teste DevOps",
    version: "2.0.0",
    status: "ok",
    message: "Mensagem de teste",
  });

  assert.match(html, /Teste DevOps/);
  assert.match(html, /Status: ok/);
  assert.match(html, /Versao: 2.0.0/);
});

test("GET /api/status returns JSON status", async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/api/status`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.name, "DevOps ADS");
});

test("GET / returns the HTML application page", async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/`);
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.match(body, /DevOps ADS/);
});

test("GET /health returns ok", async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: "ok" });
});

test("unknown route returns 404", async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/nao-existe`);
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.deepEqual(body, { error: "Rota nao encontrada" });
});
