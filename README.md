# 🏥 SaudePositivoAPP

> Aplicativo móvel integrado para gestão de saúde e exames laboratoriais.

![Badge License](https://img.shields.io/badge/license-ISC-blue)
![Badge React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Badge Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Badge MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat&logo=mysql&logoColor=white)

## 📖 Sobre o Projeto

O **SaudePositivoAPP** é uma solução completa composta por um aplicativo móvel e uma API backend para gerenciamento de pacientes e exames de hematologia. O sistema permite o cadastro de pacientes, controle de usuários (com níveis de acesso) e registro detalhado de exames laboratoriais.

---

## 🚀 Tecnologias Utilizadas

### Mobile (PositivoAPP)
- **React Native** (via Expo SDK 54)
- **React Navigation** (Stack & Bottom Tabs)
- **Axios** para consumo de API
- **AsyncStorage** para persistência local

### Backend
- **Node.js** com **Express**
- **MySQL** (banco de dados relacional)
- **JWT** para autenticação segura
- **Swagger** para documentação da API

---

## ⚙️ Funcionalidades

- **Autenticação**: Login seguro e gestão de usuários (Admin/Comum).
- **Gestão de Pacientes**: Cadastro e visualização de dados de pacientes.
- **Exames**: Registro completo de exames de hematologia (Hemácias, Hemoglobina, Leucócitos, etc.).
- **Relacionamentos**: Associação de exames a pacientes e responsáveis (médicos/preceptores).

---

## 📦 Como Executar

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [MySQL](https://www.mysql.com/) instalado e rodando.
- [Expo Go](https://expo.dev/client) no seu celular ou um emulador Android/iOS.

### 1. Configuração do Banco de Dados
1. Crie um banco de dados MySQL chamado `laboratorio`.
2. Importe o arquivo `laboratorio.sql` localizado na raiz do projeto para criar as tabelas e dados iniciais.
   ```sql
   CREATE DATABASE laboratorio;
   USE laboratorio;
   -- Importe o conteúdo de laboratorio.sql aqui
   ```
   > **Nota:** A configuração padrão do backend espera o usuário `root` sem senha. Se o seu banco tiver senha, altere o arquivo `backend/database/connection.js`.

### 2. Configuração do Backend
1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   # O servidor rodará em http://localhost:3000 (ou porta definida)
   ```

### 3. Configuração do Mobile
1. Em um novo terminal, acesse a pasta do app:
   ```bash
   cd PositivoAPP
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o Expo:
   ```bash
   npx expo start
   ```
4. Escaneie o QR Code com o app **Expo Go** ou pressione `a` para abrir no emulador Android.

---

## 📂 Estrutura do Projeto

```
SaudePositivoAPP/
├── PositivoAPP/       # Código fonte do aplicativo móvel (React Native)
├── backend/           # API e lógica do servidor (Node.js)
├── laboratorio.sql    # Script de criação e população do banco de dados
└── README.md          # Documentação do projeto
```

## 📄 Licença

Este projeto está licenciado sob a licença **ISC**.
