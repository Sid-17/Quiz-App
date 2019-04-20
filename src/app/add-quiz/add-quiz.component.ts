import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
  providers:[FirebaseService]
})
export class AddQuizComponent implements OnInit {

  selectedQuiz: string;
  items: Array<any>;
  userName: String;

  constructor(
    public firebaseService: FirebaseService,
    public authService: AuthService,
    private location : Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }


  ngOnInit(){

    this.userName = localStorage.getItem('userName');
    this.userName = this.userName.slice(0,this.userName.indexOf("@"));
    console.log(this.userName+" printeddd");

    this.firebaseService.getQuizzes()
    .subscribe(result => {
      this.items = result;
      //console.log(this.items.length);
    })

  }

  addQuizInDb(value){
    console.log(value);
    this.firebaseService.addQuiz(value);
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

  onQuizSelect(event){
    this.selectedQuiz=event.target.value;
  }
  
  addQuestionInQuiz(question,op1,op2,op3,op4,explanation,marks){
    var tup=this.generateAns(op1,op2,op3,op4)
    this.firebaseService.addQuestion(question,op1,op2,op3,op4,tup[0],explanation,marks,this.selectedQuiz,tup[1]==true);
  }

  generateAns(op1,op2,op3,op4){
    let id:string ="checkbox";
    let countChecked:number=0;
    let answer:string='';
    if(this.toggleCheck(id+'1')){
      answer+='1';
      countChecked++;
    }
    if(this.toggleCheck(id+'2')){
      answer+='2';
      countChecked++;
      }

    if(this.toggleCheck(id+'3')){
      answer+='3';
      countChecked++;
      }

    if(this.toggleCheck(id+'4')){
        answer+='4';
        countChecked++;
      }
    return [answer,countChecked>1];
  }


toggleCheck(id){
  let element = <HTMLInputElement> document.getElementById(id);
 return (element.checked);
}

}
