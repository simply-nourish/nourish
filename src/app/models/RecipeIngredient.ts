import {JsonObject, JsonProperty} from "json2typescript";

import { Measure } from './Measure';
import { Ingredient } from './Ingredient';

@JsonObject
export class RecipeIngredient {
  amount: number;
  measure: Measure;
  ingredient: Ingredient;
}