// Array para armazenar empresas
const empresas = [];

// Função para adicionar uma nova empresa
function adicionarEmpresa() {
  const nomeEmpresa = document.getElementById('empresa').value;
  const site = document.getElementById('site').value;
  let instagram = document.getElementById('instagram').value;

  // Validação para garantir que o Instagram comece com "@"
  if (!instagram.startsWith('@')) {
    instagram = '@' + instagram;
  }

  // Gera o link completo para o Instagram
  const instagramLink = `https://www.instagram.com/${instagram.substring(1)}/`;

  // Validação básica para o nome da empresa
  if (nomeEmpresa === "") {
    alert("Por favor, insira o nome da empresa.");
    return;
  }

  // Adiciona a nova empresa ao array
  empresas.push({ nomeEmpresa, site, instagramLink });

  // Atualiza a tabela com as novas empresas
  atualizarTabela();

  // Exibe o modal com a tabela
  const empresasModal = new bootstrap.Modal(document.getElementById('empresasModal'));
  empresasModal.show();

  // Limpa o formulário
  document.getElementById('empresaForm').reset();
}

// Função para atualizar a tabela de empresas
function atualizarTabela() {
  const tabela = document.getElementById('empresasTabela');
  tabela.innerHTML = ''; // Limpa a tabela

  empresas.forEach((empresa, index) => {
    // Cria as linhas da tabela
    const row = `
      <tr>
        <td>${empresa.nomeEmpresa}</td>
        <td><a href="${empresa.site}" target="_blank" class="btn btn-primary">Visitar Site</a></td>
        <td><a href="${empresa.instagramLink}" target="_blank" class="btn btn-info">@${empresa.instagramLink.split('/')[3]}</a></td>
        <td><button class="btn btn-danger" onclick="excluirEmpresa(${index})">Excluir</button></td>
      </tr>
    `;
    tabela.innerHTML += row;
  });
}

// Função para excluir uma empresa pelo índice
function excluirEmpresa(index) {
  empresas.splice(index, 1); // Remove a empresa pelo índice
  atualizarTabela(); // Atualiza a tabela após a exclusão
}