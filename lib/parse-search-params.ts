export interface SearchParams {
  search?: string
  level?: string
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): SearchParams {
  return {
    search: typeof params.search === 'string' ? params.search : undefined,
    level: Array.isArray(params.yr) ? params.yr[0] : params.yr
  }
}

export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value)
    }
  })
  return urlParams.toString()
}
