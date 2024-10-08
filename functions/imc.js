function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
  
    // Verificar o sexo selecionado
    const sexo = document.querySelector('input[name="sexo"]:checked');
  
    if (!sexo) {
      alert("Por favor, selecione o sexo.");
      return;
    }
  
    if (isNaN(peso) || isNaN(altura)) {
      alert("Por favor, insira valores válidos para peso e altura.");
      return;
    }
  
    const imc = peso / (altura * altura);
    let categoria = '';
  
    // Condição de classificação de IMC com base no sexo
    if (sexo.value === 'Masculino') {
      // Classificação para homens
      if (imc < 18.5) {
        categoria = 'Abaixo do peso';
      } else if (imc >= 18.5 && imc <= 24.9) {
        categoria = 'Peso normal';
      } else if (imc >= 25 && imc <= 29.9) {
        categoria = 'Sobrepeso';
      } else {
        categoria = 'Obesidade';
      }
    } else if (sexo.value === 'Feminino') {
      // Classificação para mulheres
      if (imc < 18.5) {
        categoria = 'Abaixo do peso';
      } else if (imc >= 18.5 && imc <= 24.9) {
        categoria = 'Peso normal';
      } else if (imc >= 25 && imc <= 29.9) {
        categoria = 'Sobrepeso';
      } else {
        categoria = 'Obesidade';
      }
    }
  
    // Inserir o resultado no modal, exibindo peso e altura inseridos
    document.getElementById('resultadoTexto').innerHTML = `
      <strong>Altura inserida:</strong> ${altura.toFixed(2)} m<br>
      <strong>Peso inserido:</strong> ${peso.toFixed(2)} kg<br>
      <strong>Seu IMC:</strong> ${imc.toFixed(2)}<br>
      <strong>Classificação:</strong> ${categoria}
    `;
    
    // Exibir o modal
    var resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    resultadoModal.show();
  }
  