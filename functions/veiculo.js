function calcularFinanciamento() {
    // Obter os valores dos campos do formulário
    const valorBem = parseFloat(document.getElementById('valorBem').value);
    const valorEntrada = parseFloat(document.getElementById('valorEntrada').value) || 0; // Se não for preenchido, será 0
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100; // Converte para decimal

    // Validação dos campos
    if (isNaN(valorBem) || isNaN(prazo) || isNaN(taxaJuros)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Valor do bem após subtrair a entrada
    const valorFinanciado = valorBem - valorEntrada;

    // Verificar se o valor financiado é positivo
    if (valorFinanciado <= 0) {
      alert("O valor da entrada não pode ser maior ou igual ao valor do bem.");
      return;
    }

    // Fórmula de cálculo do financiamento com juros compostos (Price)
    const parcela = (valorFinanciado * (taxaJuros * Math.pow(1 + taxaJuros, prazo))) / (Math.pow(1 + taxaJuros, prazo) - 1);

    const valorTotal = parcela * prazo;
    const totalJuros = valorTotal - valorFinanciado; // Total de juros pagos

    // Gerar a tabela de resultados
    const tabelaResultados = `
      <tr>
        <td>Valor do Bem</td>
        <td>R$ ${valorBem.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Valor de Entrada</td>
        <td>R$ ${valorEntrada.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Valor Financiado</td>
        <td>R$ ${valorFinanciado.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Valor da Parcela</td>
        <td>R$ ${parcela.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Valor Total Pago</td>
        <td>R$ ${valorTotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Total de Juros Pagos</td>
        <td>R$ ${totalJuros.toFixed(2)}</td>
      </tr>
    `;
    
    document.getElementById('resultadoTabela').innerHTML = tabelaResultados;

    // Mostrar o modal com o resultado
    var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    modal.show();
  }