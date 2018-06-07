import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
// import { Customer } from '../../customer.interface';
import { AuthService } from '../../services/auth.service';
import { IngredientService } from "../../services/ingredient.service";
import { DietaryRestrictionService } from "../../services/dietary-restriction.service";
import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/Ingredient';
import { DietaryRestriction } from '../../models/DietaryRestriction';
import { RecipeIngredient } from '../../models/RecipeIngredient';

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
    restrictionList = ['vegan', 'vegetarian', 'ketogenic', 'gluten free', 'lactose free']; 
    
    constructor(private _fb: FormBuilder, public authService: AuthService, private ingredientService: IngredientService, private restrictionService: DietaryRestrictionService) { 
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
            instructions: [''],
            recipe_ingredients: this._fb.array([
                this.initIngredient(),
            ]),
            dietary_restriction_recipes: this._fb.array([
                this.initRestriction(),
            ])
            
        });

    }

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

    initIngredient() {
        return this._fb.group({
            ingredient: ['', Validators.required],
            amount: [''],
            measure: ['']
        });
    }
    
    initRestriction() {
        return this._fb.group({
            restriction: ['', Validators.required],
        });
    }
    
    addIngredient(){
        const control = <FormArray>this.recipeForm.controls['recipe_ingredients'];
        control.push(this.initIngredient());
    }

    addRestriction(){
        const control = <FormArray>this.recipeForm.controls['restrictions'];
        control.push(this.initRestriction());
    }
    
    removeIngredient(i: number){
        const control = <FormArray>this.recipeForm.controls['ingredients'];
        control.removeAt(i);
    }

    removeRestriction(i: number){
        const control = <FormArray>this.recipeForm.controls['restrictions'];
        control.removeAt(i);
    }


    save(model: Recipe) {
        // call API to save
        // ...
        console.log(model);
    }
    
    fireEvent(e) {
        console.log(e)
    }

}