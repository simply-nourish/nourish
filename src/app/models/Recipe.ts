// https://www.npmjs.com/package/json2typescript

import {JsonObject, JsonProperty} from "json2typescript";

import { RecipeIngredient } from './RecipeIngredient';
import { DietaryRestriction } from './DietaryRestriction';
import { RecipeUser } from './RecipeUser';


@JsonObject
export class Recipe {

  @JsonProperty('id', Number)
  id: number = undefined;
  private _id: number = undefined;
  get founded() { return this._id; }
  set founded(value: number) { this._id = value; }

  @JsonProperty('title', String)
  title: string = undefined;

  @JsonProperty('summary', String)
  summary: string = undefined;

  @JsonProperty('instructions', String)
  instructions: string;

  // @JsonProperty('steps', [String])
  // steps?: string[] = undefined;

  @JsonProperty('ingredient_recipes', [RecipeIngredient])
  ingredient_recipes: RecipeIngredient[] = undefined;

  @JsonProperty('dietary_restriction_recipes', [DietaryRestriction])  
  dietary_restriction_recipes: DietaryRestriction[] = undefined;

  @JsonProperty('user', RecipeUser)
  user: RecipeUser = undefined;
  hide?: true;

}
