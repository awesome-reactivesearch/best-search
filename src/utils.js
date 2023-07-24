export const isSameOrigin = (url) => {
  try {
    const siteHost = new URL(window.location.href).hostname;
    const urlHost = new URL(url).hostname;
    if (siteHost === "docs.reactivesearch.io") return siteHost === urlHost;
  } catch {
    return false;
  }
};

export function resolveAbsoluteURL(source) {
  if (source.source === "docs") {
    return `https://docs.reactivesearch.io${source.url}`;
  }
  return source.url;
}

export function removeHashFromURL(url) {
  if (url) {
    return url.replace(/#.*$/, "");
  }
}

export function filterDuplicatesByTitle(array) {
  const uniqueValues = {};
  return array.filter((item) => {
    if (!uniqueValues[removeHashFromURL(item._source.url)]) {
      uniqueValues[removeHashFromURL(item._source.url)] = true;
      return true;
    }
    return false;
  });
}
