import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Angular2TokenService} from "angular2-token";

import { RegisterUser } from '../../register.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  signUpUser: RegisterUser = {  
    nickname: '',
    firstName: '',
    lastName: '',
    defaultServings: '2',
    image: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    confirmSuccessUrl: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthService:Angular2TokenService) {}

  ngOnInit() {}


  onSignUpSubmit(){

    this.tokenAuthService.registerAccount(this.signUpUser).subscribe(

        (res) => {

          if (res.status == 200){
            this.onFormResult.emit({signedUp: true, res})
          }

        },

        (err) => {
          console.log(err.json())
          this.onFormResult.emit({signedUp: false, err})
        }
    )

  }
}