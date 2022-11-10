const urls_name = 'carousel-dataurls';
const selected_src_name = 'carousel-selected-src';

export function getCachedImgs() {
  const dataUrlsJson = sessionStorage.getItem(urls_name);
  if (!dataUrlsJson) {
    return [];
  }

  const dataUrls = JSON.parse(dataUrlsJson);
  return dataUrls;
}

export function addCachedImg(dataUrl) {
  const currentItems = getCachedImgs();
  const allItems = [...currentItems, dataUrl];
  const json = JSON.stringify(allItems);
  sessionStorage.setItem(urls_name, json);
}

export function getCachedSelectedSrc() {
  const selectedSrc = sessionStorage.getItem(selected_src_name);
  return selectedSrc ?? null;
}

export function setCachedSelectedImg(src) {
  sessionStorage.setItem(selected_src_name, src);
}
