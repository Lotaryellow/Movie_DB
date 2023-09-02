export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  let lastTimeHours = "";
  let lastTimeMinutes = "";

  switch (hours) {
    case 0:
      lastTimeHours = "";
      break;
    case 1:
      lastTimeHours = `${hours} час `;
      break;
    case 2:
    case 3:
    case 4:
      lastTimeHours = `${hours} часа `;
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      lastTimeHours = `${hours} часов`;
      break;
  }

  if (
    minutes === 1 ||
    minutes === 21 ||
    minutes === 32 ||
    minutes === 41 ||
    minutes === 51
  ) {
    lastTimeMinutes = `${minutes} минута `;
  }
  if (
    minutes === 2 ||
    minutes === 3 ||
    minutes === 4 ||
    minutes === 22 ||
    minutes === 23 ||
    minutes === 24 ||
    minutes === 32 ||
    minutes === 33 ||
    minutes === 34 ||
    minutes === 42 ||
    minutes === 43 ||
    minutes === 44 ||
    minutes === 52 ||
    minutes === 53 ||
    minutes === 54
  ) {
    lastTimeMinutes = `${minutes} минуты `;
  } else lastTimeMinutes = `${minutes} минут `;
  return lastTimeHours + lastTimeMinutes;
}
