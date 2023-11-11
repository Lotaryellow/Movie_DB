export const createLocalStorage = (
  objectName: string,
  arr: unknown[]
): void => {
  const object = {
    saveTime: new Date().toJSON().split("T")[0],
    data: arr,
  };
  return localStorage.setItem(objectName, JSON.stringify(object));
};

export function useLocalStorage(object: string, arr: unknown[]): unknown[] {
  arr = JSON.parse(object).data;

  return arr;
}
