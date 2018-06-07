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
  @Output() purchasedEvent = new EventEmitter();
  @Output() amountAdjustedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  itemPurchased() {
    this.purchasedEvent.emit(this.list_item.id);
  }

  itemAmountAdjusted() {
    this.amountAdjustedEvent.emit( {id: this.list_item.id, amount: this.list_item.amount} ) ;
  }

}
