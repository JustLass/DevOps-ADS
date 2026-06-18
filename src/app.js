const http = require("node:http");

const appInfo = {
  name: "DevOps ADS",
  version: "1.0.0",
  status: "ok",
  message: "Aplicação Node.js rodando para Demo em aula N3",
};

function getAppInfo() {
  return { ...appInfo };
}

function renderHomePage(info = getAppInfo()) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${info.name}</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Arial, Helvetica, sans-serif;
        background: #f4f7fb;
        color: #1b2430;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
      }

      main {
        width: min(720px, calc(100% - 32px));
        padding: 32px;
        border: 1px solid #d8e0ea;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 18px 45px rgba(27, 36, 48, 0.08);
      }

      h1 {
        margin: 0 0 12px;
        font-size: 2rem;
      }

      p {
        margin: 0 0 16px;
        line-height: 1.5;
      }

      code {
        display: inline-block;
        padding: 6px 10px;
        border-radius: 6px;
        background: #ecf2f8;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${info.name}</h1>
      <p>${info.message}</p>
      <code>Status: ${info.status} | Versao: ${info.version}</code>
    </main>
  </body>
</html>`;
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);

  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  response.end(body);
}

function sendHtml(response, statusCode, html) {
  response.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": Buffer.byteLength(html),
  });
  response.end(html);
}

function handleRequest(request, response) {
  const url = new URL(request.url, "http://localhost");

  if (request.method === "GET" && url.pathname === "/") {
    sendHtml(response, 200, renderHomePage());
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/status") {
    sendJson(response, 200, getAppInfo());
    return;
  }

  if (request.method === "GET" && url.pathname === "/health") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  sendJson(response, 404, { error: "Rota nao encontrada" });
}

function createServer() {
  return http.createServer(handleRequest);
}

module.exports = {
  createServer,
  getAppInfo,
  handleRequest,
  renderHomePage,
};
