import { Component, OnInit } from '@angular/core';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
