# Esquema do Banco de Dados

Este documento descreve o esquema do banco de dados PostgreSQL utilizado pelo sistema. Ele detalha as tabelas, suas colunas, tipos de dados, chaves primárias e chaves estrangeiras, identificando os relacionamentos entre as entidades.

## Descrição das Tabelas

### `users`
Armazena informações dos usuários do sistema.
- `user_id`: Chave primária, identificador único do usuário.
- `email`: Endereço de e-mail do usuário, único.
- `password_hash`: Hash da senha do usuário.
- `created_at`: Timestamp da criação do registro.

### `competitions`
Armazena informações gerais sobre as competições.
- `competition_id`: Chave primária, identificador único da competição.
- `name`: Nome da competição.
- `city`: Cidade onde a competição ocorreu.
- `nation`: País da competição.
- `start_date`: Data de início da competição.
- `end_date`: Data de término da competição.
- `course`: Tipo de piscina (ex: "LCM", "SCM").

### `sessions`
Armazena as sessões de uma competição.
- `session_id`: Chave primária, identificador único da sessão.
- `competition_id`: Chave estrangeira para `competitions`.
- `session_order`: Ordem da sessão dentro da competição.
- `session_date`: Data da sessão.

### `clubs`
Armazena informações sobre os clubes.
- `club_id`: Chave primária, identificador único do clube.
- `swrid`: Identificador SWRID do clube.
- `name`: Nome completo do clube.
- `shortname`: Nome abreviado do clube.
- `code`: Código do clube.
- `nation`: País do clube.
- `region`: Região do clube.

### `athletes`
Armazena informações sobre os atletas.
- `athleteid`: Chave primária, identificador único do atleta.
- `swrid`: Identificador SWRID do atleta.
- `externalid`: Identificador externo do atleta.
- `first_name`: Primeiro nome do atleta.
- `last_name`: Sobrenome do atleta.
- `gender`: Gênero do atleta ('M' ou 'F').
- `birth_date`: Data de nascimento do atleta.
- `clubid`: Chave estrangeira para `clubs`.
- `nation`: País do atleta.
- `license`: Número da licença do atleta.

### `event_type`
Define os tipos de eventos (provas).
- `event_type_id`: Chave primária, identificador único do tipo de evento.
- `stroke`: Estilo de nado (ex: "Freestyle", "Backstroke").
- `distance`: Distância da prova em metros.
- `is_relay`: Booleano indicando se é uma prova de revezamento.

### `events`
Armazena os eventos (provas) que ocorrem em uma sessão.
- `event_id`: Chave primária, identificador único do evento.
- `session_id`: Chave estrangeira para `sessions`.
- `gender`: Gênero do evento ('M', 'F', 'X' para misto).
- `event_type_id`: Chave estrangeira para `event_type`.

### `agegroups`
Define os grupos de idade.
- `agegroup_id`: Chave primária, identificador único do grupo de idade.
- `agemin`: Idade mínima do grupo.
- `agemax`: Idade máxima do grupo.

### `events_agegroups`
Tabela de junção para relacionar eventos com múltiplos grupos de idade.
- `event_id`: Chave estrangeira e parte da chave primária composta.
- `agegroup_id`: Chave estrangeira e parte da chave primária composta.

### `heats`
Armazena as séries (baterias) de um evento.
- `heatid`: Chave primária, identificador único da série.
- `event_id`: Chave estrangeira para `events`.
- `heat_number`: Número da série.
- `heat_order`: Ordem da série.
- `heat_daytime`: Horário da série.
- `heat_status`: Status da série (ex: "Official", "Unofficial").

### `results`
Armazena os resultados individuais dos atletas em uma série.
- `resultid`: Chave primária, identificador único do resultado.
- `heatid`: Chave estrangeira para `heats`.
- `lane`: Raia do atleta.
- `entry_time`: Tempo de entrada (inscrição).
- `swimtime`: Tempo final de nado.
- `points`: Pontos obtidos.
- `swrid`: Identificador SWRID do atleta (redundante, mas presente no LENEX).
- `athleteid`: Chave estrangeira para `athletes`.
- `externalid`: Identificador externo do atleta (redundante, mas presente no LENEX).

### `splits`
Armazena os tempos parciais (splits) de um resultado.
- `split_id`: Chave primária, identificador único do split.
- `result_id`: Chave estrangeira para `results`.
- `distance`: Distância do split em metros.
- `swimtime`: Tempo do split.

### `relay_positions`
Armazena as posições dos atletas em revezamentos.
- `relay_position_id`: Chave primária, identificador único da posição no revezamento.
- `result_id`: Chave estrangeira para `results` (do resultado do revezamento).
- `position`: Posição do atleta no revezamento (1º, 2º, etc.).
- `athlete_id`: Chave estrangeira para `athletes` (o atleta que nadou aquela posição).
