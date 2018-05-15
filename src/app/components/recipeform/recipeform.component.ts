import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Customer } from '../../customer.interface';
import { Recipe } from '../../recipe.interface';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})

export class RecipeformComponent implements OnInit {
      public myForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            addresses: this._fb.array([
                this.initAddress(),
            ])
        });
    }

    initAddress() {
        return this._fb.group({
            ingredient: ['', Validators.required],
            amount: ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    addSteps() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }
    
    removeSteps(){
         const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }

    save(model: Customer) {
        // call API to save
        // ...
        console.log(model);
    }
    
    fireEvent(e) {
        console.log(e)
    }
}