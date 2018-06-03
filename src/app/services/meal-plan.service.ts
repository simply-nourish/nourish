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
import { MealPlanRecipe } from '../models/MealPlanRecipe';

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

  // POST /users/:id/meal_plans
  public createMealPlan(meal_plan: MealPlan): Observable<MealPlan> {
    return this.authTokenService.post('/users/' +
                                      this.authTokenService.currentUserData.id +
                                      '/meal_plans/',
                                      meal_plan)
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), MealPlan);
    }).catch(this.handleError);
  }


  // PUT /recipes/:id
  // id is not yet an attribute of recipe model
  public updateMealPlan(meal_plan: MealPlan): Observable<MealPlan> {
   return this.authTokenService.put('/users/' +
                                    this.authTokenService.currentUserData.id +
                                    '/meal_plans/'
                                    + meal_plan.id,
                                    meal_plan)
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), MealPlan);
    }).catch(this.handleError);
  }

/*
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


