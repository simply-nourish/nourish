// https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import {Angular2TokenService} from 'angular2-token';
import {AuthService} from './auth.service';
import { Recipe } from '../models/Recipe';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IngredientRecipe } from '../models/IngredientRecipe';

@Injectable()
export class RecipeService {

  private userID: number;
  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService) {
    this.userID = this.authTokenService.currentUserData.id;
    this.jsonConvert = new JsonConvert();
  }

  /*
   * GET /users/:id/recipes
   */

  public getUserRecipes(userID: number = this.userID): Observable<Recipe[]> {
    return this.authTokenService.get('users/' + userID + '/recipes').map(
      res => {
          return this.jsonConvert.deserialize(res.json(), Recipe);
        }).catch(this.handleError);
  }

 /*
  * GET /recipes/:id
  */

  public getUserRecipeById(recipeID: number) {

    return this.authTokenService.get('recipes/' + recipeID)
    .map(
      res => {
        let recipe: Recipe;
        recipe = this.jsonConvert.deserialize(res.json(), Recipe);
        return recipe;
      }).catch(this.handleError);

  }

  /*
   * GET /recipes --> gets all recipes
   */

  public getAllRecipes(): Observable<Recipe[]> {

    return this.authTokenService.get('recipes').map(
      res => {
        return this.jsonConvert.deserialize(res.json(), Recipe);
      }).catch(this.handleError);

  }

 /*
  * POST /users/:id/recipes
  */

  public createRecipe(recipe: Recipe): Observable<Recipe> {

    const recipe_request = this.mapModelToRequest(recipe);

    console.log(recipe_request);
    return this.authTokenService.post('users/' + this.userID + '/recipes', recipe_request)
    .map( res => {
        console.log(res.json());
        return this.jsonConvert.deserialize(res.json(), Recipe);
      }).catch(this.handleError);

  }

  /*
   * update recipe based on new parameters
   */

  private updateRecipe(recipe_id: number, recipe_request: any) {

    return this.authTokenService.put('recipes/' + recipe_id, recipe_request).map(
      res => {
        console.log(res);
        if ( res && res.status < 300 ) {
          console.log('returned from update list item');
          return { status: res.status, json: res };
        }
      }).catch(this.handleError);

  }

  /*
   * add an ingredient to the recipe
   */

  public addIngredientToRecipe(recipe_id: number, ing_rec: IngredientRecipe) {

    // manually construct request for our API
    const recipe = {
      recipe: {
        ingredient_recipes_attributes: {
          ingredient_id: ing_rec.ingredient.id ,
          amount: ing_rec.amount,
          measure_id: ing_rec.measure.id
        }
      }
    };

    return this.updateRecipe(recipe_id, recipe);

  }

  /*
   * remove an ingredient from the recipe
   */

  public removeIngredientFromRecipe(recipe_id: number, ing_rec: IngredientRecipe) {

    // manually construct request for our API
    const recipe = {
      recipe: {
        ingredient_recipes_attributes: {
          id: ing_rec.id,
          _destroy: true
        }
      }
    };

    return this.updateRecipe(recipe_id, recipe);

  }

 /*
  * DELETE /recipes/:id
  */

  public deleteRecipe(recipeID: number): Observable<null> {

    return this.authTokenService.delete('recipes/' + recipeID)
    .map(res => {
      if (res && res.status < 300) {
        console.log(res.json());
        return { status: res.status, json: res };
      }
    }).catch(this.handleError);

  }

  /*
   * handle error
   */

  private handleError (error: Response | any) {
    console.error('RecipeService::handleError', error);
    return Observable.throw(error);
  }

  /*
   * maps a Recipe model to its request equivalent
   */

  private mapModelToRequest(recipe: Recipe): Object {

    const request = {
      recipe: {
        title: recipe.title,
        summary: recipe.summary,
        instructions: recipe.instructions,
        servings: recipe.servings,
        ingredient_recipes_attributes: [],
        dietary_restriction_recipes_attributes: []
      }
    };

    recipe.ingredient_recipes_attributes.forEach( data => {
      request.recipe.ingredient_recipes_attributes.push({ ingredient_id: data.ingredient.id,
                                                          measure_id: data.measure.id,
                                                          amount: data.amount });
    });

    recipe.dietary_restriction_recipes_attributes.forEach( data => {
      console.log(data);
      request.recipe.dietary_restriction_recipes_attributes.push({dietary_restriction_id: data.id} );
    });

    console.log(request);
    return request;

  }
}
