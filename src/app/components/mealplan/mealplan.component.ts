import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {AuthService} from '../../services/auth.service';
import {Angular2TokenService} from 'angular2-token';

import {MealPlanService} from '../../services/meal-plan.service';

import {appConfig} from '../../app.constants';
import {TitleCasePipe} from '../../pipes/title-case.pipe';

import {MealPlan} from '../../models/MealPlan';
import {MealPlanRecipe} from '../../models/MealPlanRecipe';

import {MealplanDialogComponent} from '../mealplan-dialog/mealplan-dialog.component';

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css'],
})

export class MealplanComponent implements OnInit {

  meal_plans: MealPlan [];
  selected_mp: MealPlan;
  showExtended: true;

  constants = appConfig;

  constructor(private mealPlanService: MealPlanService,
              public dialog: MatDialog) {
    this.getMealPlans();
  }

  ngOnInit() { }

  getMealPlans() {
    this.mealPlanService.getUserMealPlans().subscribe(
      data => {
        this.meal_plans = data;
        console.log(this.meal_plans);
        if (this.meal_plans) {
          this.selected_mp = this.meal_plans[0];
        }
      });
  }

  /*
   * display meals for a particular day
   */

  private findMealsForDay(meal_plan: MealPlan, day: string) {

    const day_meals = new Array<MealPlanRecipe>();
    meal_plan.meal_plan_recipes_attributes.forEach( (mpr) => {
      if (mpr.day === day) {
        day_meals.push(mpr);
      }
    });

    return day_meals.sort( (a, b) => {
      const meal1 = this.constants.mealPlanMeals.indexOf( a.meal.toLowerCase() );
      const meal2 = this.constants.mealPlanMeals.indexOf( b.meal.toLowerCase() );

      if ( meal1 < meal2 ) {
        return -1;
      } else if ( meal1 > meal2 ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /*
   * delete a meal from a meal plan
   */ 

  private deleteMeal(meal_plan: MealPlan, meal: MealPlanRecipe) {}

  /*
   * delete an entire meal plan
   */

  private deleteMealPlan(meal_plan: MealPlan) {}

  /*
   * create a new (blank) meal plan
   */

  private addMealPlan(name: string) {

    const new_meal_plan = new MealPlan();
    new_meal_plan.name = name;

    this.mealPlanService.createMealPlan(new_meal_plan).subscribe( mp => {
      this.meal_plans.push(mp);
    });
 
  }

  /*
   * select a meal plan from the list of available meal plans
   */

  private selectMealPlan(meal_plan) {
    this.selected_mp = meal_plan;
  }

  /*
   * open add meal dialog
   */

  openDialog(mp: MealPlan, day): void {
    let dialogRef = this.dialog.open(MealplanDialogComponent, {
      width: '500px',
      data: { meal_plan: mp, day: day }
    });
/*
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
*/
  }

  /*
   * sort each day's meals by the meal type: in order, breakfast, lunch, dinner, snack
   */
/*
  private sortMeals(meal_plan: MealPlan) {

    // iterate through each array element, sort meal_days by the meal type
    meal_plan.meal_plan_recipes_attributes.forEach( (mpr) => {
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
*/

  /*
   * convert "meal_plan_recipes_attributes" to a more useful format: "meal_days", 
   * a series of day: { meal, recipe } key / value pairs
   */
/*
  private convertToMealDays() {

    this.meal_plans.forEach( (meal_plan) => { 

      meal_plan.meal_days = {};

      // populate hash with days, initialize each value as an empty array
      this.constants.mealPlanDays.forEach( (day) => {
        meal_plan.meal_days[day] = new Array();
      });

      // for each recipe in the meal plan, add it to the appropriate day
      meal_plan.meal_plan_recipes_attributes.forEach( (recipe) => { 
        meal_plan.meal_days[ recipe.day ].push(recipe);
      });

      // destroy previously-used meal_plan_recipes_attributes array
      // as we've replaced it
      delete meal_plan.meal_plan_recipes_attributes;

    });

  }
*/

}
