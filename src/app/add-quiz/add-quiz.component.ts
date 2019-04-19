import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
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
  itemss = [
    {key: 'item1'},
    {key: 'item2'},
    {key: 'item3'},
  ];

  constructor(
    public firebaseService: FirebaseService,
    public authService: AuthService,
    private location : Location,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit(){
    this.firebaseService.getQuizzes()
    .subscribe(result => {
      this.items = result;
      //console.log(this.items.length);
    })

    // create checkbox group
    let checkboxGroup = new FormArray(this.items.map(item => new FormGroup({
      id: new FormControl(item.key),
      text: new FormControl(item.text),
      checkbox: new FormControl(false)
    })));
/*
    // create a hidden reuired formControl to keep status of checkbox group
    let hiddenControl = new FormControl(this.mapItems(checkboxGroup.value), Validators.required);
    // update checkbox group's value to hidden formcontrol
    checkboxGroup.valueChanges.subscribe((v) => {
      console.log(v);
      hiddenControl.setValue(this.mapItems(v));
    });*/
/*
    this.form = new FormGroup({
      items: checkboxGroup,
      selectedItems: hiddenControl
    });*/

  }

  // mapItems(itemss) {
  //   let selectedItems = itemss.filter((item) => item.checkbox).map((item) => item.id);
  //   return selectedItems.length ? selectedItems : null;
  // }

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
      answer+='opt1';
      countChecked++;
    }
    if(this.toggleCheck(id+'2')){
      if(answer=='')
      {answer+='opt2';
      countChecked++;
      }
      else{
        answer+=','+'opt2';
        countChecked++;
      }
    }
    if(this.toggleCheck(id+'3')){
      if(answer=='')
      {answer+='opt3';
      countChecked++;
      }
      else{ answer+=','+'opt3';
        countChecked++;
      }
    }
    if(this.toggleCheck(id+'4')){
      if(answer=='')
      {
        answer+='opt4';
        countChecked++;
      }
      else {
        answer+=','+'opt4';
        countChecked++;
      }
    }
  
  return [answer,countChecked>1];
  }


toggleCheck(id){
  let element = <HTMLInputElement> document.getElementById(id);
 return (element.checked);
}

}
