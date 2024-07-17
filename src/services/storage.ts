const CACHE_KEY = "@looma-app";

export enum STORAGE_KEY {
  LOOMPAS_EXPIRATION = "loompasExpiration",
  LOOMPA_DETAIL_EXPIRATION = "loompaIdExpiration-",
}

const CacheService = {
  getName: (label: string) => {
    return `${CACHE_KEY}-${label}`;
  },
  setItem: (label: string, value: unknown) => {
    window.localStorage.setItem(
      CacheService.getName(label),
      typeof value === "string" ? value : JSON.stringify(value)
    );
  },
  getItem: (label: string): unknown => {
    const value = window.localStorage.getItem(CacheService.getName(label));

    if (value !== null) {
      return JSON.parse(value);
    }
  },
  clearItem: (label: string) => {
    window.localStorage.removeItem(CacheService.getName(label));
  },
  hasExpired: (label: string): boolean => {
    const currentTime = new Date().getTime();

    const cacheTime = CacheService.getItem(label);

    if (!cacheTime) {
      return true;
    }

    return currentTime > (cacheTime as number);
  },
};

export default CacheService;
