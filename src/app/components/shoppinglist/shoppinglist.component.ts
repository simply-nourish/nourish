import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {appConfig} from '../../app.constants';

import { ShoppingList } from '../../models/ShoppingList';
import { ShoppingListService } from '../../services/shopping-list.service';

import { TitleCasePipe } from '../../pipes/title-case.pipe';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder,
         FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ShoppinglistDialogComponent } from '../shoppinglist-dialog/shoppinglist-dialog.component';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  shopping_lists: ShoppingList [];
  selected_sl: ShoppingList;
  showExtended: true;

  constants = appConfig;
  slForm: FormGroup;

  constructor( private shoppingListService: ShoppingListService,
               public dialog: MatDialog ) { }
               // public slVal: ShoppingListValidator */)


  /*
   * trigger actions on 'init' hook
   */

  ngOnInit() {
    this.getShoppingLists();
  }

  /*
   * gets all meal plans for the current user
   */

  getShoppingLists() {
    this.shoppingListService.getUserShoppingLists().subscribe(
      data => {
        this.shopping_lists = data;
        if (this.shopping_lists) {
          this.selected_sl = this.shopping_lists[0];
        }
      });
  }

  /*
   * create a new shopping list
   */

  addShoppingList(sl: ShoppingList) {
    this.shoppingListService.createShoppingList(sl).subscribe( data => {
      this.shopping_lists.push(data);
    });
  }

  /*
   * open add meal dialog
   */

  activateCreateDialog(): void {

    const dialogRef = this.dialog.open(ShoppinglistDialogComponent, {
      width: '350px',
      data: { }
    });

    // make request if data passed back from dialog
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.meal_plan != null && result.name != null) {
        const new_sl = new ShoppingList();
        new_sl.name = result.name;
        new_sl.meal_plan = result.meal_plan;
        console.log(new_sl);
        this.addShoppingList(new_sl);
      }
    });

  }

  /*
   * select a particular shopping list
   */

  selectShoppingList(shopping_list: ShoppingList) {
    this.shoppingListService.getShoppingListByID(shopping_list.id).subscribe( data => {
      this.selected_sl = data;
    });
  }

  /*
   * delete shopping list
   */

  deleteShoppingList(shopping_list: ShoppingList) {

    this.shoppingListService.deleteShoppingList(shopping_list.id).subscribe( data => {
      if (data.status && data.status < 300) {
        this.shopping_lists = this.shopping_lists.filter( sl => sl.id !== shopping_list.id );
        // reset selected shopping list, if it exists
        if ( this.shopping_lists.length > 0) {
          this.selected_sl = this.shopping_lists[0];
        } else {
          this.selected_sl = null;
        }
      }
    });

  }

}
