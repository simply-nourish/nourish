import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  private apiUrl;
  data: any = {}; 
  task: string;
  tasks = [];

  
  constructor(private http: Http) {
    this.apiUrl = 'https://nourish-backend.herokuapp.com/recipes';
    console.log('Hello');
    this.getContacts(); 
    this.getData(); 
    
  }

  ngOnInit() {
  }
  
  onClick(){
    this.tasks.push({name: this.task});
    this.task = '';
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


}
