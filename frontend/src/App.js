import React, { useState, useEffect } from "react";
import "@tailwindcss/vite";

export default function App() {

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-4">MealMeter</h1>
      <p className="text-center mt-2 text-gray-600">
        Welcome to MealMeter! Your ultimate companion for tracking and managing your meals effortlessly.
      </p>
    </div>
  );
}

// Databáze jídel
const commonFoods = [
  { name: "Jablko", kcal: 52 },
  { name: "Banán", kcal: 96 },
  { name: "Kuřecí prsa (100g)", kcal: 165 },
  { name: "Celozrnný chléb (plátek)", kcal: 70 },
  { name: "Vejce (1ks)", kcal: 78 },
  { name: "Rýže vařená (100g)", kcal: 130 },
  { name: "Těstoviny vařené (100g)", kcal: 131 },
  { name: "Brambory vařené (100g)", kcal: 86 },
  { name: "Čokoláda hořká (1 kostička)", kcal: 55 },
  { name: "Pizza (1 plátek)", kcal: 285 },
  { name: "Mléko polotučné (200ml)", kcal: 92 },
  { name: "Jogurt bílý (150g)", kcal: 88 }
];

// Inicializace proměnných
let mealsByDate = {};
let currentOffset = 0;

// Načtení dat z localStorage
function loadData() {
  const savedData = localStorage.getItem('mealMeterData');
  if (savedData) {
    mealsByDate = JSON.parse(savedData);
  }
}

// Uložení dat do localStorage
function saveData() {
  localStorage.setItem('mealMeterData', JSON.stringify(mealsByDate));
}

// Reference na elementy
const dashboardScreen = document.getElementById("dashboardScreen");
const addFoodScreen = document.getElementById("addFoodScreen");
const currentDateEl = document.getElementById("currentDate");
const calorieCountEl = document.getElementById("calorieCount");
const foodListEl = document.getElementById("foodList");
const nextBtn = document.getElementById("nextDay");
const prevBtn = document.getElementById("prevDay");
const addFoodBtn = document.getElementById("addFoodBtn");
const backBtn = document.getElementById("backBtn");
const foodSearchInput = document.getElementById("foodSearch");
const searchResultsEl = document.getElementById("searchResults");
const customFoodNameInput = document.getElementById("customFoodName");
const customFoodKcalInput = document.getElementById("customFoodKcal");
const saveFoodBtn = document.getElementById("saveFoodBtn");
const commonFoodsList = document.getElementById("commonFoodsList");

// Pomocné funkce
function getDateString(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('cs-CZ', options);
}

// Aktualizace dashboardu
function updateDashboard() {
  const isToday = currentOffset === 0;
  const dateKey = getDateString(currentOffset);
  
  if (isToday) {
    currentDateEl.textContent = "Dnes";
  } else if (currentOffset === -1) {
    currentDateEl.textContent = "Včera";
  } else if (currentOffset === 1) {
    currentDateEl.textContent = "Zítra";
  } else {
    currentDateEl.textContent = formatDate(dateKey);
  }
  
  nextBtn.disabled = isToday;
  
  const meals = mealsByDate[dateKey] || [];
  const totalKcal = Math.round(meals.reduce((sum, meal) => sum + meal.kcal, 0));
  calorieCountEl.textContent = `${totalKcal.toString().padStart(4, '0')} kcal`;
  
  foodListEl.innerHTML = "";
  if (meals.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Žádná jídla pro tento den";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.color = "#999";
    foodListEl.appendChild(emptyMessage);
  } else {
    meals.forEach((meal, index) => {
      const li = document.createElement("li");
      
      const nameSpan = document.createElement("span");
      nameSpan.textContent = meal.name;
      nameSpan.className = "food-name";
      li.appendChild(nameSpan);
      
      const kcalSpan = document.createElement("span");
      kcalSpan.textContent = `${meal.kcal} kcal`;
      kcalSpan.className = "food-kcal";
      li.appendChild(kcalSpan);
      
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "×";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        deleteMeal(dateKey, index);
      });
      li.appendChild(deleteBtn);
      
      foodListEl.appendChild(li);
    });
  }
}

