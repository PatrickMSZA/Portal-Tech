let funcionarios = [];

class Funcionario {
  constructor(nome, salarioBase, horaExtra, periculosidade, insalubridade) {
    this.nome = nome;
    this.salarioBase = parseFloat(salarioBase);
    this.horaExtra = parseFloat(horaExtra);
    this.periculosidade = periculosidade === 'sim' ? this.salarioBase * 0.3 : 0;
    this.insalubridade = parseFloat(insalubridade) / 100 * this.salarioBase;
    this.inss = this.calcularINSS();
    this.irpf = this.calcularIRPF();
    this.vt = this.salarioBase * 0.06; // Vale Transporte (6%)
    this.totalReceber = this.salarioBase + this.horaExtra + this.periculosidade + this.insalubridade - this.inss - this.irpf - this.vt;
  }

  calcularINSS() {
    const salario = this.salarioBase;
    if (salario <= 1302) {
      return salario * 0.075;
    } else if (salario <= 2571.29) {
      return salario * 0.09;
    } else if (salario <= 3856.94) {
      return salario * 0.12;
    } else {
      return salario * 0.14;
    }
  }

  calcularIRPF() {
    const salario = this.salarioBase;
    if (salario <= 1903.98) {
      return 0;
    } else if (salario <= 2826.65) {
      return salario * 0.075;
    } else if (salario <= 3751.05) {
      return salario * 0.15;
    } else if (salario <= 4664.68) {
      return salario * 0.225;
    } else {
      return salario * 0.275;
    }
  }
}

function adicionarFuncionario() {
  const nome = document.getElementById('nome').value;
  const salarioBase = document.getElementById('salarioBase').value;
  const horaExtra = document.getElementById('horaExtra').value;
  const periculosidade = document.getElementById('periculosidade').value;
  const insalubridade = document.getElementById('insalubridade').value;

  // Validação de campos nulos
  if (!nome || !salarioBase || !horaExtra || !periculosidade || !insalubridade) {
    alert("Por favor, preencha todos os campos!");
    return; // Interrompe o cadastro se algum campo estiver vazio
  }

  const funcionario = new Funcionario(nome, salarioBase, horaExtra, periculosidade, insalubridade);

  funcionarios.push(funcionario);
  atualizarModal();
  limparCampos(); // Limpa os campos após adicionar
}

function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('salarioBase').value = '';
  document.getElementById('horaExtra').value = '';
  document.getElementById('periculosidade').value = 'nao';
  document.getElementById('insalubridade').value = '0';
}

function excluirFuncionario(index) {
  funcionarios.splice(index, 1); // Remove o funcionário pelo índice
  atualizarModal();
}

function atualizarModal() {
  const tabela = document.getElementById('tabelaResultadoFuncionario');
  const totalizadores = document.getElementById('tabelaTotais');
  tabela.innerHTML = ''; // Limpa o conteúdo anterior

  let totalSalarioBase = 0, totalHoraExtra = 0, totalPericulosidade = 0, totalInsalubridade = 0;
  let totalVT = 0, totalINSS = 0, totalIRPF = 0, totalReceber = 0;

  funcionarios.forEach((funcionario, index) => {
    totalSalarioBase += funcionario.salarioBase;
    totalHoraExtra += funcionario.horaExtra;
    totalPericulosidade += funcionario.periculosidade;
    totalInsalubridade += funcionario.insalubridade;
    totalVT += funcionario.vt;
    totalINSS += funcionario.inss;
    totalIRPF += funcionario.irpf;
    totalReceber += funcionario.totalReceber;

    const row = `
      <tr>
        <td>${funcionario.nome}</td>
        <td>R$ ${funcionario.salarioBase.toFixed(2)}</td>
        <td>R$ ${funcionario.horaExtra.toFixed(2)}</td>
        <td>R$ ${funcionario.periculosidade.toFixed(2)}</td>
        <td>R$ ${funcionario.insalubridade.toFixed(2)}</td>
        <td>R$ ${funcionario.vt.toFixed(2)}</td>
        <td>R$ ${funcionario.inss.toFixed(2)}</td>
        <td>R$ ${funcionario.irpf.toFixed(2)}</td>
        <td>R$ ${funcionario.totalReceber.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="excluirFuncionario(${index})">Excluir</button></td>
      </tr>
    `;
    tabela.innerHTML += row;
  });

  // Linha de totalizadores
  const totalRow = `
    <tr>
      <th>Total</th>
      <th>R$ ${totalSalarioBase.toFixed(2)}</th>
      <th>R$ ${totalHoraExtra.toFixed(2)}</th>
      <th>R$ ${totalPericulosidade.toFixed(2)}</th>
      <th>R$ ${totalInsalubridade.toFixed(2)}</th>
      <th>R$ ${totalVT.toFixed(2)}</th>
      <th>R$ ${totalINSS.toFixed(2)}</th>
      <th>R$ ${totalIRPF.toFixed(2)}</th>
      <th>R$ ${totalReceber.toFixed(2)}</th>
      <th></th>
    </tr>
  `;
  totalizadores.innerHTML = totalRow;
}