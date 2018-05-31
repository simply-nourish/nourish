import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class RecipeUser {
  nickname: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}