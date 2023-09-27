const grafico_pizza = document.getElementById("pizza");
const grafico_homem = document.getElementById("homem");
const grafico_mulher = document.getElementById("mulher");
const grafico_ano = document.getElementById("ano");

// Obtém uma referência para o elemento <select>
const selectElement = document.getElementById("select_data"); // Substitua 'seuSelect' pelo ID real do seu elemento <select>

// Loop para criar as opções de 2000 a 2019
for (let year = 2000; year <= 2019; year++) {
  const optionElement = document.createElement("option");
  optionElement.value = year;
  optionElement.text = year;
  selectElement.appendChild(optionElement);
}

function getNomeEstado(uf) {
  switch (uf) {
    case "AC":
      return "Acre";
    case "AL":
      return "Alagoas";
    case "AP":
      return "Amapá";
    case "AM":
      return "Amazonas";
    case "BA":
      return "Bahia";
    case "CE":
      return "Ceará";
    case "DF":
      return "Distrito Federal";
    case "ES":
      return "Espírito Santo";
    case "GO":
      return "Goiás";
    case "MA":
      return "Maranhão";
    case "MT":
      return "Mato Grosso";
    case "MS":
      return "Mato Grosso do Sul";
    case "MG":
      return "Minas Gerais";
    case "PA":
      return "Pará";
    case "PB":
      return "Paraíba";
    case "PR":
      return "Paraná";
    case "PE":
      return "Pernambuco";
    case "PI":
      return "Piauí";
    case "RJ":
      return "Rio de Janeiro";
    case "RN":
      return "Rio Grande do Norte";
    case "RS":
      return "Rio Grande do Sul";
    case "RO":
      return "Rondônia";
    case "RR":
      return "Roraima";
    case "SC":
      return "Santa Catarina";
    case "SP":
      return "São Paulo";
    case "SE":
      return "Sergipe";
    case "TO":
      return "Tocantins";
    default:
      return "Estado não encontrado";
  }
}

window.addEventListener("load", async () => {
  const file_homicidios_de_homens =
    "homicidios-de-homens-por-armas-de-fogo.csv";
  const file_homicidios_de_mulheres =
    "homicidios-de-mulheres-por-armas-de-fogo.csv";

  async function logMovies(file) {
    const response = await fetch(file);
    const movies = await response.text();

    const lines = movies.split("\n");
    const headers = lines[0].split(";");
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(";");
      const entry = {};

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = currentLine[j];
      }

      jsonData.push(entry);
    }

    const dados = JSON.parse(JSON.stringify(jsonData, null, 2));
    return dados;
  }

  window.homicidios_de_homens = await logMovies(file_homicidios_de_homens);
  window.homicidios_de_mulheres = await logMovies(file_homicidios_de_mulheres);

  document.getElementById("login").classList.add("d-none");
  document.getElementById("login").classList.remove("d-block");

  document.getElementById("main").classList.add("d-block");
  document.getElementById("main").classList.remove("d-none");

  // iniciando dados de infomações do 200
  let filter_homens = window.homicidios_de_homens.filter(
    (estado) => (estado?.período === undefined ? "" : estado.período) == 2000
  );

  let filter_mulheres = window.homicidios_de_mulheres.filter(
    (estado) => (estado?.período === undefined ? "" : estado.período) == 2000
  );

  let conte_homens = 0;

  filter_homens.forEach((element) => {
    conte_homens += parseInt(element.valor);
  });

  let conte_mulheres = 0;

  filter_mulheres.forEach((element) => {
    conte_mulheres += parseInt(element.valor);
  });

  let total_h_m = conte_mulheres + conte_homens;

  let porcentagem_h = (conte_homens / total_h_m) * 100;
  let porcentagem_m = (conte_mulheres / total_h_m) * 100;

  console.log(
    porcentagem_h.toFixed(),
    conte_homens,
    porcentagem_m.toFixed(),
    conte_mulheres
  );

  grafico_pizza.style.background = `conic-gradient(#3498db ${porcentagem_h.toFixed()}%, #e74c3c 0%)`;

  grafico_homem.innerHTML = ` ${porcentagem_h.toFixed()}%`;
  grafico_mulher.innerHTML = ` ${porcentagem_m.toFixed()}%`;
  grafico_ano.innerHTML = 2000;
});

