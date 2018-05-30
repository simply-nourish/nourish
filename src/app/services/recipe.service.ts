// https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

import {Angular2TokenService} from "angular2-token";
import {AuthService} from "./auth.service";
import { Recipe } from '../models/Recipe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RecipeService {
  private userID: number;

  constructor(private authTokenService: Angular2TokenService, private authService: AuthService) { 
    console.log('RecipeService constructed:');
    console.log(this.authService.getUser());
    console.log(this.authService.getUser().email);  
    this.userID = this.authService.getUser().id;
  }

  // GET /users/:id/recipes
  public getUserRecipes() {
    
  }

  // GET /users/:user_id/recipes/:id
  public getUserRecipeById(recipeID: number) {

  } 

  // GET /recipes --> gets all recipes
  public getAllRecipes(): Observable<Recipe[]> {
    return this.authTokenService.get('/recipes').map(
      res =>{
        const recipes = res.json();
        return recipes.map((recipe) => new Recipe(recipe));
    }).catch(this.handleError);
  }

  // POST /users/:id/recipes
  public createRecipe(recipe: Recipe) {

  }

  // PUT /users/:user_id/recipes/:id
  public updateRecipe(recipe: Recipe) {

  }

  // DELETE /recipes/:id 
  public deleteRecipe(recipeID: number) {
    return this.authTokenService.delete('/recipes/' + recipeID)
    .map(res => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('RecipeService::handleError', error);
    return Observable.throw(error);
  }
}


