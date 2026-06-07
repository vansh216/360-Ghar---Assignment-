// Bonus feature — encode/decode search query in the URL so searches
// are shareable. Anyone opening the link auto-runs the same search.
//
// Example shareable URL:
// https://yourapp.com/?q=2BHK%20in%20Sector%2050%20under%2080%20lakhs%20near%20school

export const encodeQueryToUrl = (query) => {
  if (!query?.trim()) return;

  const url = new URL(window.location.href);
  url.searchParams.set("q", query.trim());

  // updates URL bar silently, no reload
  window.history.replaceState(null, "", url.toString());
};

// decode the url
export const decodeQueryFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("q") || "";
};

// Build full shareable URL string 
export const buildShareableUrl = (query) => {
  const url = new URL(window.location.href);
  url.searchParams.set("q", query.trim());
  return url.toString();
};

// Copy shareable URL to clipboard 
// Returns true if copy succeeded, otherwise false 
export const copyShareableUrl = async (query) => {
  const url = buildShareableUrl(query);

  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    // Fallback for browsers without clipboard API
    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    return true;
  }
};

// Clear query from URL 
// Called when user clears the search so URL stays clean
export const clearQueryFromUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("q");
  window.history.replaceState(null, "", url.toString());
};