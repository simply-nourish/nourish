import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from "../../services/auth.service";
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealplanComponent implements OnInit {
  private apiUrl;
  data: any = {}; 

  constructor(private http: Http, public authTokenService:Angular2TokenService, public authService:AuthService) {
    this.apiUrl = 'https://nourish-backend.herokuapp.com/recipes';
    console.log('Hello');
    this.getContacts(); 
    this.getData(); 
    console.log(this.getUserID());
    
  }

  ngOnInit() {
    
  }
  
  getData() {
     return this.http.get(this.apiUrl)
     .map((res: Response) => res.json())
  }
  
  getContacts() {
    this.getData().subscribe(data => {
      console.log(data); 
      this.data = data
    })
  }

   getUserID(){
    return this.authTokenService.currentUserData.id;
  }
  
  printUserID(){
    console.log(this.getUserID());
  }

  
}
