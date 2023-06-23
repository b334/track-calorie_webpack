class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit")) {
      calorieLimit = +localStorage.getItem("calorieLimit");
    } else {
      calorieLimit = defaultLimit;
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalories(defaultTotal = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories")) {
      totalCalories = +localStorage.getItem("totalCalories");
    } else {
      totalCalories = defaultTotal;
    }
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem("totalCalories", calories);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem("meals")) {
      meals = JSON.parse(localStorage.getItem("meals"));
    } else {
      meals = [];
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static removeMeal(index) {
    const meals = Storage.getMeals();
    meals.splice(index, 1);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem("workouts")) {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    } else {
      workouts = [];
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeWorkout(index) {
    const workouts = Storage.getWorkouts();
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.clear();
  }
}

export default Storage;
