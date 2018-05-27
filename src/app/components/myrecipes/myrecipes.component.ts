import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyrecipesComponent implements OnInit {
  
   private apiUrl;
  recipes: Recipe[]; 
  showExtended: boolean = true; 
  data: any = {}; 
  enableAdd: boolean = true; 
  
  constructor(private http: Http) {
    this.apiUrl = 'https://nourish-backend.herokuapp.com/recipes';
    console.log('Hello');
    this.getContacts(); 
    this.getData(); 
    
  }


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
  
  getData() {
     return this.http.get(this.apiUrl)
     .map((res: Response) => res.json())
  }
  
  getContacts() {
    this.getData().subscribe(data => {
      console.log(data); 
      this.data = data
      this.recipes = data
    })
  }

}
