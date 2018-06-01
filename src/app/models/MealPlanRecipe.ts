// https://www.npmjs.com/package/json2typescript

import {JsonObject, JsonProperty} from "json2typescript";

import { RecipeSummary } from './RecipeSummary';
import { DietaryRestriction } from './DietaryRestriction';
import { RecipeUser } from './RecipeUser';

@JsonObject
export class MealPlanRecipe {
/*
  @JsonProperty('id', Number)
  _id: number = undefined;
  get id() { return this._id; }
*/
  @JsonProperty('day', String)
  day: string = undefined;

  @JsonProperty('meal', String)
  meal: string = undefined;

  @JsonProperty('recipe', RecipeSummary)
  recipe: RecipeSummary = undefined;

}
