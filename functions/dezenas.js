function gerarDezenas() {
  const dezenas = [];
  
  while (dezenas.length < 6) {
    const numero = Math.floor(Math.random() * 60) + 1;
    if (!dezenas.includes(numero)) {
      dezenas.push(numero);
    }
  }
  
  dezenas.sort((a, b) => a - b);

  // Formata as dezenas usando apenas classes Bootstrap
  const dezenasFormatadas = dezenas.map(numero => {
    return `
      <div class="d-inline-flex justify-content-center align-items-center rounded-circle bg-success text-white m-1" 
           style="width: 50px; height: 50px; font-size: 20px;">
        ${String(numero).padStart(2, '0')}
      </div>`;
  }).join('');

  document.getElementById('resultadoDezenas').innerHTML = dezenasFormatadas;

  var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
  modal.show();
}