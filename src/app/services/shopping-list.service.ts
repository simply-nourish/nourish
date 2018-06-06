import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './auth.service';
import { ShoppingList } from '../models/ShoppingList';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ShoppingListService {

  private userID: number;
  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService) {
    this.userID = this.authTokenService.currentUserData.id;
    this.jsonConvert = new JsonConvert();
  }

  /*
   * GET /users/:id/shopping_lists
   */

  public getUserShoppingLists(): Observable<ShoppingList[]> {
    return this.authTokenService.get('/users/' + this.userID + '/meal_plans')
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), ShoppingList);
    }).catch(this.handleError);
  }

  // GET /shopping_lists/:id


  // POST /users/:id/shopping_lists/


  // PUT /shopping_lists/:id

  // DELETE /shopping_lists/:id


  /*
   * error handling function for Shopping List service
   */

  private handleError (error: Response | any) {
    console.error('ShoppingListService::handleError', error);
    return Observable.throw(error);
  }

}
