// метод для получения первой цифры GUID.
// с помощью него для аватарки закрепляется свой градиент навсегда
export const getFirstDigitGuid = (guid) => {
  return guid.split("").find((s) => !isNaN(s));
};

export const getFullUrlImg = (img) => {
  return `${process.env.REACT_APP_URL_API}${img}`;
};

export const getCaseOfUchastnik = (countUsers) => {
  let word = "участник";

  if (
    (5 <= countUsers && countUsers <= 9) ||
    (11 <= countUsers && countUsers <= 20) ||
    countUsers == 0
  ) {
    word += "ов";
  } else if (2 <= countUsers && countUsers <= 4) {
    word += "а";
  }

  return word;
};
