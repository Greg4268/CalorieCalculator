function calculateCalories() {
  // Select and parse form elements
  const data = {
    movementLevel: document.getElementById("movementLevel").value,
    gender: document.getElementById("gender").value,
    age: parseInt(document.getElementById("age").value, 10),
    heightFeet: parseInt(document.getElementById("heightFeet").value, 10),
    heightInches: parseInt(document.getElementById("heightInches").value, 10),
    weight: parseFloat(document.getElementById("weight").value),
    bodyFat: parseFloat(document.getElementById("bodyFat").value),
  };

  // Calculate TDEE based on gender
  let BMR;
  if (data.gender === "male") {
    BMR = calcBasalMale(data);
  } else {
    BMR = calcBasalFemale(data);
  }

  const TDEE = calcFinal(BMR, data.movementLevel);
  const weeklyCalories = TDEE * 7;
  console.log(`Total Daily Energy Expenditure (TDEE): ${TDEE} kcal`);
  console.log(`Total Weekly Energy Expenditure: ${weeklyCalories} kcal`);

  const losePound = calcLosePound(TDEE);
  const loseHalfPound = calcLoseHalfPound(TDEE);
  console.log(`To lose 1 pound per week: ${losePound} kcal`);
  console.log(`To lose .5 pound per week: ${loseHalfPound} kcal`);

  // Update results section with TDEE and weekly calories
  document.getElementById("dailyCalories").querySelector("span").textContent =
    TDEE.toFixed(2);
  document.getElementById("weeklyCalories").querySelector("span").textContent =
    weeklyCalories.toFixed(2);

  document.getElementById("pound").querySelector("span").textContent =
    losePound.toFixed(2);
  document.getElementById("half").querySelector("span").textContent =
    loseHalfPound.toFixed(2);
}

// Event listener for form submission
document
  .getElementById("caloriePredictorForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    calculateCalories(); // Gather data and process
  });

// Calculate BMR for Male
function calcBasalMale(data) {
  const weightKilo = data.weight * 0.453592;
  const heightCent = (data.heightFeet * 12 + data.heightInches) * 2.54;
  return 88.4 + 13.4 * weightKilo + 4.8 * heightCent - 5.68 * data.age;
}

// Calculate BMR for Female
function calcBasalFemale(data) {
  const weightKilo = data.weight * 0.453592;
  const heightCent = (data.heightFeet * 12 + data.heightInches) * 2.54;
  return 447.6 + 9.25 * weightKilo + 3.1 * heightCent - 4.33 * data.age;
}

// Calculate TDEE based on BMR and activity level
function calcFinal(BMR, activityLevel) {
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const activityFactor = activityFactors[activityLevel];
  if (!activityFactor) throw new Error("Invalid activity level");

  return BMR * activityFactor; // TDEE calculation
}

function calcLosePound(TDEE) {
  const dailyDeficit = 3500 / 7;
  return TDEE - dailyDeficit;
}

function calcLoseHalfPound(TDEE) {
  const dailyDeficit = 1750 / 7;
  return TDEE - dailyDeficit;
}
