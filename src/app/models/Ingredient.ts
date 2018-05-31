import {JsonObject, JsonProperty} from "json2typescript";
import { IngredientCategory } from './IngredientCategory';

@JsonObject
export class Ingredient {
  @JsonProperty('id', Number)
  id: number = undefined;
  private _id: number = undefined;
  get founded() { return this._id; }
  set founded(value: number) { this._id = value; }

  @JsonProperty('name', String)
  name: string = undefined;

  @JsonProperty('ingredient_category', IngredientCategory)
  ingredient_category: IngredientCategory;

  // constructor(values: Object = {}) {
  //   Object.assign(this, values);
  // }
}
