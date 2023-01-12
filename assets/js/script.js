
// Spoonacular API key 86559794390c4f9c8a3c8bba07f2d054
// Need to include ?apiKey=86559794390c4f9c8a3c8bba07f2d054

const shoppingListUl = document.getElementById("shoppingListList");
const mealPlanUl = document.getElementById("mealPlanUl");
const pantryInput = document.getElementById("pantryInput");
const myPantryButton = document.getElementById("myPantryButton");
const recipeSearchButton = document.getElementById("recipeSearchButton");
const recipeBoxUl = document.getElementById("recipeBoxUl");
const myPantryUl = document.getElementById("myPantryUl");
let searchedRecipes = [];
let pantryArr = [];

// *****************************************

function makeEventListeners() {
    for (let i = 0; i < searchedRecipes.length; i++) {
        console.log("recipe ", i + 1, searchedRecipes[i])
        searchedRecipes[i].addEventListener("click", function (e) {
            getRecipeIngredients(e)
            // console.log(e.target)
        })

    }
}

function recipeSearch() {
    let searchInput = document.getElementById("recipeSearchInput").value;
    let requestUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=86559794390c4f9c8a3c8bba07f2d054&query=" + searchInput + "&number=5";
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                let recipeListEl = document.createElement('li');
                recipeListEl.setAttribute("draggable", true);
                recipeListEl.innerText = data.results[i].title;
                recipeBoxUl.appendChild(recipeListEl);
                recipeListEl.setAttribute("id", data.results[i].id);
                recipeListEl.setAttribute("class", "searchedRecipes")

                let recipeImg = document.createElement('img');
                recipeImg.src = data.results[i].image;
                recipeImg.style.width = "75%";
                recipeBoxUl.appendChild(recipeImg);
            }
            searchedRecipes = document.querySelectorAll(".searchedRecipes");
            console.log(searchedRecipes);
            makeEventListeners()
        })
}

recipeSearchButton.addEventListener("click", recipeSearch)

function getRecipeIngredients(e) {
    let chosenRecipe = e.target.id
    let mealName = document.createElement('li');
    mealName.innerText = e.target.innerText;
    // mealPlanUl.appendChild(mealName);
    let requestUrl = "https://api.spoonacular.com/recipes/" + chosenRecipe + "/information?apiKey=86559794390c4f9c8a3c8bba07f2d054";
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("I am recipe ingredients", data)
            let ingredientArray = [];
            for (let i = 0; i < data.extendedIngredients.length; i++) {
                let ingredientName = data.extendedIngredients[i].name;
                let ingredientItem = document.createElement("li");
                ingredientItem.setAttribute("class", "shoppingListItem");

                ingredientArray.push(ingredientName);
                ingredientItem.textContent = ingredientArray[i];
                shoppingListUl.appendChild(ingredientItem);
                let foodImg = document.createElement('img');
                let foodImgName = data.extendedIngredients[i].image;
                foodImg.src = "https://spoonacular.com/cdn/ingredients_100x100/" + foodImgName;
                ingredientItem.appendChild(foodImg);
                ingredientItem.addEventListener("click", function () {
                    myPantryUl.appendChild(ingredientItem);
                    ingredientItem.setAttribute("class", "pantryItem");
                    ingredientItem.removeAttribute("class", "shoppingListItem");
                })
            }
        })
    getShoppingListItems();
}

let pantryStorage = [];

function addPantryItem() {
    let newPantryItem = document.createElement('li');
    newPantryItem.setAttribute("class", "pantryItem");
    let newPantryItemText = pantryInput.value;
    newPantryItem.innerText = newPantryItemText;
    myPantryUl.appendChild(newPantryItem);
    pantryStorage.push(newPantryItemText);
    localStorage.setItem("pantry", JSON.stringify(pantryStorage));
}

myPantryButton.addEventListener("click", addPantryItem)
// addIngredientsButton.addEventListener("click", getRecipeIngredients);
// searchedRecipes.addEventListener("click", getRecipeIngredients)




// ******************************************************
// GENERAL LIST OF THINGS TO DO
// TODO clear the input field after entering item
// TODO get Local Storage for pantry items to display on load
// TODO Add values & units for 
// TODO create areas to increase units or delete items from pantry

/* TODO Need to get the amounts of each ingredient. In the API, the returned data has a "measures" value.
data.extendedIngredients.measures.us.amount for the number and data.extendedIngredients.measures.us.unitShort for
the value (i.e. cups, tbsp, etc.).*/

/* TODO  be able to show pictures of the ingredients when it is clicked on in the shopping list*/

/* TODO be able to grab items from one area and drag them to another area? */

/* TODO be able to click on a recipe in the recipe box and have it open up a modal that will display the ingredients
then it will allow you to either go back or select it and put it in your meal plan and shopping list*/

// TODO need to be able to access the recipe with instructions from the meal plan section


// ***************************************
// function getIngredients() {
//     let requestUrl = "https://api.spoonacular.com/recipes/716429/information?apiKey=86559794390c4f9c8a3c8bba07f2d054&includeNutrition=false"
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             let mealName = document.createElement('li');
//             mealName.innerText = data.title;
//             mealPlanUl.appendChild(mealName);
//             let ingredientArray = [];
//             for (let i = 0; i < data.extendedIngredients.length; i++) {
//                 // need to create arrays for the Pantry and the shopping list so that I can compare values in each array. After they are compared, they are then pushed to the Ul as items
//                 let ingredientName = data.extendedIngredients[i].name;
//                 ingredientArray.push(ingredientName);
//                 // appending the ingredient to the HTML
//                 let ingredientItem = document.createElement("li");
//                 ingredientItem.textContent = ingredientArray[i];
//                 shoppingListUl.appendChild(ingredientItem);

//                 // This should be changed to be on click on the ingredient item
//                 let foodImg = document.createElement('img');
//                 let foodImgName = data.extendedIngredients[i].image;
//                 foodImg.src = "https://spoonacular.com/cdn/ingredients_100x100/" + foodImgName;
//                 shoppingListUl.appendChild(foodImg);

//             }
//         })
// }

// shoppingListButton.addEventListener("click", getIngredients)

// ******************************************