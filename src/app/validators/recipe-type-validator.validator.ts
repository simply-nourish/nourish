import { AbstractControl } from '@angular/forms';
import { Recipe } from '../models/Recipe';

export function ValidateRecipeType(control: AbstractControl) {
  if (!(control.value instanceof Recipe)) {
    return { invalidRecipe: true };
  }
  return null;
}

