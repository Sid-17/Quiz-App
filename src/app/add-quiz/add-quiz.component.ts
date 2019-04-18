import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
  providers:[FirebaseService]
})
export class AddQuizComponent implements OnInit {


  drop1:string='Select Quiz';
  items: Array<any>;
  constructor(public firebaseService: FirebaseService
  ) { }


  ngOnInit(){
    this.firebaseService.getQuizzes()
    .subscribe(result => {
      this.items = result;
      console.log(this.items.length)
    })

  }

  addQuizInDb(value){
    console.log(value);
    this.firebaseService.addQuiz(value);
  }

addQuestionInQuiz(question,op1,op2,op3,op4){
  this.firebaseService.addQuestion(question,op1,op2,op3,op4,this.generateAns(op1,op2,op3,op4));

}

generateAns(op1,op2,op3,op4){
  let id:string ="checkbox";
  let answer:string='';
  if(this.toggleCheck(id+'1')){
    answer+=op1;
  }
  if(this.toggleCheck(id+'2')){
    if(answer=='')
    answer+=op2;
    else answer+=','+op2;
  }
  if(this.toggleCheck(id+'3')){
    if(answer=='')
    answer+=op3;
    else answer+=','+op3;
  }
  if(this.toggleCheck(id+'4')){
    if(answer=='')
    answer+=op4;
    else answer+=','+op4;
  }
return answer;
}


toggleCheck(id){
  let element = <HTMLInputElement> document.getElementById(id);
 return (element.checked);
}

}
