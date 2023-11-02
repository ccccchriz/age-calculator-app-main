const isLeapYear = (year) =>
  year % 4 != 0 ? false : year % 100 != 0 ? true : year % 400 == 0;

const addToClassList = (elementArray, classArray) =>
  elementArray.forEach((a, i) =>
    a.classList.add(
      classArray[classArray.length - 1 < i ? classArray.length - 1 : i]
    )
  );

const removeFromClassList = (elementArray, classArray) =>
  elementArray.forEach((a, i) =>
    a.classList.remove(
      classArray[classArray.length - 1 < i ? classArray.length - 1 : i]
    )
  );

document.getElementById("page__form").addEventListener("submit", (event) => {
  event.preventDefault();

  const date = new Date();

  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const day = event.target[0].value;
  const month = event.target[1].value;
  const year = event.target[2].value;

  const dayText = document.getElementsByClassName("page__label--day")[0];
  const monthText = document.getElementsByClassName("page__label--month")[0];
  const yearText = document.getElementsByClassName("page__label--year")[0];

  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const dayInfo = document.getElementById("day__error");
  const monthInfo = document.getElementById("month__error");
  const yearInfo = document.getElementById("year__error");

  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let validDate = true;

  // Making sure user put in numbers

  if (day == "") {
    dayInfo.textContent = "This field is required";
    addToClassList([dayText, dayInput], ["error__text", "error__border"]);
  } else {
    dayInfo.textContent = "";
    removeFromClassList([dayText, dayInput], ["error__text", "error__border"]);
  }

  if (month == "") {
    monthInfo.textContent = "This field is required";
    addToClassList([monthText, monthInput], ["error__text", "error__border"]);
  } else {
    monthInfo.textContent = "";
    removeFromClassList(
      [monthText, monthInput],
      ["error__text", "error__border"]
    );
  }

  if (year == "") {
    yearInfo.textContent = "This field is required";
    addToClassList([yearText, yearInput], ["error__text", "error__border"]);
  } else {
    yearInfo.textContent = "";
    removeFromClassList(
      [yearText, yearInput],
      ["error__text", "error__border"]
    );
  }

  if (day == "" || month == "" || year == "")
    return console.log("Missing date");

  // --- Date Validation ---

  // Month Validation
  if (!(month >= 1 && month <= 12)) {
    validDate = false;
    monthInfo.textContent =
      month < 1 ? "Month has to be atleast 1" : "Month cant exceed 12";
    addToClassList([monthText, monthInput], ["error__text", "error__border"]);
  } else {
    removeFromClassList(
      [monthText, monthInput],
      ["error__text", "error__border"]
    );
  }

  // Year Validation
  if (year > currentYear || year < currentYear - 400) {
    validDate = false;
    yearInfo.textContent =
      year < currentYear - 400
        ? "Are you really this old?"
        : "Year can't be in the future";
    addToClassList([yearText, yearInput], ["error__text", "error__border"]);
  } else {
    removeFromClassList(
      [yearText, yearInput],
      ["error__text", "error__border"]
    );
  }

  // Stop if year or month are invalid

  if (!validDate) return console.log("Bad Date");

  validDate = true;

  // Day Validation

  if (day < 1 || day > daysInMonth[month - 1]) {
    validDate = false;
    dayInfo.textContent =
      day < 1
        ? "Day has to be atleast 1"
        : `Month ${month} has only ${daysInMonth[month - 1]} days`;
    addToClassList([dayText, dayInput], ["error__text", "error__border"]);
  } else {
    removeFromClassList([dayText, dayInput], ["error__text", "error__border"]);
  }

  if (!validDate) return console.log("Bad Date");

  let yearAge = currentYear - year;
  let monthAge = 0;
  let dayAge = 0;

  if (currentMonth >= month) {
    monthAge = currentMonth - month;
  } else {
    yearAge--;
    monthAge = 12 + currentMonth - month;
  }

  if (currentDay >= day) {
    dayAge = currentDay - day;
  } else {
    monthAge--;
    dayAge = 31 + currentDay - day;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  document.getElementsByClassName("page__time--days")[0].textContent = dayAge;
  document.getElementsByClassName("page__time--months")[0].textContent =
    monthAge;
  document.getElementsByClassName("page__time--years")[0].textContent = yearAge;
});
