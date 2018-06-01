import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from '../../services/auth.service';
import {Angular2TokenService} from 'angular2-token';

import {MealPlanService} from '../../services/meal-plan.service'

import {appConfig} from '../../app.constants'

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})

export class MealplanComponent implements OnInit {

  meal_plans = [];
  showExtended: boolean = true;
  constants = appConfig;

  constructor(private mealPlanService: MealPlanService) {
    this.getMealPlans();
  }

  ngOnInit() { }

  getMealPlans() {
    this.mealPlanService.getUserMealPlans().subscribe( 
      data => { 
        this.meal_plans = data;
        this.convertToMealDays();
        this.sortMeals();
      });
  }

  /*
   * sort each day's meals by the meal type: in order, breakfast, lunch, dinner, snack
   */

  private sortMeals() {

    // iterate through each array element, sort meal_days by the meal type
    this.meal_plans.forEach( (meal_plan) => {
      // tslint:disable-next-line:forin
      for (const day in meal_plan.meal_days) {
        meal_plan.meal_days[day].sort( (a, b) => {

          const day1 = this.constants.mealPlanDays.indexOf( a.day.toLowerCase() );
          const day2 = this.constants.mealPlanDays.indexOf( b.day.toLowerCase() );

          const meal1 = this.constants.mealPlanMeals.indexOf( a.meal.toLowerCase() );
          const meal2 = this.constants.mealPlanMeals.indexOf( b.meal.toLowerCase() );

          // note that meal/day combination must be unique, per API
          // meal 1 is less than meal 2 if is on an earlier or equal day, and earlier or equal meal
          if ((day1 <= day2) && (meal1 < meal2)) {
            return -1;
          }
          // otherwise, meal 1 is greater than meal 2 if it's on a later day or is a later meal
          if ((day1 > day2) || (meal1 > meal2)) {
            return 1;
          }
          // this will never fire, if API is configured correctly
          return 0;

        });
      }
    });
  }

  /*
   * convert "meal_plan_recipes" to a more useful format: "meal_days", 
   * a series of day: { meal, recipe } key / value pairs
   */

  private convertToMealDays() {

    this.meal_plans.forEach( (meal_plan) => { 

      meal_plan.meal_days = {};

      // populate hash with days, initialize each value as an empty array
      this.constants.mealPlanDays.forEach( (day) => {
        meal_plan.meal_days[day] = new Array();
      });

      // for each recipe in the meal plan, add it to the appropriate day
      meal_plan.meal_plan_recipes.forEach( (recipe) => { 
        meal_plan.meal_days[ recipe.day ].push(recipe);
      });

      // destroy previously-used meal_plan_recipes array
      // as we've replaced it
      delete meal_plan.meal_plan_recipes;

    });

  }

}
