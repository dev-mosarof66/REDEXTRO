export default timeConverter = (time) => {
  console.log(time);

  const date = new Date(time);
  return date
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


export const formattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // ✅ pad with 0
  const day = String(today.getDate()).padStart(2, '0');        // ✅ pad with 0
  return `${year}-${month}-${day}`;
};


export const calculateReminderTime = (startingTime, reminder) => {

  const now = new Date(startingTime)
  console.log(now)
  const reminderTime = new Date(now.getTime() - reminder * 60 * 1000);
  console.log(reminderTime)
  return reminderTime;

}
