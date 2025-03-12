export const generateRandomNumberString = (length = 10) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  };
  