import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './auth.service';
import { ShoppingList } from '../models/ShoppingList';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ShoppingListService {

  private userID: number;
  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService) {
 //   this.userID = this.authTokenService.currentUserData.id;
    this.jsonConvert = new JsonConvert();
  }

  /*
   * GET /users/:id/shopping_lists
   */

  public getUserShoppingLists(): Observable<ShoppingList[]> {

    console.log('outside');

    if ( this.authTokenService.currentUserData != null) {

      console.log('inside if');

      const userID = this.authTokenService.currentUserData.id;
      return this.authTokenService.get('/users/' + userID + '/shopping_lists')
      .map( res => {
        console.log('result');
        return this.jsonConvert.deserialize(res.json(), ShoppingList);
      }).catch(this.handleError);

    } else {
      return of([]);  // blank observable
    }

  }

  // GET /shopping_lists/:id
  public getShoppingListByID(shoppingListID: number) {

    return this.authTokenService.get('shopping_lists/' + shoppingListID).map( res => {
      return this.jsonConvert.deserialize(res.json(), ShoppingList);
    }).catch(this.handleError);

  }

  // POST /users/:id/shopping_lists/
  public createShoppingList(input_list: ShoppingList): Observable<ShoppingList> {

    // create object to match format
    const shopping_list = {
      name: input_list.name,
      meal_plan_id: input_list.meal_plan.id
    };

    console.log(shopping_list);

    if ( this.authTokenService.currentUserData != null) {

      const userID = this.authTokenService.currentUserData.id;
      return this.authTokenService.post('/users/' +
                                        userID +
                                        '/shopping_lists/',
                                        shopping_list)
      .map( res => {
        console.log(res.json());
        return this.jsonConvert.deserialize(res.json(), ShoppingList);
      }).catch(this.handleError);
    } else {
      return of();  // blank observable
    }
  }

  // PUT /shopping_lists/:id

  /*
   * add ingredient to shopping list
   */


  /*
   * mark ingredient as purchased
   */


  /*
   * update ingredient amount
   */



  /*
   *
   */

  public deleteShoppingList(shoppingListID: number) {

    return this.authTokenService.delete('shopping_lists/' + shoppingListID)
    .map ( res => {
      if (res && res.status < 300) {
        console.log(res.json());
        return {status: res.status, json: res};
      }
    }).catch(this.handleError);

  }

  /*
   * error handling function for Shopping List service
   */

  private handleError (error: Response | any) {
    console.error('ShoppingListService::handleError', error);
    return Observable.throw(error);
  }

}
