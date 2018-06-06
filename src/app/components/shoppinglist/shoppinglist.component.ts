import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {appConfig} from '../../app.constants';

import { ShoppingList } from '../../models/ShoppingList';
import {TitleCasePipe} from '../../pipes/title-case.pipe';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder,
         FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  shopping_lists: ShoppingList [];
  selected_sl: ShoppingList;
  showExtended: true;

  constants = appConfig;
  slForm: FormGroup;

  constructor( //private shoppingListService: ShoppingListService,
                /*public dialog: MatDialog, */
                /*public slVal: ShoppingListValidator */) { }


  /*
   * trigger actions on 'init' hook
   */

  ngOnInit() { }

  /*
   * gets all meal plans for the current user
   */
/*
  getMealPlans() {
    this.mealPlanService.getUserMealPlans().subscribe(
      data => {
        this.meal_plans = data;
        if (this.meal_plans) {
          this.selected_mp = this.meal_plans[0];
        }
      });
  }
*/

}
