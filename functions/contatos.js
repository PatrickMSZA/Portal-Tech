const contatos = [];

// Função para adicionar um novo contato
function adicionarContato() {
  const nome = document.getElementById('nome').value;
  const celular = document.getElementById('celular').value;

  // Validação básica para o nome (não pode estar vazio)
  if (nome === "") {
    alert("Por favor, insira o nome.");
    return;
  }

  // Validação básica para celular (deve ter pelo menos 10 dígitos)
  const celularNumerico = celular.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (celularNumerico.length < 10) {
    alert("Por favor, insira um número de celular válido.");
    return;
  }

  // Adiciona o novo contato ao array
  contatos.push({ nome, celular: celularNumerico });

  // Atualiza a tabela com os novos contatos
  atualizarTabela();

  // Exibe o modal com a tabela
  const contatosModal = new bootstrap.Modal(document.getElementById('contatosModal'));
  contatosModal.show();

  // Limpa o formulário
  document.getElementById('contatoForm').reset();
}

// Função para atualizar a tabela de contatos
function atualizarTabela() {
  const tabela = document.getElementById('contatosTabela');
  tabela.innerHTML = ''; // Limpa a tabela

  contatos.forEach((contato, index) => {
    // Gera o link para WhatsApp com base no número de celular
    const whatsappLink = `https://wa.me/${contato.celular}`;

    // Cria a linha da tabela
    const row = `
      <tr>
        <td>${contato.nome}</td>
        <td>${contato.celular}</td>
        <td><a href="${whatsappLink}" target="_blank" class="btn btn-success">Abrir WhatsApp</a></td>
        <td><button class="btn btn-danger" onclick="excluirContato(${index})">Excluir</button></td>
      </tr>
    `;
    tabela.innerHTML += row;
  });
}

// Função para excluir um contato pelo índice
function excluirContato(index) {
  contatos.splice(index, 1); // Remove o contato pelo índice
  atualizarTabela(); // Atualiza a tabela após a exclusão
}