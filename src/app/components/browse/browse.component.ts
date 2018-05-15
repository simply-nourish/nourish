import { Component, OnInit } from '@angular/core';

import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  recipes: Recipe[]; 
  showExtended: boolean = true; 

  constructor() { }

  ngOnInit() {
    
    this.recipes = [
      {
        recipeName:'Baked Chicken',
        ingredients: ['1 lb chicken breast', '1 tsp salt', '1 tsp pepper', '1bsp olive oil'],
        steps: ['Preheat oven to 400 degrees', 'Coat chicken in olive oil', 'Sprinkle salt and pepper on both sides', 'Bake for 30 minutes'], 
      },
      {
         recipeName: 'Quesadilla',
         ingredients: ['1 cup shredded cheese','2 10-inch tortillas','Salsa, to taste'],
         steps: ['Heat pan on medium heat','Place cheese on top of one tortilla','Please second tortilla on top', 'Heat in pan until brown, then flip and brown on other side','Serve with salda on the side'],
      },
      {
        recipeName: 'Beet Salad',
         ingredients: ['1 cup cooked red beets','2 cups spinach','3 ounces goat cheese', '2 tablespoons balsalmic vinegar'],
         steps: ['Chop beets', 'Mix beets and spinach', 'Crumble goat cheese on top', 'Pour over vinegar and mix'],
      }
      ];
      
      
      this.addRecipe({
        recipeName: 'Parfait',
         ingredients: ['1 cup yogurt','1 cup berries',' Whipped cream, to taste'],
         steps: ['Add 1/3 of the yogurt to bottom of cup', 'Add 1/3 berries', 'Repeat until no more yogurt or berries', 'Top with whipped cream'],
      }); 
  }
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    
  }

}
