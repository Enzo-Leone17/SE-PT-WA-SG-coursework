const { DateTime } = require("luxon");
const { diff } = require("util");

const compareBirthDateToCurrentDate = (birthDate) => {
  const today = DateTime.local();
  let birthDateCurrentYear = DateTime.fromISO(birthDate).set({
    year: today.year,
  });
  let dateDifference = today.diff(
    DateTime.fromISO(birthDateCurrentYear),
    "day"
  );
  let daysDiff = dateDifference.days;
  if (
    birthDateCurrentYear.month == today.month &&
    birthDateCurrentYear.day == today.day
  ) {
    return "Happy Birthday!";
  } else if (daysDiff > 0) {
    birthDateCurrentYear = DateTime.fromISO(birthDate).set({
      year: today.year + 1,
    });
    dateDifference = today.diff(DateTime.fromISO(birthDateCurrentYear), "day");
    return (
      parseInt(Math.abs(dateDifference.days)) + " days till your next birthday"
    );
  }
  return parseInt(Math.abs(dateDifference.days)) + " days till your birthday";
};

console.log(compareBirthDateToCurrentDate("2025-10-17"));

const compareCurrentDateToBirthdateYearMonthDay = (birthDate) => {
  const today = DateTime.local();
  birthDate = DateTime.fromISO(birthDate);
  let difference = today.diff(birthDate, ["years","months", "days"]);
  return `${difference.years} years, ${difference.months} months and ${parseInt(Math.abs(difference.days))} days`;
};

console.log(compareCurrentDateToBirthdateYearMonthDay("1995-07-05"));

const getClosestDate = (date1, date2) => {
  const today = DateTime.local();
  let date1CurrentYear = DateTime.fromISO(date1).set({
    year: today.year,
  });
  let date2CurrentYear = DateTime.fromISO(date2).set({
    year: today.year,
  });
  let date1Difference = today.diff(DateTime.fromISO(date1CurrentYear), "day");
  let date2Difference = today.diff(DateTime.fromISO(date2CurrentYear), "day");
  if (Math.abs(date1Difference.days) < Math.abs(date2Difference.days)) {
    return date1;
  } else {
    return date2;
  }
};

console.log(getClosestDate("2025-10-17", "1995-07-05"));

const sortDateAppearances = (date1, date2) => {
  const today = DateTime.local();
  let date1CurrentYear = DateTime.fromISO(date1).set({
    year: today.year,
  });
  let date2CurrentYear = DateTime.fromISO(date2).set({
    year: today.year,
  });
  let difference = date1CurrentYear.diff(DateTime.fromISO(date2CurrentYear), "day");
  if (difference.days < 0) { //date 1 before date 2
    return date1 + ", " + date2;
  }
  else if (difference.days == 0)
  {
    return "Both dates are the same";
  }
  else { //date 2 before date 1
    return date2 + ", " + date1;
  }
};

console.log(sortDateAppearances("2025-10-17", "1995-10-18"));

const getCurrentTimeByLocation = (location) => {
  const today = DateTime.local().setZone(location);
  return today.toLocaleString(DateTime.DATETIME_FULL);
}

console.log(getCurrentTimeByLocation("Europe/London"));