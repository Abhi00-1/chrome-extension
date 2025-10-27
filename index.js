const createbtn = document.getElementById("create");
const custombtn = document.getElementById("create-custom");
const createUi = document.getElementById("create-ui");
const createSave = document.getElementById("create-save");
const createInput = document.getElementById("create-text");
const customInput = document.getElementById("custom-text");
const displayBoard = document.querySelector(".display-board");
const customUi = document.getElementById("custom-ui");
const deleteAllBtn = document.getElementById("delete-btn");
const customSave = document.getElementById("custom-save");
const customDeleteAllBtn=document.getElementById("custom-delete-btn")

let generalNotes = [];



createbtn.addEventListener("click", function () {
  createUi.classList.toggle("hidden");
});

custombtn.addEventListener("click", function () {
  customUi.classList.toggle("hidden");
});

createSave.addEventListener("click", function () {
  if (!createInput.value.trim()) return;
  generalNotes.push(createInput.value.trim());
  chrome.storage.local.set({ notes: generalNotes });
  createInput.value = "";
  createUi.classList.toggle("hidden");
  renderNotes(generalNotes);
});