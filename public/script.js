// public/script.js

// Define a URL base da nossa API.
// Como o frontend está sendo servido pelo mesmo Express (na pasta 'public'),
// podemos usar caminhos relativos.
const API_URL = '/api';

// Elementos do DOM que vamos manipular
const divOpcoesVoto = document.getElementById('opcoes-voto');
const divListaResultados = document.getElementById('lista-resultados');

// Função principal que carrega os dados da API
async function carregarEnquete() {
console.log('Buscando dados da enquete...');
try {
const response = await fetch(`${API_URL}/votos`);
if (!response.ok) {
throw new Error('Falha ao carregar dados da API');
}
const votos = await response.json();

console.log('Dados recebidos:', votos);

// Atualiza a interface (UI) com os dados
atualizarUI(votos);

} catch (error) {
console.error('Erro ao carregar enquete:', error);
divOpcoesVoto.innerHTML = '<p>Erro ao carregar. Tente novamente mais tarde.</p>';
}
}

// Função para atualizar os botões e resultados
function atualizarUI(votos) {
// Limpa o conteúdo atual
divOpcoesVoto.innerHTML = '';
divListaResultados.innerHTML = '';

// Cria os botões de voto
votos.forEach(opcao => {
// Cria o botão
const botao = document.createElement('button');
botao.textContent = opcao.opcao_nome;
botao.classList.add('btn');

// Adiciona o evento de clique para votar
botao.addEventListener('click', () => {
votar(opcao.opcao_nome);
});

divOpcoesVoto.appendChild(botao);
});

// Cria os itens de resultado
votos
.sort((a, b) => b.total_votos - a.total_votos) // Ordena do mais votado para o menos
.forEach(opcao => {
const item = document.createElement('div');
item.className = 'resultados-item';

// Usamos <span> para separar o nome dos votos
item.innerHTML = `${opcao.opcao_nome} <span>${opcao.total_votos} votos</span>`;

divListaResultados.appendChild(item);
});
}

// Função para registrar um voto
async function votar(opcao) {
console.log(`Votando em: ${opcao}`);
try {
// Desabilita os botões para evitar votos duplicados
divOpcoesVoto.querySelectorAll('button').forEach(b => b.disabled = true);
divOpcoesVoto.insertAdjacentHTML('beforeend', '<p>Registrando voto...</p>');

const response = await fetch(`${API_URL}/votar/${opcao}`, {
method: 'POST',
});

if (!response.ok) {
throw new Error('Falha ao registrar voto.');
}

// Se o voto foi ok, apenas recarregamos a enquete para mostrar o resultado
await carregarEnquete();

} catch (error) {
console.error('Erro ao votar:', error);
alert('Houve um erro ao registrar seu voto.');
// Recarrega mesmo em caso de erro para reabilitar os botões
await carregarEnquete();
}
}

// --- Ponto de Partida ---
// Quando a página carregar, chama a função principal
document.addEventListener('DOMContentLoaded', carregarEnquete);