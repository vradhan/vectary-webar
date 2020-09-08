import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

let vctrApi;

const menuElement = document.getElementById("menu");
const toggleElement = document.getElementById("menu-toggle");

const annotationsMap = new Map();

menuElement.classList.add("closed");

toggleElement.onclick = function() {
  this.classList.toggle("is-active");

  if (menuElement.classList.contains("open")) {
    menuElement.classList.remove("open");
    menuElement.classList.add("closed");
  } else {
    menuElement.classList.remove("closed");
    menuElement.classList.add("open");
  }
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

//Creating items
const createItem = (elementId, dataHighlight, name) => {
  const items = document.getElementById(elementId);
  let newItem = document.createElement("li");
  let link = document.createElement("a");
  link.href = "#";
  link.setAttribute("data-highlight", dataHighlight);
  link.append(name);
  newItem.appendChild(link);
  items.appendChild(newItem);
};

const items1 = [
  {
    name: "Grape Stage",
    enName: "Grape Stage",
    data: "grape_stage,grape_stage_1",
  },
  {
    name: "Orange stage",
    enName: "Orange Stage",
    data: "orange_stage,orange_stage_2",
  },
  {
    name: "Suzuki stage",
    enName: "Suzuki Stage",
    data: "suzuki_stage,suzuki_stage_2",
  },
  {
    name: "365.Bank stage",
    enName: "365.Bank Stage",
    data: "365_stage,365_stage_1,365_stage_2",
  },
  { name: "Nay stage", enName: "Nay Stage", data: "nay_stage" },
  {
    name: "Rádio_FM Urban market hangair",
    enName: "Rádio_FM Urban market hangair",
    data: "radio_fm_urban_market_hangair",
  },
  {
    name: "Redbull rapstorm stage",
    enName: "Redbull rapstorm stage",
    data:
      "red_bull_rapstorm_stage_1,red_bull_rapstorm_stage_2,red_bull_rapstorm_stage_3,red_bull_rapstorm_stage_4,red_bull_rapstorm_stage_5",
  },
  { name: "Očistec stage", enName: "Očistec stage", data: "ocistec_stage" },
  {
    name: "Hlavný vstup",
    enName: "Main entrance",
    data: "main_entry_2,main_entry_3",
  },
  {
    name: "Vstup stanové mesto",
    enName: "Entrance for tent city",
    data: "entry_tent_city",
  },
  {
    name: 'Biela noc "Perspektíva"',
    enName: 'Biela noc "Perspektíva"',
    data: "biela_noc_perspektiva_1,biela_noc_perspektiva_2",
  },
];

const items2 = [
  {
    name: "Úschovňa / Straty a nálezy",
    enName: "Depository / Lost and found",
    data: "uschovna",
  },
  { name: "Mazagrande", enName: "Mazagrande", data: "mazagrande" },
  {
    name: "Kaufland zóna",
    enName: "Kaufland zone",
    data: "kaufland_zona,kaufland_zona_1,kaufland_zona_2,kaufland_zona_3",
  },
  { name: "365.Bank cafe", enName: "365.Bank cafe", data: "365bank_cafe" },
  { name: "Camp manager", enName: "Camp manager", data: "camp_manager" },
  { name: "Corny šport", enName: "orny sport", data: "futbalka_3" },
  {
    name: "Grape pavilon",
    enName: "Grape pavilon",
    data: "grape_pavilon,grape_pavilon_1",
  },
  { name: "Frisco sunset", enName: "Frisco sunset", data: "pomaranc_3" },
  { name: "Nivea / Rowenta", enName: "Nivea / Rowenta", data: "ruz_3" },
  { name: "Birell", enName: "Birell", data: "trampolina_3" },
  { name: "Požičovňa", enName: "Rental", data: "pozicovna" },
  { name: "Good point", enName: "Good point", data: "stolicka_3" },
  {
    name: "Orange zóna",
    enName: "Orange zone",
    data: "orange_zona_2,orange_zona_3,orange_zona_4,orange_zona_5",
  },
  { name: "Pilsner Urquell", enName: "Pilsner Urquell", data: "pilsner" },
  { name: "SSE zóna", enName: "SSE zone", data: "sse_zona" },
  { name: "Tržnica", enName: "Market", data: "trznica#10" },
  { name: "Gastro", enName: "Gastro", data: "gastro" },
  { name: "Jameson", enName: "Jameson", data: "jameson_2,jameson_3" },
  {
    name: "Gambrinus truck",
    enName: "Gambrinus truck",
    data: "ambrinus_bus_1,gambrinus_bus_2,gambrinus_bus_3,gambrinus_bus_4",
  },
  { name: "Shop", enName: "Shop", data: "shop" },
  {
    name: "Royal crown zóna",
    enName: "Royal crown zóna",
    data: "oyal_crown_zona_1,royal_crown_zona_2",
  },
  {
    name: "Mastercard",
    enName: "Mastercard",
    data: "master_card,master_card_1,master_card_2,master_card_3",
  },
  { name: "Avon", enName: "Avon", data: "avon" },
  {
    name: "Urban market",
    enName: "Urban market",
    data: "urban_market_1,skeleton_urban_market",
  },
  {
    name: "Red bull organics",
    enName: "Red bull organics",
    data: "edbull_organic_3",
  },
];

const items3 = [
  { name: "Nabíjačkareň", enName: "Charge station", id: "nabijackaren" },
  { name: "Cigarety", enName: "Cigarettes", id: "cigarety" },
  { name: "Káva", enName: "Coffee", id: "kava" },
  { name: "Red Bull", enName: "Red Bull", id: "redbull" },
  { name: "Bankomat", enName: "ATM", id: "bankomat" },
  { name: "Vináreň", enName: "Wine bar", id: "vinaren" },
  { name: "Víno", enName: "Wine", id: "vino" },
  { name: "Pivo", enName: "Beer", id: "pivo" },
  { name: "Bar", enName: "Bar", id: "bar" },
  { name: "Keramické WC", enName: "Ceramic WC", id: "keramickewc" },
  { name: "Sprchy", enName: "Showers", id: "sprcha" },
  { name: "WC", enName: "WC", id: "wc" },
  { name: "Voda", enName: "Water", id: "voda" },
];

if (getQueryVariable("lang") === "en") {
  const search = document.createElement("span");
  search.className = "text";
  search.append("Search");
  document.getElementsByClassName("hamburger-inner")[0].appendChild(search);

  items1.forEach(item => {
    createItem("items1", item.data, item.enName);
  });

  items2.forEach(item => {
    createItem("items2", item.data, item.enName);
  });

  items3.forEach(item => {
    document.getElementById(item.id).append(item.enName);
  });
} else {
  const search = document.createElement("span");
  search.className = "text";
  search.append("Hľadaj");
  document.getElementsByClassName("hamburger-inner")[0].appendChild(search);

  items1.forEach(item => {
    createItem("items1", item.data, item.name);
  });

  items2.forEach(item => {
    createItem("items2", item.data, item.name);
  });

  items3.forEach(item => {
    document.getElementById(item.id).append(item.name);
  });
}

//Highlighting
const items = document.querySelectorAll("#menu > .inner > ul.items > li > a");

const highlightObjects = function() {
  let meshes = this.getAttribute("data-highlight").split(",");

  vctrApi.highlightMeshesByName(meshes, "#ffe81c", 0.3, true);

  const annotationsIds = meshes
    .filter(mesh => annotationsMap.has(mesh))
    .map(mesh => annotationsMap.get(mesh));
  if (annotationsIds.length) {
    vctrApi.expandAnnotationsById(annotationsIds, true, true);
  }

  toggleElement.classList.toggle("is-active");
  menuElement.classList.remove("open");
  menuElement.classList.add("closed");
};

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", highlightObjects, false);
}

