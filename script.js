import {
  getNomeEstado,
  estado_click,
  grafico_pizza,
  grafico_homem,
  grafico_mulher,
  grafico_ano,
} from "./helps.js";
import { selectElement } from "./select.js";

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
  // Obtém o valor selecionado
  let selected_value = selectElement.value;
  let filter_homens = [];
  let filter_mulheres = [];

  if (selectElement.value === "Todos") {
    filter_homens = window.homicidios_de_homens;
    filter_mulheres = window.homicidios_de_mulheres;

    selected_value = `${selected_value} os anos`;
  } else {
    // iniciando dados de infomações do 2000
    filter_homens = window.homicidios_de_homens.filter(
      (estado) => (estado?.período === undefined ? "" : estado.período) == 2000
    );

    filter_mulheres = window.homicidios_de_mulheres.filter(
      (estado) => (estado?.período === undefined ? "" : estado.período) == 2000
    );
  }

  let conte_homens = 0;

  filter_homens.forEach((element) => {
    conte_homens += parseInt(
      element?.valor === undefined ? "0" : element?.valor
    );
  });

  let conte_mulheres = 0;

  filter_mulheres.forEach((element) => {
    conte_mulheres += parseInt(
      element?.valor === undefined ? "0" : element?.valor
    );
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

  document.getElementById("homem_dados").innerHTML = conte_homens;
  document.getElementById("mulher_dados").innerHTML = conte_mulheres;
  grafico_pizza.style.background = `conic-gradient(#3498db ${porcentagem_h.toFixed()}%, #e74c3c 0%)`;
  grafico_homem.innerHTML = ` ${porcentagem_h.toFixed()}%`;
  grafico_mulher.innerHTML = ` ${porcentagem_m.toFixed()}%`;
  grafico_ano.innerHTML = `${selected_value}`;
});

// Adiciona um ouvinte de evento 'change' ao elemento <select>
selectElement.addEventListener("change", function () {
  const select_map_removes = document.querySelectorAll(".select-map");

  // Obtém o valor selecionado
  const selected_value = selectElement.value;
  let infor_state = "";
  let filter_homens = [];
  let filter_mulheres = [];

  console.log("====================================");
  console.log(select_map_removes);
  console.log("====================================");

  // TODO:: codigo repetido
  if (selectElement.value == "Todos" || select_map_removes.length === 0) {
    if (select_map_removes.length === 0 && selectElement.value != "Todos") {
      if (selectElement.value != "Todos") {
        filter_homens = window.homicidios_de_homens.filter(
          (estado) =>
            (estado?.período === undefined ? "" : estado.período) ==
            selected_value
        );

        filter_mulheres = window.homicidios_de_mulheres.filter(
          (estado) =>
            (estado?.período === undefined ? "" : estado.período) ==
            selected_value
        );
      }
    } else {
      const id = select_map_removes[0]?.id.split("_");

      if (id === undefined) {
        filter_homens = window.homicidios_de_homens;
        filter_mulheres = window.homicidios_de_mulheres;
      } else {
        infor_state = id[id.length - 1];

        filter_homens = window.homicidios_de_homens.filter(
          (estado) =>
            (estado?.nome === undefined
              ? ""
              : estado?.nome
            ).toLocaleLowerCase() === infor_state.toLocaleLowerCase()
        );
        filter_mulheres = window.homicidios_de_mulheres.filter(
          (estado) =>
            (estado?.nome === undefined
              ? ""
              : estado?.nome
            ).toLocaleLowerCase() === infor_state.toLocaleLowerCase()
        );
      }
    }
  } else {
    infor_state = select_map_removes[0].id.split("shape_")[1];

    filter_homens = window.homicidios_de_homens.filter(
      (estado) =>
        (estado?.nome === undefined ? "" : estado?.nome).toLocaleLowerCase() ===
          infor_state.toLocaleLowerCase() &&
        (estado?.período === undefined ? "" : estado.período) == selected_value
    );

    filter_mulheres = window.homicidios_de_mulheres.filter(
      (estado) =>
        (estado?.nome === undefined ? "" : estado?.nome).toLocaleLowerCase() ===
          infor_state.toLocaleLowerCase() &&
        (estado?.período === undefined ? "" : estado.período) == selected_value
    );
  }

  let conte_homens = 0;

  filter_homens.forEach((element) => {
    conte_homens += parseInt(
      element?.valor === undefined ? "0" : element?.valor
    );
  });

  let conte_mulheres = 0;

  filter_mulheres.forEach((element) => {
    conte_mulheres += parseInt(
      element?.valor === undefined ? "0" : element?.valor
    );
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

  document.getElementById("homem_dados").innerHTML = conte_homens;
  document.getElementById("mulher_dados").innerHTML = conte_mulheres;

  grafico_pizza.style.background = `conic-gradient(#3498db ${porcentagem_h.toFixed()}%, #e74c3c 0%)`;
  grafico_homem.innerHTML = ` ${porcentagem_h.toFixed()}%`;
  grafico_mulher.innerHTML = ` ${porcentagem_m.toFixed()}%`;

  if (selectElement.value === "Todos") {
    if (select_map_removes.length === 0) {
      grafico_ano.innerHTML = selected_value;
    } else {
      grafico_ano.innerHTML = `${selected_value} os anos`;
    }
  } else {
    if (select_map_removes.length === 0) {
      grafico_ano.innerHTML = `${selected_value}`;
    } else {
      grafico_ano.innerHTML = `${selected_value} - ${getNomeEstado(
        infor_state.toLocaleUpperCase()
      )}`;
    }
  }

  // Exibe o valor selecionado no console (ou faça o que desejar com ele)
  console.log("Valor selecionado:", selected_value);
});

const links = document.querySelectorAll(".estado_link");

// Adiciona um ouvinte de evento de clique a cada link
links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    estado_click(event);
  });
});
