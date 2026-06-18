# DevOps ADS - Avaliacao N3

Aplicacao Node.js simples criada para demonstrar o uso de CI, CD, testes de
unidade e deploy em uma instancia EC2.

## Requisitos atendidos

- Branch `develop`
- Branches de feature
- Aplicacao Node.js
- Testes de unidade
- Teste de interface com Selenium
- Analise estatica simples com `node --check`
- Cobertura com o test runner nativo do Node.js
- Workflow de CI/CD
- Workflow de deploy continuo para EC2

## Como rodar localmente

Requisitos:

- Node.js 22 ou superior
- Google Chrome instalado para o teste de interface com Selenium

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
npm run test:ui
npm run test:all
```

O teste de interface roda em modo headless e abre a pagina inicial com Selenium.

## Workflows

O workflow `.github/workflows/ci-cd.yml` executa:

- instalacao das dependencias
- analise estatica
- testes de unidade
- cobertura
- teste de interface com Selenium
- geracao de artefato da aplicacao

O workflow `.github/workflows/deploy-ec2.yml` executa:

- instalacao das dependencias
- testes antes do deploy
- envio do pacote para o EC2
- instalacao automatica do Node.js/npm no EC2 quando necessario
- restart da aplicacao com PM2

## Secrets para deploy

Configurar no GitHub em `Settings > Secrets and variables > Actions`:

```text
EC2_HOST
EC2_SSH_KEY
EC2_USER      opcional, padrao ec2-user
EC2_APP_DIR   opcional
APP_PORT      opcional
```

Para Amazon Linux, normalmente nao precisa configurar `EC2_USER`, pois o
workflow usa `ec2-user` por padrao. Para Ubuntu, configure `EC2_USER=ubuntu`.

## Roteiro da apresentacao

1. Abrir a aplicacao no navegador usando `http://<ip_do_servidor>`.
2. Fazer um commit em uma branch de feature.
3. Abrir um pull request para a branch `develop`.
4. Mostrar o workflow de CI/CD rodando.
5. Fazer merge para a branch `main`.
6. Mostrar o workflow de deploy EC2 rodando.
7. Atualizar o navegador e mostrar a aplicacao atualizada.
