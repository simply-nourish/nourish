import { IngredientRecipe } from '../../models/IngredientRecipe';

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TitleCasePipe } from '../../pipes/title-case.pipe';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder,
         FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Input() ingredient_recipe: IngredientRecipe;
  @Output() removedEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ingredientRemoved() {
    this.removedEvent.emit( this.ingredient_recipe );
  }

}
