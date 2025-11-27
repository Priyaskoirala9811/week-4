// js/storage.js
// this file handles saving and loading journal entries

document.addEventListener("DOMContentLoaded", () => {
  setupEntryCounter();
  displayEntries(); // show entries when the page loads
});

// save a new entry to LocalStorage
function saveEntry() {
  const entryInput = document.getElementById("journalEntry");
  const entryTagDropdown = document.getElementById("tagSelect");

  if (!entryInput) return;

  const entryText = entryInput.value.trim();
  if (entryText === "") {
    showSaveStatus("Please write something before saving.");
    return;
  }

  const chosenTag = entryTagDropdown ? entryTagDropdown.value : "Other";
  const currentDate = new Date().toLocaleDateString();

  // this object represents one journal entry
  const newJournalEntry = {
    text: entryText,
    tag: chosenTag,
    date: currentDate
  };

  const savedEntries = getEntriesFromStorage();
  savedEntries.push(newJournalEntry);
  localStorage.setItem("journalEntries", JSON.stringify(savedEntries));

  entryInput.value = "";
  updateWordCounter(0);
  showSaveStatus("Entry saved.");

  // refresh the list
  displayEntries();

  // also trigger notification if that function exists
  if (typeof notifyUser === "function") {
    notifyUser();
  }
}

// helper to read entries from LocalStorage
function getEntriesFromStorage() {
  return JSON.parse(localStorage.getItem("journalEntries")) || [];
}

// show entries in the <ul>
function displayEntries(filterTag = "all") {
  const listElement = document.getElementById("entriesList");
  if (!listElement) return;

  listElement.innerHTML = "";

  let savedEntries = getEntriesFromStorage();

  // if filter is not "all", then only keep matching ones
  if (filterTag !== "all") {
    savedEntries = savedEntries.filter(entry => entry.tag === filterTag);
  }

  savedEntries.forEach(journalEntry => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${journalEntry.tag}</strong> — ${journalEntry.date}<br>
      ${journalEntry.text}
    `;
    listElement.appendChild(listItem);
  });
}

// when user changes filter dropdown
function filterEntries() {
  const filterDropdown = document.getElementById("filterSelect");
  if (!filterDropdown) return;

  const selectedTag = filterDropdown.value;
  displayEntries(selectedTag);
}

// small status text under the buttons
function showSaveStatus(msg) {
  const statusText = document.getElementById("saveStatus");
  if (!statusText) return;

  statusText.textContent = msg;
}

// word counter for the textarea
function setupEntryCounter() {
  const entryInput = document.getElementById("journalEntry");
  if (!entryInput) return;

  entryInput.addEventListener("input", () => {
    const text = entryInput.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    updateWordCounter(wordCount);
  });
}

function updateWordCounter(count) {
  const counterElement = document.getElementById("entryCounter");
  if (!counterElement) return;

  counterElement.textContent = `${count} word${count === 1 ? "" : "s"}`;
}
