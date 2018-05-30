export class Recipe {
  recipeName: string;
  ingredients: string[];
  steps: string[];
  hide?: true;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
