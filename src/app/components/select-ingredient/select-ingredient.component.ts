// https://material.angular.io/components/autocomplete/examples
// for use in recipe form builder

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Ingredient } from '../../models/Ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-select-ingredient',
  templateUrl: './select-ingredient.component.html',
  styleUrls: ['./select-ingredient.component.css']
})
export class SelectIngredientComponent implements OnInit {
  ingredientCtrl: FormControl;
  private ingredients: Ingredient[];
  ingredientOptions: Observable<any[]>;

  constructor(private ingredientService: IngredientService) { 
    this.ingredientCtrl = new FormControl();
    this.getIngredients();
    this.ingredientOptions = this.ingredientCtrl.valueChanges
      .pipe(
        startWith(''),
        map(ingredient => ingredient ? this.filterIngredients(ingredient) : this.ingredients.slice())
      );  
    }

  ngOnInit() {
  }

  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe(
        data => {
            console.log('Ingredient Service data');
            console.log(data);
            this.ingredients = data;
        }
    )
  }

  filterIngredients(name: string) {
    return this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
