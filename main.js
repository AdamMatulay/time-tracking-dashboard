const toggleButtons = document.querySelectorAll(".toggle-button");
const dailyButton = document.querySelector(".toggle-button.daily");
const weeklyButton = document.querySelector(".toggle-button.weekly");
const monthlyButton = document.querySelector(".toggle-button.monthly");

// FETCH DATA

let data = [];

fetch("./data.json")
  .then((response) => {
    if (!response.ok) throw new Error("DATA.JSON FAILED!");

    return response.json();
  })
  .then((jsonData) => {
    data = jsonData;
    populateDOM(data);
  });

// MAP DATA

const previousText = document.querySelectorAll(".previous-text");

const elementTimeMap = {
    "Work": document.querySelector(".time.work"),
    "Play": document.querySelector(".time.play"),
    "Study": document.querySelector(".time.study"),
    "Exercise": document.querySelector(".time.exercise"),
    "Social": document.querySelector(".time.social"),
    "Self Care": document.querySelector(".time.self-care"),
  };

  const elementPreviousTimeMap = {
    "Work": document.querySelector(".time-previous.work"),
    "Play": document.querySelector(".time-previous.play"),
    "Study": document.querySelector(".time-previous.study"),
    "Exercise": document.querySelector(".time-previous.exercise"),
    "Social": document.querySelector(".time-previous.social"),
    "Self Care": document.querySelector(".time-previous.self-care"),
  };

// POPULATE DOM

const populateDOM = (data) => {
  data.forEach(appendItem);
};

const appendItem = (item) => {
  if (dailyButton.classList.contains("active")) {
    elementTimeMap[item.title].textContent =
      item.timeframes.daily.current + "hrs";
    elementPreviousTimeMap[item.title].textContent =
      item.timeframes.daily.previous + "hrs";
    previousText.forEach((el) => {
      el.textContent = "Yesterday - ";
    });
  } else if (weeklyButton.classList.contains("active")) {
    elementTimeMap[item.title].textContent =
      item.timeframes.weekly.current + "hrs";
    elementPreviousTimeMap[item.title].textContent =
      item.timeframes.weekly.previous + "hrs";
    previousText.forEach((el) => {
      el.textContent = "Last Week - ";
    });
  } else if (monthlyButton.classList.contains("active")) {
    elementTimeMap[item.title].textContent =
      item.timeframes.monthly.current + "hrs";
    elementPreviousTimeMap[item.title].textContent =
      item.timeframes.monthly.previous + "hrs";
    previousText.forEach((el) => {
      el.textContent = "Last Month - ";
    });
  }
};

// NAVIGATION BUTTONS

function activeButton(clickedBtn) {
  toggleButtons.forEach((btn) => btn.classList.remove("active"));
  clickedBtn.classList.add("active");
}

dailyButton.addEventListener("click", () => {
  activeButton(dailyButton);
  populateDOM(data);
});

weeklyButton.addEventListener("click", () => {
  activeButton(weeklyButton);
  populateDOM(data);
});

monthlyButton.addEventListener("click", () => {
  activeButton(monthlyButton);
  populateDOM(data);
});