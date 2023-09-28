// Obtém uma referência para o elemento <select>
const selectElement = document.getElementById("select_data"); // Substitua 'seuSelect' pelo ID real do seu elemento <select>

// Loop para criar as opções de 2000 a 2019
for (let year = 2000; year <= 2019; year++) {
  const optionElement = document.createElement("option");
  optionElement.value = year;
  optionElement.text = year;
  selectElement.appendChild(optionElement);
}

export {selectElement};