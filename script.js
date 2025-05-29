const API_URL = 'http://localhost:8080/colaboradores';

const colaboradorForm = document.getElementById('colaboradorForm');
const colaboradorIdInput = document.getElementById('colaboradorId');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const fotoInput = document.getElementById('foto');
const linkCurriculoInput = document.getElementById('linkCurriculo');
const submitButton = document.getElementById('submitButton');
const clearFormButton = document.getElementById('clearFormButton');

const searchIdInput = document.getElementById('searchId');
const searchButton = document.getElementById('searchButton');
const loadAllButton = document.getElementById('loadAllButton');
const colaboradoresListDiv = document.getElementById('colaboradoresList');

// --- Funções Auxiliares ---

// Limpa o formulário
function clearForm() {
    colaboradorIdInput.value = '';
    nomeInput.value = '';
    emailInput.value = '';
    telefoneInput.value = '';
    fotoInput.value = '';
    linkCurriculoInput.value = '';
    submitButton.textContent = 'Cadastrar';
}

// Preenche o formulário para edição
function fillFormForEdit(colaborador) {
    colaboradorIdInput.value = colaborador.id;
    nomeInput.value = colaborador.nome;
    emailInput.value = colaborador.email;
    telefoneInput.value = colaborador.telefone;
    fotoInput.value = colaborador.foto || ''; // Usa '' se for null
    linkCurriculoInput.value = colaborador.linkCurriculo || ''; // Usa '' se for null
    submitButton.textContent = 'Salvar Edição';
    window.scrollTo(0, 0); // Rola para o topo para facilitar a edição
}

// Renderiza a lista de colaboradores na UI
function renderColaboradores(colaboradores) {
    colaboradoresListDiv.innerHTML = ''; // Limpa a lista existente

    if (!colaboradores || colaboradores.length === 0) {
        colaboradoresListDiv.innerHTML = '<p>Nenhum colaborador encontrado.</p>';
        return;
    }

    colaboradores.forEach(colaborador => {
        const colaboradorCard = document.createElement('div');
        colaboradorCard.classList.add('colaborador-card');
        colaboradorCard.innerHTML = `
            <h3>${colaborador.nome} (ID: ${colaborador.id})</h3>
            <p><strong>Email:</strong> ${colaborador.email}</p>
            <p><strong>Telefone:</strong> ${colaborador.telefone}</p>
            ${colaborador.foto ? `<p><img src="${colaborador.foto}" alt="Foto" style="max-width: 100px;"></p>` : ''}
            ${colaborador.linkCurriculo ? `<p><a href="${colaborador.linkCurriculo}" target="_blank">Currículo</a></p>` : ''}
            <button class="edit-button" data-id="${colaborador.id}">Editar</button>
            <button class="delete-button" data-id="${colaborador.id}">Excluir</button>
        `;
        colaboradoresListDiv.appendChild(colaboradorCard);
    });

    // Adiciona event listeners para os botões de editar e excluir
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar colaborador para edição: ${response.statusText}`);
                }
                const colaborador = await response.json();
                fillFormForEdit(colaborador);
            } catch (error) {
                console.error('Erro ao buscar colaborador para edição:', error);
                alert('Erro ao carregar dados do colaborador para edição.');
            }
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            if (confirm(`Tem certeza que deseja excluir o colaborador com ID ${id}?`)) {
                await deleteColaborador(id);
            }
        });
    });
}

// --- Funções de Requisição para a API ---

// GET: Carrega todos os colaboradores
async function loadAllColaboradores() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar colaboradores: ${response.statusText}`);
        }
        const colaboradores = await response.json();
        renderColaboradores(colaboradores);
    } catch (error) {
        console.error('Erro ao carregar colaboradores:', error);
        colaboradoresListDiv.innerHTML = '<p style="color: red;">Erro ao carregar colaboradores. Verifique se a API está rodando.</p>';
    }
}

// GET: Pesquisa um colaborador por ID ou Email
async function searchColaborador(query) {
    try {
        let url = API_URL;
        if (query) {
             // Se for um número, tenta buscar por ID. Se não, tenta buscar por email (assumindo que sua API permite isso)
            if (!isNaN(query) && query.trim() !== '') {
                url = `${API_URL}/${query}`; // Assume que sua API tem /colaboradores/{id}
            } else {
                url = `${API_URL}/email/${query}`; // Assume que sua API tem /colaboradores/email/{email}
            }
        }
        
        const response = await fetch(url);
        
        if (response.status === 404) { // Não encontrado
            renderColaboradores([]); // Limpa a lista
            alert('Colaborador não encontrado.');
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro na pesquisa: ${response.statusText}`);
        }
        
        const data = await response.json();
        // Se a API retorna um único objeto para busca por ID, transforme em array para renderizar
        if (Array.isArray(data)) {
            renderColaboradores(data);
        } else {
            renderColaboradores([data]);
        }
    } catch (error) {
        console.error('Erro ao pesquisar colaborador:', error);
        alert('Erro ao pesquisar colaborador. Verifique o ID/Email e se a API suporta esta busca.');
        renderColaboradores([]);
    }
}

// POST/PUT: Cadastra ou Edita um colaborador
async function saveColaborador(colaboradorData) {
    const isEditing = colaboradorData.id;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}` : API_URL; // PUT geralmente usa a mesma base, mas o ID vai no corpo

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colaboradorData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} colaborador: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        alert(`Colaborador ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
        clearForm();
        loadAllColaboradores(); // Recarrega a lista após a operação
    } catch (error) {
        console.error(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} colaborador:`, error);
        alert(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} colaborador. Verifique o console para detalhes.`);
    }
}

// DELETE: Remove um colaborador
async function deleteColaborador(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir colaborador: ${response.statusText}`);
        }

        alert('Colaborador excluído com sucesso!');
        loadAllColaboradores(); // Recarrega a lista após a exclusão
    } catch (error) {
        console.error('Erro ao excluir colaborador:', error);
        alert('Erro ao excluir colaborador. Verifique o console para detalhes.');
    }
}

// --- Event Listeners ---

// Submissão do Formulário
colaboradorForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const colaboradorData = {
        id: colaboradorIdInput.value ? parseInt(colaboradorIdInput.value) : null,
        nome: nomeInput.value,
        email: emailInput.value,
        telefone: telefoneInput.value,
        foto: fotoInput.value || null, // Envia null se o campo estiver vazio
        linkCurriculo: linkCurriculoInput.value || null // Envia null se o campo estiver vazio
    };

    saveColaborador(colaboradorData);
});

// Limpar Formulário
clearFormButton.addEventListener('click', clearForm);

// Pesquisar Colaborador
searchButton.addEventListener('click', () => {
    const query = searchIdInput.value.trim();
    searchColaborador(query);
});

// Carregar Todos os Colaboradores
loadAllButton.addEventListener('click', loadAllColaboradores);

// Carregar colaboradores ao carregar a página
document.addEventListener('DOMContentLoaded', loadAllColaboradores);