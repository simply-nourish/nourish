import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

import {Angular2TokenService} from "angular2-token";
import {AuthService} from "./auth.service";
import { DietaryRestriction } from '../models/DietaryRestriction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DietaryRestrictionService {
  private userID: number;

  constructor(private authTokenService: Angular2TokenService, private authService: AuthService) { 
    console.log('DietaryRestrictionService constructed:');
    console.log(this.authService.getUser());
    console.log(this.authService.getUser().email);  
    this.userID = this.authService.getUser().id;
  }

  // GET /dietary_restrictions
  public getAllDietaryRestrictions(): Observable<DietaryRestriction[]> {
    return this.authTokenService.get('/dietary_restrictions').map(
      res =>{
        const restrictions = res.json();
        return restrictions.map((restriction) => new DietaryRestriction(restriction));
      }
    ).catch(this.handleError);
  }

  // POST /dietary_restrictions
  public createDietaryRestriction(restriction: DietaryRestriction): Observable<DietaryRestriction> {
    return this.authTokenService.post('/dietary_restrictions', restriction).map(
      res => {
        return new DietaryRestriction(res.json());
      }
    ).catch(this.handleError);
  }

  // GET /dietary_restrictions/:id
  public getDietaryRestrictionById(restrictionID: number): Observable<DietaryRestriction> {
    return this.authTokenService.get('/dietary_restrictions/' + restrictionID).map(
      res => {
        return new DietaryRestriction(res.json());
      }
    ).catch(this.handleError);
  }

  // PUT /dietary_restrictions/:id
  public updateDietaryRestriction(restriction: DietaryRestriction): Observable<DietaryRestriction> {
    return this.authTokenService.put('/dietary_restrictions/' + restriction.id, restriction).map(
      res => {
        return new DietaryRestriction(res.json());
      }
    ).catch(this.handleError);
  }
  
  // DELETE /dietary_restrictions/:id
  public deleteDietaryRestriction(restrictionID: number): Observable<null> {
    return this.authTokenService.delete('/dietary_restrictions/' + restrictionID)
    .map(res => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('DietaryRestrictionService::handleError', error);
    return Observable.throw(error);
  }
}
