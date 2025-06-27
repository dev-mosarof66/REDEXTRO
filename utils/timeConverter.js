export default timeConverter = (time) => {

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
  const reminderTime = new Date(now.getTime() - reminder * 60 * 1000);
  return reminderTime;

}


export const calculateEndingTime = (startingTime, duration) => {

  const now = new Date(startingTime)
  const Duration = parseInt(duration?.hours * 60 + duration?.minutes)
  const endTime = new Date(now.getTime() + Duration * 60 * 1000);
  return endTime

}


export const planStatus = (startingTime, duration) => {
  const startTime = new Date(startingTime)
  const Duration = parseInt(duration?.hours * 60 + duration?.minutes)
  const endTime = new Date(startTime.getTime() + Duration * 60 * 1000);
  const currentTime = new Date()

  if (currentTime > endTime) {
    return "Completed"
  }
  else if (currentTime > startTime) {
    return "Ongoing"
  }
  else {
    return "Upcoming"
  }
}


export const progressStatus = (startingTime, duration) => {


  const startTime = new Date(startingTime)
  const Duration = parseInt(duration?.hours * 60 + duration?.minutes)
  const endTime = new Date(startTime.getTime() + Duration * 60 * 1000);
  const now = new Date()
  let progress
  if (now > startTime && now < endTime) {
    progress = (now.getTime() - startTime.getTime()) / (endTime.getTime() - startTime.getTime()) * 100
  } else {
    progress = 100
  }

  return parseInt(progress)


}