import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import {ComponentService } from '../component.service'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers:[FirebaseService]
})
export class QuizComponent implements OnInit {

  cquiz: string;
  items: Array<any>;
  constructor(public firebaseService: FirebaseService,
  public componentService: ComponentService
  ) { }


  ngOnInit() {
    this.cquiz=this.componentService.getId()
    //console.log(this.cquiz);
    this.getQuestions(this.cquiz);
  }

getQuestions(quiz){

  this.firebaseService.getQuestions(quiz)
  .subscribe(result => {
    this.items = result;
    console.log(this.items.length)
  })

}


}
