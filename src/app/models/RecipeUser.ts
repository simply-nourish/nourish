export class RecipeUser {
  nickname: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}