import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss','signin.css','bootstrap.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      if(value.email == "qw@qw.com" && value.password == "qwqwqw"){
        console.log(value.email);
        console.log(value.password);
        this.router.navigate(['/add-quiz']);
      }
      else{
        this.router.navigate(['/quiz']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}
