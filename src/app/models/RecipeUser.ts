import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class RecipeUser {

  id: number = undefined;
  email: string = undefined;
  first_name: string = undefined;
  last_name: string = undefined;

  @JsonProperty('nickname', String)
  nickname: string = undefined;

}