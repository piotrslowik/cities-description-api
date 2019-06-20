export const CORS = 'https://cors-anywhere.herokuapp.com/';

export const getUniqes = arr => {
  const newArr = [];
  arr.forEach(el => {
    if (!newArr.includes(el)) newArr.push(el);
  })
  return newArr
}