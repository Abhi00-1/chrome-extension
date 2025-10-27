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


function renderNotes(notes) {
  let display = "";
  if (notes.length >= 1) {
    for (let i = 0; i < notes.length; i++) {
      display += `<div class='note'>
      <button id="x" class="x" >x</button>
      <h3>${notes[i]}</h3>
      </div>`;
    }
  } else {
    display += `<h2>Notes:</h2><div class="note"><h3>Empty</h3><h4>(create new productivity)</h4></div>`;
  }
  displayBoard.innerHTML = display;
}

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