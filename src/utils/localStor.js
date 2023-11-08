export const createLocalStorage = (objectName, arr) => {
  const object = {
    saveTime: new Date().toJSON().split("T")[0],
    data: arr,
  };
  return localStorage.setItem(objectName, JSON.stringify(object));
};

export const useLocalStorage = (object, arr) => {
  arr = JSON.parse(object).data;

  return arr;
};
