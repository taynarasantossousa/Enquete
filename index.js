// index.js (Nosso Backend)
// 1. Importar os módulos

const express = require('express');
const mysql = require('mysql2/promise'); // Usamos a versão com 'Promise' para async/await
const cors = require('cors');

// 2. Configurações iniciais

const app = express();
const port = 3000; // Porta que o servidor vai rodar

// 3. Middlewares

app.use(cors()); // Habilita o CORS para aceitar requisições do nosso frontend
app.use(express.json()); // Habilita o Express para entender JSON no corpo das requisições

// 4. Configuração da Conexão com o MySQL
// (Lembre os alunos de alterarem para suas credenciais)

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'flamingo', // <-- MUDAR AQUI
    database: 'enquete_db' // <-- MUDAR AQUI (se o nome do DB for diferente)
};

// 5. Servir o Frontend (HTML, CSS, JS)
// O Express vai servir os arquivos da pasta 'public'

app.use(express.static('public'));

// --- NOSSAS ROTAS DE API ---

// 6. Rota [GET] /api/votos
// Objetivo: Buscar a contagem atual de votos no banco de dados.

app.get('/api/votos', async (req, res) => {
    console.log('Recebida requisição GET /api/votos');
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT opcao_nome, total_votos FROM tbl_votos');
        await connection.end();
        // Retorna os dados como JSON
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar votos:', error);
        res.status(500).json({ message: 'Erro ao buscar votos.' });
    }
});

// 7. Rota [POST] /api/votar/:opcao
// Objetivo: Registrar um voto para uma opção específica.

app.post('/api/votar/:opcao', async (req, res) => {
    const opcao = req.params.opcao;
    console.log(`Recebido voto para: ${opcao}`);

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Query para incrementar o voto

        const query = 'UPDATE tbl_votos SET total_votos = total_votos + 1 WHERE opcao_nome = ?';
        const [result] = await connection.execute(query, [opcao]);
        await connection.end();
        if (result.affectedRows === 0) {
            // Se nenhuma linha foi afetada, a opção não existe
            return res.status(404).json({ message: 'Opção de voto não encontrada.' });
        }
        
        // Responde com sucesso
        res.status(200).json({ message: `Voto para ${opcao} registrado com sucesso!` });

    } catch (error) {
        console.error(`Erro ao votar em ${opcao}:`, error);
        res.status(500).json({ message: 'Erro ao registrar voto.' });
    }

});

// 8. Iniciar o Servidor

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Sirva o frontend abrindo http://localhost:3000 no seu navegador.');
});