async function run() {
  console.log("Example script running..");

  function errHandler(err) {
    console.log("API error", err);
  }

  function addAnnotation(name, enName, objectName) {
    if (getQueryVariable("lang") === "en") {
      name = enName;
    }
    vctrApi
      .addAnnotation({
        name: name,
        objectName: objectName,
      })
      .then(annotation => {
        if (annotation !== null) {
          annotationsMap.set(objectName, annotation.id);
        }
      });
  }

  function vectorsDistance(v1, v2) {
    return Math.sqrt(
      Math.pow(v1[0] - v2[0], 2) +
        Math.pow(v1[1] - v2[1], 2) +
        Math.pow(v1[2] - v2[2], 2)
    );
  }

  async function onReady() {
    console.log("API ready..");

    const startPosition = [0, 0, 0];
    const startRotation = [0, 0, 0];
    const origin = [0, 0.2, 0];

    

    const r = vectorsDistance(startPosition, origin);

    try {
      console.log(await vctrApi.getObjects());
      // vctrApi.highlightMeshesByName(["inner_fence", "tents", "orange_stage"], "#FF0000", 0.8, false);
     // await vctrApi.setPositionAbsolute("inner_fence", startPosition);
      //await vctrApi.setPositionAbsolute("tents", startPosition);
      //await vctrApi.setRotationAbsolute("inner_fence", startRotation);
      //await vctrApi.setRotationAbsolute("tents", startRotation);

      const getPos = await vctrApi.getPosition("inner_fence");
      console.log(getPos)
      let posXinnerFence = -0.2 - getPos[0];
      let posYinnerFence = -0.2 - getPos[1];
      let posZinnerFence = -0.2 -getPos[2];

      await vctrApi.setPositionAbsolute("inner_fence", [getPos[0],getPos[1],   posZinnerFence]);
      vctrApi.highlightMeshesByName(["inner_fence"], "#FF0000", 0.8, false);

      const runAnimation = () => {
        VctrApi.Utils.animate(
          5000,
          animationDelta => animationDelta,
          animationDelta => {
           

            vctrApi.setPositionAbsolute("inner_fence", [
              origin[0] + posX,
              origin[1] + 0,
              origin[2] + posZ,
            ]);
            vctrApi.setRotationAbsolute("inner_fence", [
              0,
              -360 * animationDelta,
              0,
            ]);

            //vctrApi.setRotationRelative("ground_1", [0, 0, 0.1]);
          },
          () => {
            console.log("Full circle");
           // runAnimation();
          }
        );
      };
     // runAnimation();
      addAnnotation(
        "Úschovňa / Straty a nálezy",
        "Depository / Lost and found",
        "uschovna"
      );
      addAnnotation("Mazagrande", "Mazagrande", "mazagrande");
      addAnnotation("Kaufland zóna", "Kaufland zone", "kaufland_zona");
      addAnnotation("365.Bank cafe", "365.Bank cafe", "365bank_cafe");
      addAnnotation("Camp manager", "Camp manager", "camp_manager");
      addAnnotation("Corny šport", "Corny sport", "futbalka_3");
      addAnnotation("Grape pavilon", "Grape pavilon", "grape_pavilon");
      addAnnotation("Frisco sunset", "Frisco sunset", "pomaranc_3");
      addAnnotation("Nivea / Rowenta", "Nivea / Rowenta", "ruz_3");
      addAnnotation("Birell", "Birell", "trampolina_3");
      addAnnotation("Požičovňa", "Rental", "pozicovna");
      addAnnotation("Good point", "Good point", "stolicka_3");
      addAnnotation("Orange zóna", "Orange zone", "orange_zona_2");
      addAnnotation("Pilsner Urquell", "Pilsner Urquell", "pilsner");
      addAnnotation("SSE zóna", "SSE zone", "sse_zona");
      addAnnotation("Tržnica", "Market", "trznica#10");
      addAnnotation("Gastro", "Gastro", "gastro");
      addAnnotation("Jameson", "Jameson", "jameson_2");
      addAnnotation("Gambrinus truck", "Gambrinus truck", "gambrinus_bus_2");
      addAnnotation("Shop", "Shop", "shop");
      addAnnotation(
        "Royal crown zóna",
        "Royal crown zone",
        "royal_crown_zona_1"
      );
      addAnnotation("Mastercard", "Mastercard", "master_card");
      addAnnotation("Avon", "Avon", "avon");
      addAnnotation("Urban market", "Urban market", "urban_market_1");
      addAnnotation(
        "Red bull organics",
        "Red bull organics",
        "redbull_organic_3"
      );
      addAnnotation("Grape Stage", "Grape Stage", "grape_stage_1");
      addAnnotation("Orange stage", "Orange stage", "orange_stage");
      addAnnotation("Suzuki stage", "Suzuki stage", "suzuki_stage");
      addAnnotation("365.Bank stage", "365.Bank stage", "365_stage");
      addAnnotation("Nay stage", "Nay stage", "nay_stage");
      addAnnotation(
        "Rádio_FM Urban market hangair",
        "Rádio_FM Urban market hangair",
        "radio_fm_urban_market_hangair"
      );
      addAnnotation(
        "Redbull rapstorm stage",
        "Redbull rapstorm stage",
        "red_bull_rapstorm_stage_4"
      );
      addAnnotation("Očistec stage", "Purgatory stage", "ocistec_stage");
      addAnnotation("Hlavný vstup", "Main entrance", "main_entry_2");
      addAnnotation(
        "Vstup stanové mesto",
        "Entrance for tent city",
        "entry_tent_city"
      );
      addAnnotation(
        'Biela noc "Perspektíva"',
        'White night "Perspective"',
        "biela_noc_perspektiva_1"
      );
      addAnnotation("Chill village", "Chill village", "chill_village");
      addAnnotation("Tent Inn", "Tent Inn", "tent_inn");
      addAnnotation("U rampa", "U ramp", "u_rampa");
      addAnnotation("Stanové mestečko", "Tents", "tents");
      addAnnotation("Prvá pomoc", "First aid", "doctor_1");
      addAnnotation("Parking", "Parking", "parking");
      addAnnotation("Taxi", "Taxi", "taxi");
      await vctrApi.enableAnnotations(true);
    } catch (e) {
      errHandler(e);
    }
  }

  vctrApi = new VctrApi("g19", errHandler);
  try {
    await vctrApi.init();
    onReady();
  } catch (e) {
    errHandler(e);
  }
}

run();
