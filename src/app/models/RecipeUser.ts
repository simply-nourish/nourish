import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class RecipeUser {

  @JsonProperty('nickname', String)
  nickname: string = undefined;

  // constructor(values: Object = {}) {
  //   Object.assign(this, values);
  // }
}