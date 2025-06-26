# Sistema de Gerenciamento de Competições de Natação (LEF-Treatment)

Este projeto é um sistema completo para importar, gerenciar e visualizar dados de competições de natação a partir de arquivos no formato LENEX. Ele é composto por um backend (API), um frontend (aplicativo web) e um banco de dados relacional.

## Visão Geral da Arquitetura

O sistema é dividido em três componentes principais:

1.  **API (Backend):** Construída com Node.js e Express, responsável pela lógica de negócio, autenticação de usuários, processamento de arquivos LENEX e comunicação com o banco de dados PostgreSQL.
2.  **Frontend:** Uma aplicação web moderna desenvolvida com React e Vite, que consome a API para fornecer uma interface de usuário interativa para upload de arquivos e visualização dos dados da competição.
3.  **Banco de Dados:** Utiliza PostgreSQL para armazenar de forma estruturada todos os dados relativos a competições, atletas, resultados e usuários.

## Funcionalidades

*   **Autenticação de Usuários:** Sistema seguro de cadastro e login.
*   **Importação de Dados:** Upload de arquivos LENEX para extrair e salvar informações completas sobre competições.
*   **Visualização de Competições:** Navegue por uma lista de competições importadas.
*   **Detalhes da Competição:** Explore informações detalhadas, incluindo:
    *   Sessões e eventos.
    *   Séries (heats) e seus respectivos status.
    *   Resultados por atleta.
    *   Tempos parciais (splits) de cada resultado.

## Documentação

Para informações mais detalhadas, consulte os seguintes manuais:

*   **[Manual do Desenvolvedor](./ptbr-dev-manual.md):** Contém instruções sobre como configurar, executar e contribuir com o projeto, além de detalhes sobre a arquitetura e a API.
*   **[Manual do Usuário](./ptbr-user-manual.md):** Guia passo a passo sobre como utilizar o sistema para importar e visualizar dados de competições.

## Guia Rápido de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd lef-treatment
    ```

2.  **Configure o Banco de Dados:**
    *   Certifique-se de ter o PostgreSQL instalado e em execução.
    *   Crie um banco de dados.
    *   Execute o script `database/ddl.sql` para criar as tabelas.
    *   Execute o script `database/dml_event_type.sql` para popular a tabela event_type.
    *   Configure as credenciais do banco de dados no arquivo de conexão da API (ex: `api/db.js`).

3.  **Configure e execute o Backend:**
    ```bash
    cd api
    npm install
    npm start
    ```

4.  **Configure e execute o Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou na porta informada pelo Vite).
