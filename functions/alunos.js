const alunos = [];

// Função para adicionar um novo aluno
function adicionarAluno() {
  const nome = document.getElementById('nome').value;
  const altura = parseFloat(document.getElementById('altura').value);
  const peso = parseFloat(document.getElementById('peso').value);

  // Validação básica
  if (nome === "" || isNaN(altura) || isNaN(peso)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Adiciona o aluno à lista
  alunos.push({ nome, altura, peso });

  // Atualiza a tabela e as médias
  atualizarTabela();
  atualizarMedias();

  // Exibe o modal com a tabela
  const alunosModal = new bootstrap.Modal(document.getElementById('alunosModal'));
  alunosModal.show();

  // Limpa o formulário
  document.getElementById('alunoForm').reset();
}

// Função para atualizar a tabela de alunos
function atualizarTabela() {
  const tabela = document.getElementById('alunosTabela');
  tabela.innerHTML = ''; // Limpa a tabela

  alunos.forEach((aluno, index) => {
    const row = `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.altura.toFixed(2)}</td>
        <td>${aluno.peso.toFixed(1)}</td>
        <td><button class="btn btn-danger" onclick="excluirAluno(${index})">Excluir</button></td>
      </tr>
    `;
    tabela.innerHTML += row;
  });
}

// Função para atualizar as médias de altura e peso
function atualizarMedias() {
  const totalAlunos = alunos.length;
  const mediaAltura = totalAlunos > 0 ? alunos.reduce((sum, aluno) => sum + aluno.altura, 0) / totalAlunos : 0;
  const mediaPeso = totalAlunos > 0 ? alunos.reduce((sum, aluno) => sum + aluno.peso, 0) / totalAlunos : 0;

  document.getElementById('mediaAltura').textContent = mediaAltura.toFixed(2);
  document.getElementById('mediaPeso').textContent = mediaPeso.toFixed(1);
}

// Função para excluir um aluno
function excluirAluno(index) {
  alunos.splice(index, 1); // Remove o aluno pelo índice
  atualizarTabela(); // Atualiza a tabela após a exclusão
  atualizarMedias(); // Atualiza as médias
}