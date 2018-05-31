import { Component, OnInit } from '@angular/core';
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
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
    const jsonObject: object = {
      "id":2,
      "title":"fishsticks",
      "summary":"some good fishsticks","instructions":"put them in the oven",
      "steps": ['1', '2', '3'],
      "ingredient_recipes":[
        {
          "amount":3.5,
          "measure":{
            "id":2,
            "name":"cup"
          },
          "ingredient":{
            "id":2,
            "name":"salt"
          }
        },
        {
          "amount":2.0,
          "measure":{
            "id":12,
            "name":"lb"
          },
          "ingredient":{
            "id":12,
            "name":"flounder"
          }
        }
      ],
      "dietary_restriction_recipes":[
        {
          "id":2,
          "name":"vegan"
        }
      ],
      "user":{
        "nickname":"UOne"
      }
    };

    // Choose your settings
    // Check the detailed reference in the chapter "JsonConvert class properties and methods"
    let jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

    // map to Recipe class
    try {
      this.recipe = jsonConvert.deserialize(jsonObject, Recipe);
      console.log(this.recipe);
    } catch (e) {
      console.log((<Error>e));
    }
          
    // this.recipe = {
    //   id: 1,
    //   title:'Baked Chicken',
    //   summary: 'It\'s a chicken...that\'s baked.',
    //   instructions: '',
    //   steps: ['Preheat oven to 400 degrees', 'Coat chicken in olive oil', 'Sprinkle salt and pepper on both sides', 'Bake for 30 minutes'], 
    //   ingredient_recipes: { 

    //   },
    //     ['1 lb chicken breast', '1 tsp salt', '1 tsp pepper', '1bsp olive oil'],
    //   dietary_restriction_recipes: [],
    //   user: {
    //     nickname: 'Demo'
    //   }
    // }
    
    
  }

  getRecipe(recipeID: number) {

  }
}

