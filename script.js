import { formatUnits, parseUnits } from "ethers";

/////////////
// HELPERS //
/////////////

function removeRedundantZeros(str) {
  return str.replace(/\.?0+$/, "");
}

////////
// UI //
////////

const inputsContainer = document.querySelector(".inputs-container");
const weiInput = document.querySelector("#wei-input");
const gweiInput = document.querySelector("#gwei-input");
const etherInput = document.querySelector("#ether-input");

function handleInputChange(e) {
  try {
    const wei =
      e.target.value.trim() === ""
        ? 0n
        : parseUnits(e.target.value, e.target.name.split("-")[0]);

    if (e.target.name !== "wei-input") {
      weiInput.value = formatUnits(wei, "wei");
    }

    if (e.target.name !== "gwei-input") {
      gweiInput.value = removeRedundantZeros(formatUnits(wei, "gwei"));
    }

    if (e.target.name !== "ether-input") {
      etherInput.value = removeRedundantZeros(formatUnits(wei, "ether"));
    }

    inputsContainer.setAttribute("data-error", "false");
  } catch (e) {
    console.error(e);

    inputsContainer.setAttribute("data-error", "true");
  }
}

weiInput.addEventListener("input", handleInputChange);

gweiInput.addEventListener("input", handleInputChange);

etherInput.addEventListener("input", handleInputChange);
