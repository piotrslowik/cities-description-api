export const CORS = 'https://cors-anywhere.herokuapp.com/';

export const getUniqes = arr => {
  const newArr = [];
  arr.forEach(el => {
    if (!newArr.includes(el)) newArr.push(el);
  })
  return newArr
}

export const validateDate = date => {
  const dateObj = new Date();
  const dateParts = date.split('-');
  let isWFutureDate = false;

  if (dateObj.getFullYear() > dateParts[0]) {
    isWFutureDate = true;
  } else {
    if (dateObj.getMonth() > dateParts[1]) {
      isWFutureDate = true;
    } else {
      if (dateObj.getDate() <= dateParts[2]) {
        isWFutureDate = true;
      }
    }
  }

  if (isWFutureDate ) {
    const dateObj = new Date();
    return `${dateObj.getFullYear()}-${dateObj.getMonth() +1}-${dateObj.getDate()}`;
  } else {
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }
}