class LocalStorage {
  getPersist() {
    const persist = localStorage.getItem('persist');
    if (!persist) {
      return null;
    }
    return JSON.parse(persist);
  }
  setPersist(val: boolean) {
    localStorage.setItem('persist', JSON.stringify(val));
  }
}

const LocalStorageService = new LocalStorage();

export { LocalStorageService };
