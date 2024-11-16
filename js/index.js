// ! Key takeways from working with JS: Always test using console.log() , write 5 lines of code , test , repeat.
// ! getElementById = Returns a reference to the first object with the specified value of the ID attribute.
// ! const : is a keyword used to declare a constant variable. This means that once you assign a value to a const variable, you cannot reassign it to a different value.
// ! let :  is a keyword used to declare variables with block scope. This means that the variable is only accessible within the block of code where it is defined, such as a function, loop, or if statement.
// ! innerHTML in JavaScript is a property of HTML elements that allows you to get or set the HTML content within that element.

// Import usedCars data from usedCars.js
import usedCars from "./usedCars.js";

// Ensure usedCars data is imported correctly
console.log(usedCars);

// Logic to filter starts here:

// Elements for filtering
const filterForm = document.getElementById("filterForm");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const modelYearInput = document.getElementById("yearFilter");
const manufacturerInput = document.getElementById("manufacturerFilter");
const colorInput = document.getElementById("colorFilter");
const maxMileageInput = document.getElementById("maxMileage");

// Buttons for filtering and resetting
document.getElementById("filterBtn").addEventListener("click", filter);
document.getElementById("resetBtn").addEventListener("click", reset);

// Function to reset the filters
function reset() {
  minPriceInput.value = "0";
  maxPriceInput.value = "1000000";
  modelYearInput.value = "allYears";
  manufacturerInput.value = "allManufacturers";
  colorInput.value = "allColors";
  maxMileageInput.value = "1000000"; // Default high mileage
  displayCars(); // Reset display
}

// Function to filter cars based on user input
function filter() {
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);
  const modelYear = modelYearInput.value;
  const manufacturer = manufacturerInput.value;
  const color = colorInput.value;
  const maxMileage = parseInt(maxMileageInput.value);

  // Filter the usedCars array based on the criteria
  const filteredCars = usedCars.filter((car) => {
    const carPrice = car.price;
    const carYear = car.year.toString();
    const carManufacturer = car.make;
    const carColor = car.color;
    const carMileage = car.mileage;

    return (
      carPrice >= minPrice &&
      carPrice <= maxPrice &&
      carMileage <= maxMileage &&
      (manufacturer === "allManufacturers" ||
        carManufacturer === manufacturer) &&
      (color === "allColors" || carColor === color) &&
      (modelYear === "allYears" || carYear === modelYear)
    );
  });

  // Display the filtered cars
  displayCars(filteredCars);
}

// Logic to display usedCars starts here:

// Function to display cars
function displayCars(cars = usedCars) {
  const container = document.getElementById("car-container");
  container.innerHTML = ""; // Clear the container

  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.setAttribute("carPrice", car.price);
    carCard.setAttribute("carManufacturer", car.make);
    carCard.setAttribute("carColor", car.color);
    carCard.setAttribute("carYear", car.year);
    carCard.setAttribute("carMileage", car.mileage);

    carCard.innerHTML = `
      <img src="${car.Image}" alt="${car.year} ${car.make} ${car.model}" class="car-img">
      <div class="car-info">
        <h3>${car.year} ${car.make} ${car.model}</h3>
        <p>Mileage: ${car.mileage} miles</p>
        <p>Price: $${car.price}</p>
        <p>Color: ${car.color}</p>
        <p>Gas Mileage: ${car.gasMileage}</p>
      </div>
    `;
    container.appendChild(carCard);
  });
}

// Initial display of all cars
window.addEventListener("DOMContentLoaded", () => displayCars());
