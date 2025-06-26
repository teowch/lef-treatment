# Manual do Desenvolvedor

Este manual fornece todas as informações necessárias para configurar o ambiente de desenvolvimento, entender a arquitetura do sistema e contribuir com o projeto LEF-Treatment.

## 1. Visão Geral da Arquitetura

O sistema segue uma arquitetura cliente-servidor desacoplada:

*   **Backend (API):**
    *   **Framework:** Node.js com Express.
    *   **Banco de Dados:** PostgreSQL.
    *   **Upload de Arquivos:** `multer` para gerenciar o upload de arquivos LENEX.
    *   **Parsing de XML:** `xml2js` para converter os dados do arquivo LENEX de XML para objetos JavaScript.

*   **Frontend:**
    *   **Framework:** React com Vite como ferramenta de build.
    *   **Roteamento:** `react-router-dom` para a navegação entre páginas.
    *   **Estilização:** Sass (`.scss`) para componentização de estilos.
    *   **Requisições HTTP:** `axios` para comunicação com a API backend.

*   **Banco de Dados:**
    *   O esquema do banco de dados (`database/ddl.sql`) é projetado para normalizar e armazenar os dados complexos do padrão LENEX, garantindo integridade nas consultas.
    *   O arquivo `database/dml_event_type.sql` popula a tabela event_type com os tipos de eventos oficiais, determinados pela World Aquatics.
    *   A estrutura do banco de dados é documentada no arquivo `database-description.md`.
## 2. Configuração do Ambiente

Siga os passos abaixo para ter o ambiente de desenvolvimento totalmente funcional.

### Pré-requisitos

*   Node.js
*   NPM
*   PostgreSQL

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/teowch/lef-treatment.git
cd lef-treatment
```

### Passo 2: Configurar o Banco de Dados

1.  **Inicie o serviço do PostgreSQL.**
2.  **Crie um banco de dados** para o projeto. Exemplo usando `psql`:
    ```sql
    CREATE DATABASE lef_treatment_db;
    ```
3.  **Execute o script DDL** para criar a estrutura de tabelas. Você pode usar uma ferramenta de banco de dados ou o `psql`:
    ```bash
    psql -U seu_usuario -d lef_treatment_db -f database/ddl.sql
    ```
3.  **Execute o script DML** para popular a tabela event_type. Você pode usar uma ferramenta de banco de dados ou o `psql`:
    ```bash
    psql -U seu_usuario -d lef_treatment_db -f database/dml_event_type.sql
    ```

### Passo 3: Configurar o Backend (API)

1.  **Navegue até o diretório da API:**
    ```bash
    cd api
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente.** A API precisa saber como se conectar ao banco de dados. Crie um arquivo `.env` na raiz da pasta `api/` com o seguinte conteúdo, substituindo pelos seus valores:
    ```env
    PGUSER=pg_user
    PGHOST=localhost
    PGDATABASE=swimming
    PGPASSWORD=pg_password
    PGPORT=5432
    ```
    *   **Importante:** O arquivo `api/db.js` contém a lógica de conexão que usará essas variáveis.

### Passo 4: Configurar o Frontend

1.  **Navegue até o diretório do frontend:**
    ```bash
    cd frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure a URL da API.** O frontend precisa saber onde a API está sendo executada. No arquivo `frontend/src/services/api.js`, verifique se a `baseURL` do Axios aponta para o endereço correto do backend (ex: `http://localhost:3000/`).

## 3. Executando o Sistema

*   **Para iniciar o servidor da API:**
    ```bash
    cd api
    npm run start
    ```
    O servidor estará em execução, por padrão, em `http://localhost:3000`.

*   **Para iniciar a aplicação Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## 4. Estrutura de Pastas (Backend)

```
api/
├── controllers/  # Lógica de negócio e manipulação de requisições
├── queries/      # Funções que executam as consultas SQL no banco
├── routes/       # Definição dos endpoints da API
├── services/     # Lógica de serviços
├── app.js        # Arquivo principal da aplicação Express
└── db.js         # Configuração da conexão com o banco de dados
```

## 5. Estrutura de Pastas (Frontend)

```
frontend/
└── src/
    ├── assets/       # Ícones e imagens
    ├── components/   # Componentes React reutilizáveis
    ├── context/      # Contexto React
    ├── hooks/        # Hooks customizados para lógica reutilizável
    ├── pages/        # Componentes que representam as páginas da aplicação
    ├── services/     # Funções para interagir com a API
    └── styles/       # Estilos globais e variáveis Sass
```

## 6. Documentação da API

A API fornece os seguintes endpoints principais:

*   `POST /api/auth/register`: Registra um novo usuário.
*   `POST /api/auth/login`: Autentica um usuário.
*   `POST /api/import`: Faz o upload de um arquivo LENEX para processamento.
*   `GET /api/competitions`: Retorna a lista de todas as competições.
*   `GET /api/competitions/:id`: Retorna os detalhes de uma competição específica.
*   `GET /api/competitions/:id/sessions`: Retorna as sessões de uma competição.
*   `GET /api/sessions/:id/events`: Retorna os eventos de uma sessão.
*   `GET /api/events/:id/heats`: Retorna as séries (heats) de um evento.
*   `GET /api/heats/:id/results`: Retorna os resultados de uma série.
*   `GET /api/results/:id/splits`: Retorna as parciais (splits) de um resultado.
*   `GET /api/results/:id/splits`: Retorna as parciais (splits) de um resultado.

Para detalhes sobre os parâmetros de requisição e os corpos de resposta, consulte os arquivos em `api/routes/` e `api/controllers/`.
