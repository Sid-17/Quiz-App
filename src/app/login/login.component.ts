import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService, StorageServiceModule } from 'ngx-webstorage-service';

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
        localStorage.setItem('userName',value.email);
        this.router.navigate(['/add-quiz']);
      }
      else{
        localStorage.setItem('userName',value.email);
        this.router.navigate(['/user']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}