// Adiciona um ouvinte de evento 'change' ao elemento <select>
selectElement.addEventListener("change", function () {
  // Obtém o valor selecionado
  const selectedValue = selectElement.value;

  console.log("====================================");
  console.log(selectedValue);
  console.log("====================================");

  // iniciando dados de infomações do 200
  let filter_homens = window.homicidios_de_homens.filter(
    (estado) =>
      (estado?.período === undefined ? "" : estado.período) == selectedValue
  );

  let filter_mulheres = window.homicidios_de_mulheres.filter(
    (estado) =>
      (estado?.período === undefined ? "" : estado.período) == selectedValue
  );

  let conte_homens = 0;

  filter_homens.forEach((element) => {
    conte_homens += parseInt(element.valor);
  });

  let conte_mulheres = 0;

  filter_mulheres.forEach((element) => {
    conte_mulheres += parseInt(element.valor);
  });

  let total_h_m = conte_mulheres + conte_homens;

  let porcentagem_h = (conte_homens / total_h_m) * 100;
  let porcentagem_m = (conte_mulheres / total_h_m) * 100;

  console.log(
    porcentagem_h.toFixed(),
    conte_homens,
    porcentagem_m.toFixed(),
    conte_mulheres
  );

  grafico_pizza.style.background = `conic-gradient(#3498db ${porcentagem_h.toFixed()}%, #e74c3c 0%)`;

  grafico_homem.innerHTML = ` ${porcentagem_h.toFixed()}%`;
  grafico_mulher.innerHTML = ` ${porcentagem_m.toFixed()}%`;
  grafico_ano.innerHTML = selectedValue;

  // Exibe o valor selecionado no console (ou faça o que desejar com ele)
  console.log("Valor selecionado:", selectedValue);
});

estado_click = async (e) => {
  document.getElementById("login").classList.add("d-block");
  document.getElementById("login").classList.remove("d-none");
  document.getElementById("main").classList.add("d-none");
  document.getElementById("main").classList.remove("d-block");

  // INICIANDO
  const selectedValue = selectElement.value;

  console.log("====================================");
  console.log(selectedValue);
  console.log("====================================");

  const select_map_removes = document.querySelectorAll(".select-map");
  select_map_removes.forEach((select_map_remove) => {
    select_map_remove.classList.remove("select-map");
  });

  const select_map_icon_removes = document.querySelectorAll(".select-map-icon");
  select_map_icon_removes.forEach((select_map_icon_remove) => {
    select_map_icon_remove.classList.remove("select-map-icon");
  });

  const infor_state = e.id.split("state_")[1];

  const infor_state_icon_text = `icon_${infor_state}`;

  const select_map = `shape_${infor_state}`;

  const element_state_icon_text = document.getElementById(
    infor_state_icon_text
  );
  const element_select_map = document.getElementById(select_map);

  if (element_select_map === null) {
    element_state_icon_text.classList.add("select-map-icon");
  } else {
    element_select_map.classList.add("select-map");
  }
  let filter_homens = window.homicidios_de_homens.filter(
    (estado) =>
      (estado?.nome === undefined ? "" : estado?.nome).toLocaleLowerCase() ===
        infor_state.toLocaleLowerCase() &&
      (estado?.período === undefined ? "" : estado.período) == selectedValue
  );

  let filter_mulheres = window.homicidios_de_mulheres.filter(
    (estado) =>
      (estado?.nome === undefined ? "" : estado?.nome).toLocaleLowerCase() ===
        infor_state.toLocaleLowerCase() &&
      (estado?.período === undefined ? "" : estado.período) == selectedValue
  );

  let conte_homens = 0;

  filter_homens.forEach((element) => {
    conte_homens += parseInt(element.valor);
  });

  let conte_mulheres = 0;

  filter_mulheres.forEach((element) => {
    conte_mulheres += parseInt(element.valor);
  });

  let total_h_m = conte_mulheres + conte_homens;

  let porcentagem_h = (conte_homens / total_h_m) * 100;
  let porcentagem_m = (conte_mulheres / total_h_m) * 100;

  console.log(
    porcentagem_h.toFixed(),
    conte_homens,
    porcentagem_m.toFixed(),
    conte_mulheres
  );

  grafico_pizza.style.background = `conic-gradient(#3498db ${porcentagem_h.toFixed()}%, #e74c3c 0%)`;

  grafico_homem.innerHTML = ` ${porcentagem_h.toFixed()}%`;
  grafico_mulher.innerHTML = ` ${porcentagem_m.toFixed()}%`;
  grafico_ano.innerHTML = `${selectedValue} - ${getNomeEstado(infor_state.toLocaleUpperCase())}`;

  // Exibe o valor selecionado no console (ou faça o que desejar com ele)
  console.log("Valor selecionado:", selectedValue);

  console.log(filter_homens, filter_mulheres);
  // FIM
  document.getElementById("login").classList.add("d-none");
  document.getElementById("login").classList.remove("d-block");
  document.getElementById("main").classList.add("d-block");
  document.getElementById("main").classList.remove("d-none");
};
