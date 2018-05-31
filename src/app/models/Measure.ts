import {JsonObject, JsonProperty} from "json2typescript";
@JsonObject
export class Measure {

  @JsonProperty('id', Number)
  id: number = undefined;
  private _id: number = undefined;
  get founded() { return this._id; }
  set founded(value: number) { this._id = value; }

  @JsonProperty('name', String)
  name: string = undefined;

  // constructor(values: Object = {}) {
  //   Object.assign(this, values);
  // }
}