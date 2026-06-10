# DevOps ADS - Avaliacao N3

Aplicacao Node.js simples criada para demonstrar o uso de CI, CD, testes de
unidade e deploy em uma instancia EC2.

## Requisitos atendidos

- Branch `develop`
- Branches de feature
- Aplicacao Node.js
- Testes de unidade
- Analise estatica simples com `node --check`
- Cobertura com o test runner nativo do Node.js
- Workflow de CI/CD
- Workflow de deploy continuo para EC2

## Como rodar localmente

Requisito: Node.js 22 ou superior.

```bash
npm install
npm start
```

A aplicacao fica disponivel em:

```text
http://localhost:3000
```

Rotas principais:

- `/` pagina principal
- `/api/status` status da aplicacao
- `/health` health check

## Scripts

```bash
npm run lint
npm test
npm run coverage
```

## Workflows

O workflow `.github/workflows/ci-cd.yml` executa:

- instalacao das dependencias
- analise estatica
- testes de unidade
- cobertura
- geracao de artefato da aplicacao

O workflow `.github/workflows/deploy-ec2.yml` executa:

- instalacao das dependencias
- testes antes do deploy
- envio do pacote para o EC2
- restart da aplicacao com PM2

## Secrets para deploy

Configurar no GitHub em `Settings > Secrets and variables > Actions`:

```text
EC2_HOST
EC2_USER
EC2_SSH_KEY
EC2_APP_DIR   opcional
APP_PORT      opcional
```

## Roteiro da apresentacao

1. Abrir a aplicacao no navegador usando `http://<ip_do_servidor>`.
2. Fazer um commit em uma branch de feature.
3. Abrir um pull request para a branch `develop`.
4. Mostrar o workflow de CI/CD rodando.
5. Fazer merge para a branch `main`.
6. Mostrar o workflow de deploy EC2 rodando.
7. Atualizar o navegador e mostrar a aplicacao atualizada.
