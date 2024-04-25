export interface CurrentStorage {
    set: (info: any, ignore: false) => any;
    setLocalStorage: (info: any) => any;
    get: () => any;
    getLocal: () => any;
    clear?: () => any;
}
