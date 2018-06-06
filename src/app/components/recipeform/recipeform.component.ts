import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
// import { Customer } from '../../customer.interface';
import { IngredientService } from "../../services/ingredient.service";
import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/Ingredient';


@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})

export class RecipeformComponent implements OnInit {
    public myForm: FormGroup;


    constructor(private _fb: FormBuilder, private ingredientService: IngredientService) { 
        
    }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            addresses: this._fb.array([
                this.initAddress(),
            ]),
            ingredients: this._fb.array([
                this.initIngredient(),
            ]),
            steps: this._fb.array([
                this.initStep(),
            ])
            
        });

    }

    initAddress() {
        return this._fb.group({
            ingredient: ['', Validators.required],
            amount: ['']
        });
    }
    
    initIngredient() {
        return this._fb.group({
            ingredient: ['', Validators.required],
            amount: [''],
            measure: ['']
        });
    }
    
    initStep() {
        return this._fb.group({
            step: ['', Validators.required],
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }
    
    addIngredient(){
        const control = <FormArray>this.myForm.controls['ingredients'];
        control.push(this.initIngredient());
    }

    addStep(){
        const control = <FormArray>this.myForm.controls['steps'];
        control.push(this.initStep());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }
    
    removeIngredient(i: number){
        const control = <FormArray>this.myForm.controls['ingredients'];
        control.removeAt(i);
    }

    removeStep(i: number){
        const control = <FormArray>this.myForm.controls['steps'];
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