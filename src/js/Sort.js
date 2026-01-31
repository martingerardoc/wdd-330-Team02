function sortByURLParameter(event) {
  // Get the existing parameters
  const urlParams = new URLSearchParams(window.location.search);
  // Add the new parameter
  urlParams.set('sortBy', event.target.value);
  // Existing path plus updated search parameters
  const newURL = window.location.pathname + '?' + urlParams.toString();
  // Go to new URL
  window.location.href = newURL;
}

document.getElementById('sortBy').addEventListener('change', sortByURLParameter);
