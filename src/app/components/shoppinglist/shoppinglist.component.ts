import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {appConfig} from '../../app.constants';

import { IngredientShoppingList } from '../../models/IngredientShoppingList';
import { ShoppingList } from '../../models/ShoppingList';
import { ShoppingListService } from '../../services/shopping-list.service';

import { TitleCasePipe } from '../../pipes/title-case.pipe';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder,
         FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ShoppinglistDialogComponent } from '../shoppinglist-dialog/shoppinglist-dialog.component';
import { ShoppinglistAdditemDialogComponent } from '../shoppinglist-additem-dialog/shoppinglist-additem-dialog.component';

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
               public createDialog: MatDialog,
               public addItemDialog: MatDialog ) { }
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

    const dialogRef = this.createDialog.open(ShoppinglistDialogComponent, {
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
   * open add item dialog
   */

  activateAddItemDialog(): void {

    const dialogRef = this.addItemDialog.open(ShoppinglistAdditemDialogComponent, {
      width: '350px',
      data: this.selected_sl
    });

    // make request if data passed back from dialog
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null ) {
        console.log('result passed back');

        const new_listitem = new IngredientShoppingList();
        new_listitem.ingredient = result.ingredient;
        new_listitem.measure = result.measure;
        new_listitem.amount = result.amount;

        console.log(new_listitem);
        this.addItemToShoppingList(this.selected_sl, new_listitem);

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

  /*
   * add a new item to the shopping list
   */

  addItemToShoppingList(input_list: ShoppingList, list_item: IngredientShoppingList) {

    // add ingredient to shopping list
    this.shoppingListService.addIngredientToShoppingList(input_list, list_item).subscribe( data => {
      if ( data.status < 300) {
        // GET for updated resource
        this.shoppingListService.getShoppingListByID(input_list.id).subscribe( sl => {
          this.selected_sl = sl;
        });
      }
    });

  }

  setPurchasedColor(list_item: IngredientShoppingList) {
    if (list_item.purchased) {
      return '#f45c42';
    }

  }

  setItemPurchased(itemID: number) {
  /*
    .purchased = true;
    this.setPurchasedColor(list_item);
  */
  }

  setItemAmount(new_state) {

  }

}
