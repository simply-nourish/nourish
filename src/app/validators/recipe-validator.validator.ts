import { AbstractControl } from '@angular/forms';
import { Recipe } from '../models/Recipe';

export function ValidateRecipe(control: AbstractControl) {
    console.log(control.value);
    if (!(control.value instanceof Recipe)) {
        return { invalidRecipe: true };
    }
    return null;
}

