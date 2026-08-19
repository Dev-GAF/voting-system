# 🗳️ Opina

> Plataforma web de criação e votação de enquetes em tempo real.

O **Opina** é uma aplicação web desenvolvida para permitir que usuários criem enquetes, adicionem opções e registrem seus votos de forma simples e segura.

O projeto foi desenvolvido com **Next.js, TypeScript, Prisma, PostgreSQL e Auth.js**, utilizando autenticação por credenciais e login social com Google e Facebook.

---

## 📸 Sobre o projeto

O objetivo do Opina é oferecer uma experiência simples para criação e participação em enquetes.

Cada usuário autenticado pode:

- Criar novas enquetes;
- Adicionar uma descrição à enquete;
- Adicionar duas ou mais opções;
- Votar em uma opção;
- Visualizar os resultados após votar;
- Visualizar a quantidade de votos por opção;
- Visualizar a porcentagem de cada opção;
- Criar e acessar sua conta através de autenticação;
- Entrar utilizando Google ou Facebook.

A aplicação também possui validações no servidor para garantir que um usuário não vote mais de uma vez na mesma enquete.

---

## 🚀 Aplicação

O projeto está hospedado na Vercel:

**[Acessar o Opina](https://voting-system-czt0liwhc-guilherme-fortes.vercel.app/)**

---

## ✨ Funcionalidades

### 👤 Autenticação

- Cadastro de usuários;
- Login com e-mail e senha;
- Senhas armazenadas utilizando hash com Argon2;
- Login social com Google;
- Login social com Facebook;
- Logout;
- Proteção de rotas autenticadas.

### 🗳️ Enquetes

- Criação de enquetes;
- Título e descrição;
- Adição dinâmica de opções;
- Validação de pelo menos duas opções;
- Ordenação das enquetes por data de criação.

### 🗳️ Sistema de votação

- Seleção de uma opção;
- Registro do voto no banco de dados;
- Validação da existência da opção;
- Validação de que a opção pertence à enquete;
- Impedimento de votos duplicados;
- Atualização dos resultados após a votação.

### 📊 Resultados

Após votar, o usuário consegue visualizar:

- Quantidade de votos por opção;
- Porcentagem de votos;
- Total de votos;
- Confirmação de que já participou da enquete.

---

# 🛠️ Tecnologias utilizadas

## Front-end

### Next.js

Framework React utilizado para construção da aplicação, utilizando principalmente o **App Router** e Server Components.

### React

Biblioteca utilizada para construção da interface e componentes interativos.

### TypeScript

Utilizado para tipagem estática e maior segurança durante o desenvolvimento.

### Tailwind CSS

Utilizado para estilização da interface através de classes utilitárias.

### Lucide React

Biblioteca utilizada para os ícones da aplicação.

---

## Back-end

### Next.js Server Actions

As operações de criação de usuários, criação de enquetes e votação são realizadas através de **Server Actions**, mantendo a comunicação com o banco no lado do servidor.

### Auth.js / NextAuth

Responsável pela autenticação da aplicação.

Foram utilizados:

- Credentials Provider;
- Google Provider;
- Facebook Provider.

---

## Banco de dados

### PostgreSQL

Banco de dados relacional utilizado para armazenar:

- Usuários;
- Contas OAuth;
- Sessões;
- Enquetes;
- Opções;
- Votos.

### Prisma ORM

Utilizado como ORM para comunicação entre a aplicação e o PostgreSQL.

O Prisma também é responsável pelas migrations e geração do Prisma Client.

### Neon

O banco PostgreSQL utilizado no ambiente de produção foi hospedado na **Neon**.

---

## Segurança

### Argon2

Utilizado para realizar o hash das senhas dos usuários cadastrados através de e-mail e senha.

As senhas não são armazenadas em texto puro.

### Zod

Utilizado para validação dos dados recebidos no cadastro de usuários.

---

## Infraestrutura

### Docker

O projeto possui configuração Docker para o ambiente de desenvolvimento e banco PostgreSQL local.

### Vercel

Utilizada para hospedagem e deploy da aplicação Next.js.

### Git / GitHub

Utilizados para versionamento e gerenciamento do código-fonte.

---

# 🏗️ Arquitetura

O projeto utiliza uma arquitetura baseada no **Next.js App Router**.

De forma simplificada:

```text
┌──────────────────────────┐
│        Usuário           │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       Next.js App        │
│                          │
│  Pages / Components      │
│  Server Components       │
│  Client Components       │
│  Server Actions          │
└────────────┬─────────────┘
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
┌────────────┐ ┌──────────────┐
│  Auth.js   │ │    Prisma    │
│            │ │              │
│ Google     │ │ PostgreSQL   │
│ Facebook   │ │              │
│ Credentials│ │              │
└────────────┘ └──────┬───────┘
                      │
                      ▼
               ┌─────────────┐
               │    Neon     │
               │ PostgreSQL  │
               └─────────────┘
```

---

# 🗄️ Modelo de dados

O banco de dados foi estruturado utilizando Prisma.

As principais entidades são:

```text
User
 │
 ├── Poll
 │     │
 │     ├── Option
 │     │      │
 │     │      └── Vote
 │     │
 │     └── Vote
 │
 ├── Vote
 │
 ├── Account
 │
 └── Session
```

---

# 🔒 Fluxo de autenticação

O Opina suporta três formas de autenticação:

```text
                    ┌──────────────┐
                    │    Login     │
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        Credentials      Google       Facebook
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                        Auth.js
                           │
                           ▼
                       Dashboard
```

## 🔑 Credenciais:

No cadastro tradicional:

```text
Senha
  │
  ▼
Argon2
  │
  ▼
Password Hash
  │
  ▼
PostgreSQL
```
A senha original nunca é armazenada diretamente.

---

# 📚 Principais conceitos praticados

O desenvolvimento do Opina envolveu diversos conceitos importantes de desenvolvimento web full-stack:

### Front-end
* React;
* Next.js;
* App Router;
* Server Components;
* Client Components;
* Tailwind CSS;
* Componentização;
* Formulários;
* Gerenciamento de estado no cliente.
  
### Back-end
* Server Actions;
* API Routes;
* Autenticação;
* Autorização;
* OAuth 2.0;
* Validação de dados;
* Hash de senhas;
* Regras de negócio.
  
### Banco de dados
* PostgreSQL;
* Modelagem relacional;
* Relacionamentos;
* Constraints;
* Chaves primárias;
* Chaves estrangeiras;
* Índices e unicidade;
* Prisma ORM;
* Prisma Migrations.
  
### Infraestrutura
* Docker;
* Environment Variables;
* Continuous Deployment (CD);
* Deploy em cloud;
* Vercel;
* Neon.
