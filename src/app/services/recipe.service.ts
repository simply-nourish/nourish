// https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../recipe.interface';
import {AuthService} from "./auth.service";

const API_URL = environment.token_auth_config.apiBase;


@Injectable()
export class RecipeService {

  constructor(private http: Http) { 
  
  }
  
  // GET /users/:id/recipes
  public getUserRecipes() {
    
  }

  // GET /users/:user_id/recipes/:id
  public getUserRecipeById(recipeID: number) {

  } 

  // GET /recipes --> gets all recipes
  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get(API_URL + '/recipes').map(
      res =>{
      return res.json();
    })
  }

  // POST /users/:id/recipes
  public createRecipe(recipe: Recipe) {

  }

  // PUT /users/:user_id/recipes/:id
  public updateRecipe(recipe: Recipe) {

  }

  // DELETE /recipes/:id 
  public deleteRecipe(recipeID: number) {

  }
}


