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
    this.getQuestions(this.cquiz)
  }

  getQuestions(quiz){

    this.firebaseService.getQuestions(quiz)
    .subscribe(result => {
      this.items = result;
      let currentIndex , temporaryValue, randomIndex;
      currentIndex=this.items.length
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.items[currentIndex];
        this.items[currentIndex] = this.items[randomIndex];
        this.items[randomIndex] = temporaryValue;
      }
  
    })
  
  }


}
