export default timeConverter = (time) => {
  const date = new Date(time);
  const newTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return newTime;
};


export const StringtimeConverter = (timeStr) => {
  const [time, meridian] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
};


