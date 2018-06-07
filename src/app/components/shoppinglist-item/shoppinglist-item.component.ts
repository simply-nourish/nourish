import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
//import {MatButtonModule} from '@angular/material/button';

import {IngredientShoppingList} from '../../models/IngredientShoppingList';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

@Component({
  selector: 'app-shoppinglist-item',
  templateUrl: './shoppinglist-item.component.html',
  styleUrls: ['./shoppinglist-item.component.css']
})
export class ShoppinglistItemComponent implements OnInit {

  @Input() list_item: IngredientShoppingList;
  @Input() background_color: string;
  @Output() purchasedEvent = new EventEmitter<any>();
  @Output() amountAdjustedEvent = new EventEmitter<any>();
  @Output() itemRemovedEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  itemPurchased() {
    console.log('item purchased');
    this.purchasedEvent.emit( this.list_item );
  }

  itemAmountAdjusted() {
    console.log('amount adjusted');
    this.amountAdjustedEvent.emit( this.list_item ) ;
  }

  itemRemoved() {
    console.log('item removed');
    this.itemRemovedEvent.emit( this.list_item );
  }

}
