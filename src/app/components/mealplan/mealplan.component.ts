import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from '../../services/auth.service';
import {Angular2TokenService} from 'angular2-token';

import {MealPlanService} from '../../services/meal-plan.service'

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})

export class MealplanComponent implements OnInit {

  meal_plans = [];
  showExtended: boolean = true;

  constructor(private mealPlanService: MealPlanService) {
    this.getMealPlans();
  }

  ngOnInit() { }
  
  getMealPlans() {
    this.mealPlanService.getUserMealPlans().subscribe( 
      data => { 
        console.log(data);
        this.meal_plans = data;

        console.log("meal plan:");
        console.log(this.meal_plans)
      });
  }
  
}
