import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './auth.service';
import { MealPlan } from '../models/MealPlan';

import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MealPlanService {

  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService) { 
    this.jsonConvert = new JsonConvert();
    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
 //   this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
  }

  // GET /users/:id/meal_plans
  public getUserMealPlans(userID: number = this.authTokenService.currentUserData.id): Observable<MealPlan[]> {
    return this.authTokenService.get('/users/' + userID + '/meal_plans')
    .map( res => {
      console.log(res.json());
      return this.jsonConvert.deserialize(res.json(), MealPlan);
    }).catch(this.handleError);
  }

  // GET /users/:user_id/meal_plans/:id
  public getUserMealPlanById(mealPlanID: number) {
    return this.authTokenService.get('/users/' + 
                                      this.authTokenService.currentUserData.id + 
                                      '/meal_plans/' + 
                                      mealPlanID)
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), MealPlan);;
    }).catch(this.handleError);
  }

  /*
    // GET /recipes --> gets all recipes
    public getAllRecipes(): Observable<Recipe[]> {
      return this.authTokenService.get('/recipes').map(
        res => {
          return this.jsonConvert.deserialize(res.json(), Recipe);
        }
      ).catch(this.handleError);
    }
  
    // POST /users/:id/recipes
    public createRecipe(recipe: Recipe): Observable<Recipe> {
      return this.authTokenService.post('/users/' + this.userID + '/recipes', recipe)
      .map(
        res => {
          let recipe: Recipe;
          recipe = this.jsonConvert.deserialize(res.json(), Recipe);
          return recipe;
        }
      ).catch(this.handleError);
    }
  
    // PUT /users/:user_id/recipes/:id
    // id is not yet an attribute of recipe model
    // public updateRecipe(recipe: Recipe): Observable<Recipe> {
    //   return this.authTokenService.put('/users/' + this.userID + '/recipes/' + recipe.id, recipe).map(
    //     res => {
    //       return new Recipe(res.json());
    //     }
    //   ).catch(this.handleError);
    // }
  
    // DELETE /recipes/:id 
    public deleteRecipe(recipeID: number): Observable<null> {
      return this.authTokenService.delete('/recipes/' + recipeID)
      .map(res => null)
      .catch(this.handleError);
    }
*/  

  private handleError (error: Response | any) {
    console.error('RecipeService::handleError', error);
    return Observable.throw(error);
  }

}


