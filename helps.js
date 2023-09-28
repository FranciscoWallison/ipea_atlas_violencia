import { selectElement } from "./select.js";

const grafico_pizza = document.getElementById("pizza");
const grafico_homem = document.getElementById("homem");
const grafico_mulher = document.getElementById("mulher");
const grafico_ano = document.getElementById("ano");

const getNomeEstado = (uf) => {
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
};

const estado_click = (element) => {
  const e = element.currentTarget;

  document.getElementById("login").classList.add("d-block");
  document.getElementById("login").classList.remove("d-none");
  document.getElementById("main").classList.add("d-none");
  document.getElementById("main").classList.remove("d-block");

  // INICIANDO
  let selected_value = selectElement.value;

  const select_map_removes = document.querySelectorAll(".select-map");
  select_map_removes.forEach((select_map_remove) => {
    select_map_remove.classList.remove("select-map");
  });

  const id = e.id.split("_")

  const infor_state_icon = id[id.length -1];
  const infor_state =  id[id.length -1];

  const infor_state_icon_text = `icon_${infor_state_icon}`;

  const select_map = `shape_${infor_state}`;

  const element_state_icon_text = document.getElementById(
    infor_state_icon_text
  );

  const element_select_map = document.getElementById(select_map);

  if (element_state_icon_text != null) {
    element_state_icon_text.classList.add("select-map");
  } else {
    element_select_map.classList.add("select-map");
  }

  let filter_homens = [];
  let filter_mulheres = [];

  // TODO:: codigo repetido
  if (selectElement.value === "Todos" || select_map_removes.length === 0) {
    if (select_map_removes.length === 0) {
      filter_homens = window.homicidios_de_homens;
      filter_mulheres = window.homicidios_de_mulheres;
    } else {
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
    selected_value = `${selected_value} os anos`;
  } else {
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
  grafico_ano.innerHTML = `${selected_value} - ${getNomeEstado(
    infor_state.toLocaleUpperCase()
  )}`;

  // FIM
  document.getElementById("login").classList.add("d-none");
  document.getElementById("login").classList.remove("d-block");
  document.getElementById("main").classList.add("d-block");
  document.getElementById("main").classList.remove("d-none");
};

export {
  getNomeEstado,
  estado_click,
  grafico_pizza,
  grafico_homem,
  grafico_mulher,
  grafico_ano,
};
