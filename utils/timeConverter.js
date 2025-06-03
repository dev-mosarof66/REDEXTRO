export default timeConverter = (time) => {
  const date = new Date(time);
  const newTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return newTime;
};
