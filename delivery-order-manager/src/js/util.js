function stampTime() {
  const stamp = new Date().getTime();
  return stamp;
}

function currentTime() {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  hour = updateTimeFormat(hour);
  min = updateTimeFormat(min);
  sec = updateTimeFormat(sec);
  const currentTime = `${hour} : ${min} : ${sec}`;
  return currentTime;
}

function updateTimeFormat(sec) {
  return sec < 10 ? '0' + sec : sec;
}

function getFullDate(date = new Date()) {
  const inputDate = new Date(date);
  const fullDate = inputDate.toLocaleDateString('sv-SE');

  return fullDate;
}

export { stampTime, currentTime, getFullDate };
