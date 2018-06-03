import { Component, OnInit, EventEmitter, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, } from '@angular/forms';

import { RecipeService } from '../../services/recipe.service';

import { appConfig } from '../../app.constants';

import {MealPlan} from '../../models/MealPlan';
import {MealPlanRecipe} from '../../models/MealPlanRecipe';
import {Recipe} from '../../models/Recipe';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

@Component({
  selector: 'app-mealplan-dialog',
  templateUrl: './mealplan-dialog.component.html',
  styleUrls: ['./mealplan-dialog.component.css']
})
export class MealplanDialogComponent implements OnInit {

  private constants = appConfig;
  meal_plan_recipe: FormGroup;
  recipes: Array<Recipe>;

  constructor(public dialogRef: MatDialogRef<MealplanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public recipeService: RecipeService) {
  }

  ngOnInit() {
    this.meal_plan_recipe = new FormGroup({
      recipe_id: new FormControl(),
      meal: new FormControl(),
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  getAvailableMealTimes() {
    const taken_mealtimes = new Set();

    this.data.meal_plan.meal_plan_recipes_attributes.forEach( mpr => {
      if (mpr.day === this.data.day) {
        taken_mealtimes.add(mpr.meal);
      }
    });

    return this.constants.mealPlanMeals.filter( (mealtime) => !taken_mealtimes.has(mealtime) );
  }

  onSubmit() {
    console.log(this.meal_plan_recipe.value, this.meal_plan_recipe.valid);
    this.onClose();
  }

}

