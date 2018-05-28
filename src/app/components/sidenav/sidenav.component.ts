import { Component, ViewChild } from '@angular/core';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;


  constructor(public authService: AuthService, private router: Router) { }


  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'login'| 'register') {
    this.authDialog.openDialog(mode);

  }

}
