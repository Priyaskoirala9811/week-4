// js/storage.js
// Handles saving and loading journal entries using LocalStorage

function saveEntry() {
  const entryBox = document.getElementById("journalEntry");
  const text = entryBox.value.trim();
  if (!text) {
    showSaveStatus("Please write something before saving.");
    return;
  }

  // get existing entries or empty array
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(text);

  // save back to LocalStorage
  localStorage.setItem("entries", JSON.stringify(entries));

  // clear textarea
  entryBox.value = "";

  // update list in DOM
  displayEntries();

  // message
  showSaveStatus("Entry saved!");

  // trigger browser notification if available
  if (typeof notifyUser === "function") {
    notifyUser();
  }
}

function displayEntries() {
  const list = document.getElementById("entriesList");
  if (!list) return; // not on this page

  list.innerHTML = "";

  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    list.appendChild(li);
  });
}

function showSaveStatus(msg) {
  const el = document.getElementById("saveStatus");
  if (!el) return;
  el.textContent = msg;
}

// run when page loads
window.addEventListener("load", displayEntries);
