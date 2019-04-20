import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { FirebaseService } from '../firebase.service';
import { ComponentService } from '../component.service';
@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss'],
  providers:[FirebaseService]
})
export class UserComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  items: Array<any>;
  userName: String;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
    public componentService: ComponentService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName');
    this.userName = this.userName.slice(0,this.userName.indexOf("@"));
    console.log(this.userName+" printeddd");

    let order = localStorage.getItem('userName');
    console.log(order+"this printeddd");

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })

    this.firebaseService.getQuizzes()
    .subscribe(result => {
      this.items = result;
      console.log(this.items.length)
    })

  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

startQuiz(value){
  this.componentService.setId(value);
  this.router.navigate(['/quiz']);
}
  logout(){
    this.authService.doLogout()
    .then((res) => {
      // this.location.back();
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Logout error", error);
    });
    localStorage.removeItem('userName');
  }
}
