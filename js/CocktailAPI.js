 class CocktailAPI {

    async getDrinksByName(name) {
        // Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        // Returns a json respone
        const cocktails = await apiResponse.json();

        return {
             cocktails
        }
   }
  
   async getDrinksByIngredient(ingredient) {
          // Search by ingredient
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
          // Returns a json respone
          const cocktails = await apiResponse.json();

          return {
               cocktails
          }


   }

    // get single recipe 
    async getSingleRecipe(id) {
     // Search by Ingredient
     const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
     // Wait for response then return JSON
     const recipe = await apiResponse.json();

     return {
          recipe
     }
}

     // Retrievs 
     async getCategories() {
          // Search by Ingredient
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
          // Wait for response then return JSON
          const categories = await apiResponse.json();
     
          return {
               categories
          }

     }

     
     // get single recipe 
     async getDrinksByCategory(category) {
     // Search by Category
     const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
     // Wait for response then return JSON
     const cocktails = await apiResponse.json();

     return {
          cocktails
     }
      
}


          // get Alcohol or non-alcohol 
     async getDrinksByAlcohol(alcohol) {
     // Search by Category
     const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`);
     // Wait for response then return JSON
     const cocktails = await apiResponse.json();

     return {
          cocktails
     }
     }

}