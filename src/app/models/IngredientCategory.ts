import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class IngredientCategory {
  
  @JsonProperty('id', Number)
  _id: number = undefined;
  get id() { return this._id; }

  @JsonProperty('name', String)
  name: string = undefined;

  /*
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  */

}
