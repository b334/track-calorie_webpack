import Storage from "./Storage";

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
  }

  // Public methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const removeItemIndex = this._meals.findIndex((meal) => meal.id === id);
    if (removeItemIndex !== -1) {
      const removeItemCalories = this._meals[removeItemIndex].calories;
      this._totalCalories -= removeItemCalories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.removeMeal(removeItemIndex);
      this._meals.splice(removeItemIndex, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const removeItemIndex = this._workouts.findIndex((meal) => meal.id === id);
    if (removeItemIndex !== -1) {
      const removeItemCalories = this._workouts[removeItemIndex].calories;
      this._totalCalories += removeItemCalories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.removeWorkout(removeItemIndex);
      this._workouts.splice(removeItemIndex, 1);
      this._render();
    }
  }

  reset() {
    this._meals = [];
    this._workouts = [];
    this._totalCalories = 0;
    Storage.clearAll();
    this._render();
  }

  setLimit(calorie_limit) {
    this._calorieLimit = calorie_limit;
    Storage.setCalorieLimit(calorie_limit);
    this._displayCaloriesLimit();
    this._render();
  }

  loadItems() {
    if (this._meals) {
      this._meals.forEach((meal) => this._displayNewMeal(meal));
    }
    if (this._workouts) {
      this._workouts.forEach((workout) => this._displayNewWorkout(workout));
    }
  }

  // Private methods
  _displayCaloriesTotal() {
    document.getElementById("calories-total").textContent = this._totalCalories;
  }

  _displayCaloriesLimit() {
    document.getElementById("calories-limit").textContent = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumed = this._meals.reduce((acc, meal) => acc + meal.calories, 0);
    document.getElementById("calories-consumed").textContent = caloriesConsumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurned = this._workouts.reduce((acc, workout) => acc + workout.calories, 0);
    document.getElementById("calories-burned").textContent = caloriesBurned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const progressEl = document.getElementById("calorie-progress");
    const caloriesRemaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.textContent = caloriesRemaining;
    if (caloriesRemaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove("bg-light");
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-danger");
      progressEl.classList.add("bg-danger");
      progressEl.classList.remove("bg-success");
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove("bg-danger");
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
      progressEl.classList.remove("bg-danger");
      progressEl.classList.add("bg-success");
    }
  }

  _displayCalorieProgress() {
    let progress = (this._totalCalories / this._calorieLimit) * 100;
    progress = Math.min(progress, 100);
    document.getElementById("calorie-progress").style.width = `${progress}%`;
  }

  _displayNewMeal(meal) {
    const mealItemsEl = document.getElementById("meal-items");
    const mealItemEl = document.createElement("div");
    mealItemEl.className = "card my-2";
    mealItemEl.setAttribute("data-id", meal.id);
    mealItemEl.innerHTML = `     
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">${meal.calories}</div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>      
    `;
    mealItemsEl.appendChild(mealItemEl);
  }

  _displayNewWorkout(workout) {
    const workoutItemsEl = document.getElementById("workout-items");
    const workoutItemEl = document.createElement("div");
    workoutItemEl.className = "card my-2";
    workoutItemEl.setAttribute("data-id", workout.id);

    workoutItemEl.innerHTML = `     
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">${workout.calories}</div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>      
    `;
    workoutItemsEl.appendChild(workoutItemEl);
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
  }
}

export default CalorieTracker;
