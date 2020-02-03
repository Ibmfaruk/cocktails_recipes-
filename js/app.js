//Instanciate the Classes

const ui = new UI();
const cocktail = new CocktailAPI();
const cocktailDB = new CocktailDB();


// create the event listeners

function eventListeners() {
    // Document ready
    document.addEventListener("DOMContentLoaded", documentReady)

    const searchForm = document.querySelector("#search-form");
    if(searchForm){
        searchForm.addEventListener("submit", getCocktails);
    }
   // the results Div listeners

   const resultsDiv = document.querySelector("#results");
   if(resultsDiv){
    resultsDiv.addEventListener("click", resultsDelegation);
   }
} 

eventListeners();

// functions

function getCocktails(e){
    e.preventDefault();
    const searchTerm = document.querySelector("#search").value;

    if(searchTerm === ""){
        ui.printMessage("Please add something into the form", "danger");
    } else {
        // server response from server
        let serverResponse;

        // Type of search (ingredients, cocktails, or name)

        const type = document.querySelector("#type").value;

        // Evaluate the type of method and then execute the query

        switch(type) {
            case "name":
                serverResponse = cocktail.getDrinksByName( searchTerm );
                break;
            case "ingredient":
                serverResponse = cocktail.getDrinksByIngredient( searchTerm );
                break;
            case "category":
                serverResponse = cocktail.getDrinksByCategory( searchTerm );
                break;
            case "alcohol":
                serverResponse = cocktail.getDrinksByAlcohol( searchTerm );
                break;

        }

            ui.clearResults();
        // query by the name of the drink 
            
        serverResponse.then(data =>{
                if(data.cocktails.drinks === null){
                    // print nada
                    ui.printMessage("There're no results. try a different term", "danger");
                } else{
                    if(type === "name") {
                        ui.displayDrinkdWithIngredients(data.cocktails.drinks);
                    } else {
                        ui.displayDrinks(data.cocktails.drinks);
                    }
                   
                }
            })
    }
   
}

// Delegation for the #results area
function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')) {
         cocktail.getSingleRecipe( e.target.dataset.id )
              .then(recipe => {
                   // Displays single recipe into a modal
                   ui.displaySingleRecipe( recipe.recipe.drinks[0] );
                  
              })
    } 
    // when favourite button is clicked

    if(e.target.classList.contains('favorite-btn')){
       if(e.target.classList.contains('is-favorite')){
           // remove the class
        e.target.classList.remove('is-favorite')
        e.target.textContent = "+";

        cocktailDB.removeFromDB(e.target.dataset.id);
       } else {
           // add the class
        e.target.classList.add('is-favorite')
        e.target.textContent = "-";

        // get info
        const cardBody = e.target.parentElement;

        const drinkInfo = {
            id: e.target.dataset.id,
            name: cardBody.querySelector(".card-title").textContent,
            image: cardBody.querySelector(".card-img-top").src
        }
            //console.log(drinkInfo);

        // save intodb
        cocktailDB.saveIntoDB(drinkInfo);
       }
         
    }
}

function documentReady() {
    // Display on Load
    ui.isFavorite();


    // select the search category 
    const searchCategory = document.querySelector(".search-category");
    if(searchCategory) {
        ui.displayCategories();
    }

    // when favorites page
    const favoritesTable = document.querySelector("#favorites");
    if(favoritesTable) {
        // Get the favorites from storage 
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks); 

        // when view or delete are clicked

        favoritesTable.addEventListener("click", (e) => {
            e.preventDefault();

            // delegation to get recipe
            if(e.target.classList.contains("get-recipe")) {
                cocktail.getSingleRecipe( e.target.dataset.id )
                        .then(recipe => {
                            // Displays single recipe into a modal
                        ui.displaySingleRecipe( recipe.recipe.drinks[0] );
                  
              })
            }
            // delegation to remove favorite
            if(e.target.classList.contains("remove-recipe")) {

                    ui.removeFavorite( e.target.parentElement.parentElement );


                    cocktailDB.removeFromDB(e.target.dataset.id);

            }

        })
    }

}