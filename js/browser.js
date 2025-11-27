// js/browser.js
// Uses Browser APIs: Notifications + Clipboard

// Notify user when an entry is saved
function notifyUser() {
  if (!("Notification" in window)) {
    return; // browser doesn't support it
  }

  if (Notification.permission === "granted") {
    new Notification("Your journal entry was saved!");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Your journal entry was saved!");
      }
    });
  }
}

// Copy last entry to clipboard
function copyLastEntry() {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  if (entries.length === 0) {
    showSaveStatus("No entries to copy yet.");
    return;
  }

  const last = entries[entries.length - 1];
  navigator.clipboard.writeText(last)
    .then(() => {
      showSaveStatus("Last entry copied to clipboard.");
    })
    .catch(() => {
      showSaveStatus("Could not copy to clipboard.");
    });
}
