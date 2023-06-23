import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";
import CalorieTracker from "./CalorieTracker";
import { Meal, Workout } from "./Item";
import "./css/bootstrap.css";
import "./css/style.css";

class App {
  constructor() {
    this._calorieTracker = new CalorieTracker();
    this._calorieTracker.loadItems();
    this._loadEventListeners();
  }

  _loadEventListeners() {
    // add eventlisteners
    document.getElementById("meal-form").addEventListener("submit", this._newItem.bind(this, "meal"));
    document.getElementById("workout-form").addEventListener("submit", this._newItem.bind(this, "workout"));
    document.getElementById("meal-items").addEventListener("click", this._removeItem.bind(this, "meal"));
    document.getElementById("workout-items").addEventListener("click", this._removeItem.bind(this, "workout"));
    document.getElementById("filter-meals").addEventListener("input", this._filterItems.bind(this, "meal"));
    document.getElementById("filter-workouts").addEventListener("input", this._filterItems.bind(this, "workout"));
    document.getElementById("reset").addEventListener("click", this._reset.bind(this));
    document.getElementById("limit-form").addEventListener("submit", this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // Validate inputs
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all the fields");
      return;
    }
    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value);
      this._calorieTracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._calorieTracker.addWorkout(workout);
    }
    name.value = "";
    calories.value = "";
    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, { toggle: true });
  }

  _removeItem(type, e) {
    if (e.target.classList.contains("delete") || e.target.classList.contains("fa-xmark")) {
      if (confirm("Do you want to delete the item?")) {
        const id = e.target.closest(".card").getAttribute("data-id");
        type === "meal" ? this._calorieTracker.removeMeal(id) : this._calorieTracker.removeWorkout(id);
        e.target.closest(".card").remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items>.card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _clearItems(type) {
    const lists = document.getElementById(`${type}-items`);
    while (lists.firstChild) {
      lists.firstChild.remove();
    }
    document.getElementById(`filter-${type}s`).value = "";
  }
  _reset() {
    this._clearItems("meal");
    this._clearItems("workout");
    this._calorieTracker.reset();
  }

  _setLimit(e) {
    e.preventDefault();
    const limitEl = document.getElementById("limit");

    if (limitEl.value === "") {
      alert("Please add value for Limit");
      return;
    }
    this._calorieTracker.setLimit(+limitEl.value);
    limitEl.value = "";

    const modalEl = document.getElementById("limit-modal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();
