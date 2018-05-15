import { Component, OnInit } from '@angular/core';

import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe; 

  
  constructor() {
    
  }

  ngOnInit() {
    this.recipe = {
      recipeName:'Baked Chicken',
      ingredients: ['1 lb chicken breast', '1 tsp salt', '1 tsp pepper', '1bsp olive oil'],
      steps: ['Preheat oven to 400 degrees', 'Coat chicken in olive oil', 'Sprinkle salt and pepper on both sides', 'Bake for 30 minutes'], 
    }
    
    
  }

}

