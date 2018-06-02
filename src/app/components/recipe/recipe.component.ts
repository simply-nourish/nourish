import { Component, Input } from '@angular/core';
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  private hide = true;

  @Input() recipe: Recipe;

}

