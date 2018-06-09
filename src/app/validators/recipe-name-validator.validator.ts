import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Injectable } from '@angular/core';

  /*
   * custom shopping list validator - checks 'add shopping list' field for duplicate names
   */

@Injectable()
export class RecipeNameValidator {

  constructor(public recipeService: RecipeService) {}

 /*
  * check user recipe name against known recipe names, and set 500ms debounce
  * to prevent slamming our poor API with requests.
  */

  ValidateRecipeName(control: AbstractControl) {

    if (control.value == null) { return new Promise( resolve => resolve(null) ); }

    console.log(this.recipeService);

    const promise = new Promise( resolve => {
      setTimeout(() => {
        this.recipeService.getUserRecipes().subscribe( data => {
          if ( data.filter( rec => rec.title.toLowerCase().trim() === control.value.toLowerCase().trim()).length > 0 ) {
            resolve( {'RecipeTaken': true} );
          } else {
            resolve();
          }
        });
      }, 500);
    });
    return promise;
  }

}
