const taxaSelicAnual = 0.1175; // Taxa SELIC 11,75% a.a.

    function calcularRendimento() {
      // Capturar valores do formulário
      const valorInicial = parseFloat(document.getElementById('valorInicial').value);
      const valorMensal = parseFloat(document.getElementById('valorMensal').value);
      const prazo = parseInt(document.getElementById('prazo').value);

      // Verificar se todos os campos estão preenchidos corretamente
      if (isNaN(valorInicial) || isNaN(valorMensal) || isNaN(prazo)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }

      // Conversão da taxa SELIC anual para mensal
      const taxaSelicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;

      let montante = valorInicial;
      let rendimentoTotal = 0;
      let tabelaHTML = '';
      
      // Cálculo mês a mês com valor aplicado mensalmente
      for (let i = 1; i <= prazo; i++) {
        let rendimentoMensal = montante * taxaSelicMensal;
        rendimentoTotal += rendimentoMensal;
        montante += rendimentoMensal + valorMensal; // Soma o rendimento mensal e o valor aplicado

        tabelaHTML += `
          <tr>
            <td>${i}</td>
            <td>R$ ${valorMensal.toFixed(2)}</td>
            <td>R$ ${rendimentoMensal.toFixed(2)}</td>
            <td>R$ ${montante.toFixed(2)}</td>
          </tr>
        `;
      }

      const resultado = montante.toFixed(2);

      // Exibir o resultado geral
      document.getElementById('resultadoGeral').innerHTML = `<p>Após ${prazo} meses, seu montante total será de <strong>R$ ${resultado}</strong>.</p>`;

      // Preencher a tabela com os resultados mensais
      document.getElementById('tabelaRendimentos').innerHTML = tabelaHTML;

      // Exibir o modal com a tabela de resultados
      const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
      modal.show();
    }