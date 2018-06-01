// https://www.npmjs.com/package/json2typescript

import {JsonObject, JsonProperty} from "json2typescript";

import { RecipeIngredient } from './RecipeIngredient';
import { DietaryRestriction } from './DietaryRestriction';
import { RecipeUser } from './RecipeUser';


@JsonObject
export class Recipe {

  @JsonProperty('id', Number)
  _id: number = undefined;
  get id() { return this._id; }

  @JsonProperty('title', String)
  title: string = undefined;

  @JsonProperty('summary', String)
  summary: string = undefined;

  @JsonProperty('servings', Number)
  servings: number = undefined;

  @JsonProperty('instructions', String)
  instructions: string = undefined;

  @JsonProperty('ingredient_recipes', [RecipeIngredient])
  ingredient_recipes: RecipeIngredient[] = undefined;

  @JsonProperty('dietary_restriction_recipes', [DietaryRestriction])  
  dietary_restriction_recipes: DietaryRestriction[] = undefined;

  @JsonProperty('user', RecipeUser)
  user: RecipeUser = undefined;
  hide?: true;

}