// Přidání jídla
function addMeal(name, kcal) {
  const dateKey = getDateString(currentOffset);
  if (!mealsByDate[dateKey]) {
    mealsByDate[dateKey] = [];
  }
  
  mealsByDate[dateKey].push({
    name: name,
    kcal: parseFloat(kcal)
  });
  
  saveData();
  updateDashboard();
}

// Odstranění jídla
function deleteMeal(dateKey, index) {
  if (mealsByDate[dateKey] && mealsByDate[dateKey][index]) {
    mealsByDate[dateKey].splice(index, 1);
    
    if (mealsByDate[dateKey].length === 0) {
      delete mealsByDate[dateKey];
    }
    
    saveData();
    updateDashboard();
  }
}

// Vyhledávání jídel
function searchFood(query) {
  query = query.toLowerCase();
  return commonFoods.filter(food => 
    food.name.toLowerCase().includes(query)
  );
}

// Zobrazení výsledků vyhledávání
function displaySearchResults(results) {
  searchResultsEl.innerHTML = "";
  
  if (results.length === 0) {
    searchResultsEl.innerHTML = "<div class='food-item'>Žádné výsledky nenalezeny</div>";
    return;
  }
  
  results.forEach(food => {
    const foodItem = document.createElement("div");
    foodItem.className = "food-item";
    foodItem.innerHTML = `
      <div class="food-item-title">${food.name}</div>
      <div class="food-item-kcal">${food.kcal} kcal</div>
    `;
    
    foodItem.addEventListener("click", () => {
      customFoodNameInput.value = food.name;
      customFoodKcalInput.value = food.kcal;
    });
    
    searchResultsEl.appendChild(foodItem);
  });
}

// Naplnění seznamu častých jídel
function populateCommonFoods() {
  commonFoodsList.innerHTML = "";
  
  commonFoods.slice(0, 6).forEach(food => {
    const button = document.createElement("button");
    button.className = "common-food-btn";
    button.textContent = food.name;
    
    button.addEventListener("click", () => {
      customFoodNameInput.value = food.name;
      customFoodKcalInput.value = food.kcal;
    });
    
    commonFoodsList.appendChild(button);
  });
}

// Přepínání obrazovek
function showAddFoodScreen() {
  dashboardScreen.style.display = "none";
  addFoodScreen.style.display = "block";
  customFoodNameInput.value = "";
  customFoodKcalInput.value = "";
  foodSearchInput.value = "";
  searchResultsEl.innerHTML = "";
  foodSearchInput.focus();
}

function showDashboardScreen() {
  dashboardScreen.style.display = "block";
  addFoodScreen.style.display = "none";
}

// Event Listenery
prevBtn.addEventListener("click", () => {
  currentOffset -= 1;
  updateDashboard();
});

nextBtn.addEventListener("click", () => {
  if (currentOffset < 0) {
    currentOffset += 1;
    updateDashboard();
  }
});

addFoodBtn.addEventListener("click", showAddFoodScreen);
backBtn.addEventListener("click", showDashboardScreen);

foodSearchInput.addEventListener("input", () => {
  const query = foodSearchInput.value.trim();
  if (query.length > 1) {
    const results = searchFood(query);
    displaySearchResults(results);
  } else {
    searchResultsEl.innerHTML = "";
  }
});

saveFoodBtn.addEventListener("click", () => {
  const name = customFoodNameInput.value.trim();
  const kcal = parseFloat(customFoodKcalInput.value);
  
  if (name && !isNaN(kcal) && kcal > 0) {
    addMeal(name, kcal);
    showDashboardScreen();
  } else {
    alert("Prosím vyplňte název a platnou hodnotu kalorií.");
  }
});

// Inicializace
function init() {
  loadData();
  updateDashboard();
  populateCommonFoods();
  showDashboardScreen();
}

// Spuštění aplikace
document.addEventListener("DOMContentLoaded", init);