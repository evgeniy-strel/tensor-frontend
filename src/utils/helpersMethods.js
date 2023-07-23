// метод для получения первой цифры GUID.
// с помощью него для аватарки закрепляется свой градиент навсегда
export const getFirstDigitGuid = (guid) => {
  return guid.split("").find((s) => !isNaN(s));
};

export const getFullUrlImg = (img) => {
  return `${process.env.REACT_APP_URL_API}/${img}`;
};
