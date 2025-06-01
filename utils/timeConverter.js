export default timeConverter = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `0${hours}: 0${minutes} PM`;
};

// const time = 2025-06-01T03:00:00.000Z

const date = new Date();
console.log(typeof date);
console.log(date.getHours());
