# marvel-comics-info-api

Desafio técnico: API responsável por fornecer funcionalidades de autenticação de usuários e avaliação de comics e characters da Marvel.

### Pré-requisitos

- [nodejs](https://nodejs.org)
- [yarn](https://yarnpkg.com)

### Instalação

Após a instalação dos pré-requisitos, para disponibilizar a API, basta executar os próximos comandos:

```bash
yarn install
yarn start
```

---

### Testes unitários

A Api possui testes unitários utilizando o [Jest](https://jestjs.io), para executá-los basta rodar o comando:

```bash
yarn test
```

---

### Rotas / Endpoits

### Autenticação

- `/auth/register` - `POST` - Rota utilizada para criar um registro de um novo usuário.

Exemplo de entrada:

```json
{
  "name": "John Doe",
  "email": "john_doe@email.com",
  "password": "123456",
  "confirmPassword": "123456",
  "birthDate": "10/07/1999"
}
```

| Atributo        | Obrigatório | Descrição                                                           |
| --------------- | ----------- | ------------------------------------------------------------------- |
| name            | SIM         | Nome do usuário.                                                    |
| email           | SIM         | Email do usuário.                                                   |
| password        | SIM         | Senha para ser utilizada na autenticação do usuário                 |
| confirmPassword | SIM         | Confirmação da senha para ser utilizada na autenticação do usuário. |
| birthDate       | SIM         | Data de aniversário do usuário.                                     |

Retorno:

```json
{
  "user": {
    "_id": "5f3f057fb7dbae31e0bad980",
    "name": "John Doe",
    "email": "john_doe@email.com",
    "birthDate": "1999-10-07T02:00:00.000Z",
    "createdAt": "2020-08-20T23:21:35.808Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2YwNTdmYjdkYmFlMzFlMGJhZDk4MCIsImlhdCI6MTU5Nzk2NTY5NiwiZXhwIjoxNTk4MDUyMDk2fQ.pq1JbwNt2XmxHNZELzgTOD3fw9JcUQue-aW96AyaNPc"
}
```

- Status Code `201` - Sucesso, usuário criado
  | Atributo | Descrição |
  | --------- | ------------------------------- |
  | \_id | Id do usuário cadastrado |
  | name | Nome do usuário. |
  | email | Email do usuário. |
  | birthDate | Data de aniversário do usuário. |
  | createdAt | Data de criação do usuário. |
  | token | Token JWT do usuário. |

* `/auth/login` - `POST` - Rota utilizada para realizar o login do usuário.

Exemplo de entrada:

```json
{
  "email": "john_doe@email.com",
  "password": "123456"
}
```

| Atributo | Obrigatório | Descrição                                           |
| -------- | ----------- | --------------------------------------------------- |
| email    | SIM         | Email do usuário.                                   |
| password | SIM         | Senha para ser utilizada na autenticação do usuário |

Retorno:

```json
{
  "user": {
    "_id": "5f3f057fb7dbae31e0bad980",
    "name": "John Doe",
    "email": "john_doe@email.com",
    "birthDate": "1999-10-07T02:00:00.000Z",
    "createdAt": "2020-08-20T23:21:35.808Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2YwNTdmYjdkYmFlMzFlMGJhZDk4MCIsImlhdCI6MTU5Nzk2NTY5NiwiZXhwIjoxNTk4MDUyMDk2fQ.pq1JbwNt2XmxHNZELzgTOD3fw9JcUQue-aW96AyaNPc"
}
```

- Status Code `200` - Sucesso, usuário logado
  | Atributo | Descrição |
  | --------- | ------------------------------- |
  | \_id | Id do usuário cadastrado |
  | name | Nome do usuário. |
  | email | Email do usuário. |
  | birthDate | Data de aniversário do usuário. |
  | createdAt | Data de criação do usuário. |
  | token | Token JWT do usuário. |

- `/auth/reset-password` - `POST` - Rota utilizada para resetar e enviar uma nova senha no email do usuário.

Exemplo de entrada:

```json
{
  "email": "john_doe@email.com"
}
```

| Atributo | Obrigatório | Descrição         |
| -------- | ----------- | ----------------- |
| email    | SIM         | Email do usuário. |

Retorno:

- Status Code `200` - Sucesso, email enviado

```json
{
  "message": "Email enviado"
}
```

- Status Code `400` - Falha ao enviar o email

```json
{
  "message": "Email não foi enviado."
}
```

---

- As rotas a baixo para serem utilizadas é necessário passar o token de autenticação no header da requisição.

Exemplo de token:

Authorization - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjFiZWI3OGI0NWRhMDAyNTJmYTMzMyIsInByb2ZpbGUiOjEsImlhdCI6MTU5NjA0ODQ0NSwiZXhwIjoxNTk2MTM0ODQ1fQ.hCPovok2vNs5E26HcuHY0JJ3b5QWihI8v3yFQSvf9cg

### Usuário

- `/user/` - `PUT` - Rota utilizada para atualizar o perfil do usuário.

### Comic

- `/comic/` - `POST` - Rota utilizada para salvar os dados da avaliação do comic.

Exemplo de entrada:

```json
{
  "isLiked": true,
  "isFavorite": false,
  "comicId": 90212
}
```

Exemplo de retorno:

```json
{
  "isFavorite": false,
  "_id": "5f4068b2136e370aa0e01263",
  "userId": "5f3966c04e5fab35dca04d01",
  "isLiked": true,
  "comicId": 90212,
  "__v": 0
}
```

- `/comic/` - `GET` - Rota utilizada para buscar a lista dos comics avaliados e favoritos pelo usuário.

Exemplo de retorno:

```json
[
  {
    "isFavorite": true,
    "_id": "5f3eb5547fc1dd4db06c0a5e",
    "userId": "5f3966c04e5fab35dca04d01",
    "isLiked": true,
    "comicId": 81181,
    "__v": 0
  }
]
```

### Character

- `/character/` - `POST` - Rota utilizada para salvar os dados da avaliação do character.

Exemplo de entrada:

```json
{
  "isLiked": false,
  "isFavorite": true,
  "characterId": 1009489
}
```

Exemplo de retorno:

```json
{
  "isFavorite": true,
  "_id": "5f3efb39aa985b56581b2c62",
  "userId": "5f3966c04e5fab35dca04d01",
  "isLiked": false,
  "characterId": 1009489,
  "__v": 0
}
```

- `/character/` - `GET` - Rota utilizada para buscar a lista dos characters avaliados e favoritos pelo usuário.

Exemplo de retorno:

```json
[
  {
    "isFavorite": true,
    "_id": "5f3efb39aa985b56581b2c62",
    "userId": "5f3966c04e5fab35dca04d01",
    "isLiked": false,
    "characterId": 1009489,
    "__v": 0
  }
]
```
