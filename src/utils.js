export const isSameOrigin = (url) => {
  try {
    const siteHost = new URL("https://docs.reactivesearch.io/").hostname;
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

export function filterDuplicatesByTitle(array) {
  const uniqueValues = {};
  return array.filter((item) => {
    if (!uniqueValues[item._source.title]) {
      uniqueValues[item._source.title] = true;
      return true;
    }
    return false;
  });
}
