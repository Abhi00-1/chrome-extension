const domain = window.location.hostname;

let container = null;

chrome.storage.local.get(["customNotes"], (result) => {
  const savedCustomNotes = result.customNotes || {};
  const notes = savedCustomNotes[domain] || [];

  if (notes.length > 0) {
    renderNotes(notes, savedCustomNotes);
  }
});



function makeMovable(element) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.style.position = "fixed";
  element.style.cursor = "move";

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    element.style.transition = 'none'; 
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
     
      let left = e.clientX - offsetX;
      let top = e.clientY - offsetY;

      // Keep it inside viewport horizontally
      left = Math.min(window.innerWidth - element.offsetWidth, Math.max(0, left));
      // Keep it inside viewport vertically
      top = Math.min(window.innerHeight - element.offsetHeight, Math.max(0, top));

      element.style.left = left + "px";
      element.style.top = top + "px";
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (isDragging) {
      isDragging = false;
      element.style.transition = ''; // Re-enable CSS transitions if any
    }
  });
}


function createContainer() {
  if (container) return container;
  container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "20px";          // top-right corner
  container.style.right = "20px";
  container.style.background = "rgba(37, 99, 235, 0.95)";
  container.style.padding = "12px 16px";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  container.style.color = "#fff";
  container.style.zIndex = "2147483647";
  container.style.maxWidth = "320px";
  container.style.maxHeight = "400px";   
  container.style.overflowY = "auto";    
  container.style.fontFamily = "Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
  container.style.lineHeight = "1.4";
  document.body.appendChild(container);
  makeMovable(container)
  return container;
}

 function renderNotes(notes, savedCustomNotes) {
  const cont = createContainer();
  cont.innerHTML = "";

  const title = document.createElement("div");
  title.textContent = `Notes for ${domain}`;
  title.style.fontWeight = "700";
  title.style.marginBottom = "12px";
  title.style.fontSize = "14px";
  cont.appendChild(title);

  notes.forEach((noteText, index) => {
    const noteBox = document.createElement("div");
    noteBox.style.display = "flex";
    noteBox.style.justifyContent = "space-between";
    noteBox.style.alignItems = "center";
    noteBox.style.marginBottom = "10px";
    noteBox.style.padding = "8px 12px";
    noteBox.style.background = "rgba(255,255,255,0.15)";
    noteBox.style.borderRadius = "6px";
    noteBox.style.wordBreak = "break-word";

    const noteContent = document.createElement("span");
    noteContent.textContent = noteText;
    noteContent.style.fontSize = "13px";
    noteContent.style.color = "#fff";
    noteContent.style.flex = "1 1 auto";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "×";
    deleteBtn.style.marginLeft = "12px";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "#fff";
    deleteBtn.style.fontSize = "18px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.flex = "0 0 auto";
    deleteBtn.style.width = "22px";
    deleteBtn.style.height = "22px";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.title = "Delete note";

    deleteBtn.addEventListener("mouseover", () => {
      deleteBtn.style.color = "red";  // subtle red on hover
    });
    deleteBtn.addEventListener("mouseout", () => {
      deleteBtn.style.color = "#fff";
    });

    deleteBtn.addEventListener("click", () => {
      const newNotes = [...notes];
      newNotes.splice(index, 1);
      savedCustomNotes[domain] = newNotes;
      chrome.storage.local.set({ customNotes: savedCustomNotes }, () => {
        if (newNotes.length > 0) {
          renderNotes(newNotes, savedCustomNotes);
        } else {
          cont.remove();
          container = null;
        }
      });
    });

    noteBox.appendChild(noteContent);
    noteBox.appendChild(deleteBtn);
    cont.appendChild(noteBox);
  });
}

