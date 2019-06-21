export const CORS = 'https://cors-anywhere.herokuapp.com/';

export const getUniqes = arr => {
  const newArr = [];
  arr.forEach(el => {
    if (!newArr.includes(el)) newArr.push(el);
  })
  return newArr
}

export const formatDate = date => {
  if (date === '') {
    const dateObj = new Date();
    return `${dateObj.getFullYear()}-${dateObj.getMonth() +1}-${dateObj.getDate()}`;
  } else {
    const dateParts = date.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }
}