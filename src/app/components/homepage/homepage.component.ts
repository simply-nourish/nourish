import { Component, OnInit } from '@angular/core';


import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

   constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
