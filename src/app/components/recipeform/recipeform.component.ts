import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger, 
    MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { IngredientService } from "../../services/ingredient.service";
import { DietaryRestrictionService } from "../../services/dietary-restriction.service";
import { RecipeService } from '../../services/recipe.service';

import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/Ingredient';
import { DietaryRestriction } from '../../models/DietaryRestriction';
import { RecipeIngredient } from '../../models/RecipeIngredient';

import { RecipeformDialogComponent } from '../recipeform-dialog/recipeform-dialog.component';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})

export class RecipeformComponent implements OnInit {
    recipe: Recipe;
    recipeForm: FormGroup;
    ingredients: Ingredient[];
    restrictions: DietaryRestriction[];
    
    constructor(private _fb: FormBuilder, public authService: AuthService, private ingredientService: IngredientService, private restrictionService: DietaryRestrictionService, private recipeService: RecipeService, public dialog: MatDialog) { 
        this.getIngredients();
        this.getDietaryRestrictions(); 
    }

    ngOnInit() {
        this.recipe = new Recipe();
        console.log(this.recipe);
        this.recipeForm = this._fb.group({
            
            title: ['', [Validators.required, Validators.minLength(2)]],
            summary: [''],
            servings: [''],
            instructions: ['']   
        });

    }
 
    /*
     * gets all ingredients
     */

    getIngredients() {
        this.ingredientService.getAllIngredients().subscribe(
            data => {
                console.log('Ingredient Service data');
                console.log(data);
                this.ingredients = data;
                console.log(this.ingredients); 
            }
        )
    }

    getDietaryRestrictions() {
        this.restrictionService.getAllDietaryRestrictions().subscribe(
            data => {
                console.log('Ingredient Service data');
                console.log(data);
                this.restrictions = data;
                console.log(this.restrictions); 
            }
        )
    }

    /*
   * open add meal dialog
   */

    openDialog(new_recipe: Recipe): void {
        const dialogRef = this.dialog.open(RecipeformDialogComponent, {
            width: '350px',
            data: { recipe: new_recipe }
        });

        dialogRef.afterClosed().subscribe(result => {

            const new_ri = new RecipeIngredient();

            new_ri.amount = result.amount;
            new_ri.measure = result.measure;
            new_ri.ingredient = result.ingredient;
            this.recipe.ingredient_recipes.push(new_ri);
        });

    }

    save(model: Recipe) {
        // call API to save
        console.log(this.recipe);
        console.log(model);
        this.recipeService.createRecipe(model).subscribe(
            data => {
                console.log(data);
                // this is just for testing:
                this.recipeService.getUserRecipes().subscribe(
                    recipe_data => {
                        console.log(recipe_data);
                    }
                );
            }
        );
    }
    
    fireEvent(e) {
        console.log(e)
    }

}