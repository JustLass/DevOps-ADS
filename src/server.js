const { createServer } = require("./app");

const port = Number(process.env.PORT) || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
