export default function DateToString(date) {
  if (!date) date = now();

  // string interpolation is evaluating a string that contains placeholders
  // use a template literal inside backticks (``) and place the placeholders (variables) in ${}
  return `
    ${date.getFullYear()}/${prependZero(date.getMonth() + 1)}/${prependZero(
    date.getDate()
  )} ${prependZero(date.getHours())}:${prependZero(
    date.getMinutes()
  )}:${prependZero(date.getSeconds())}`;
}

// how to make this a public facing api
// the export before the function or
// export {DateToString} - export with the function inside it

function prependZero(num) {
  if (num >= 10) return `${num}`;

  return `0${num}`;
}
