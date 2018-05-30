import {IngredientCategory} from './IngredientCategory';

export class Ingredient {
  id: number;
  name: string;
  ingredient_category: IngredientCategory;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
