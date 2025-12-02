📊 Projeto: Enquete Rápida (Full-Stack)

 

Um projeto de aula prático que demonstra uma aplicação Full-Stack completa, projetada para funcionar em dispositivos móveis (Web App Responsivo).

 

A aplicação permite que usuários votem em uma enquete simples e vejam os resultados em tempo real.

 

## 🚀 Tecnologias Utilizadas

 

* **Backend:**

    * Node.js

    * Express.js (para a API RESTful)

    * MySQL (com o driver `mysql2`)

    * `cors`

* **Frontend:**

    * HTML5 (Estrutura)

    * CSS3 (Estilização Mobile-First)

    * JavaScript (ES6+ com `fetch` e `async/await` para consumir a API)

 

## Arquitetura

 

Este projeto utiliza uma arquitetura de API desacoplada:

 

1.  **Backend (`index.js`):** Um servidor Express que se conecta ao MySQL e expõe dois endpoints RESTful.

2.  **Frontend (pasta `/public`):** Um cliente estático (HTML/CSS/JS) que consome a API do backend. O próprio Express serve esse frontend para facilitar.

 

## Endpoints da API

 

* `GET /api/votos`

    * **Descrição:** Retorna a contagem de votos atual para todas as opções.

    * **Resposta:** `[ { "opcao_nome": "JavaScript", "total_votos": 5 }, ... ]`

 

* `POST /api/votar/:opcao`

    * **Descrição:** Incrementa o contador de votos para a opção especificada na URL (ex: `/api/votar/Python`).

    * **Resposta (Sucesso):** `{ "message": "Voto para Python registrado com sucesso!" }`

    * **Resposta (Erro):** `{ "message": "Opção de voto não encontrada." }`
