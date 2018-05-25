import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  
  task: string;
  tasks = [];

  constructor() { }

  ngOnInit() {
  }
  
  onClick(){
    this.tasks.push({name: this.task});
  this.task = '';
}

}
