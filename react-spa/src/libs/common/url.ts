


export function urlStringToURL(url: string) {
  return new URL(url)
}

export function getQueryParamsFromURL(url: URL) {
  return url.searchParams
}
