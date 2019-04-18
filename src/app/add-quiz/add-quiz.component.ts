import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
  providers:[FirebaseService]
})
export class AddQuizComponent implements OnInit {

  constructor(public firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
  }

  addQuizInDb(value){
    console.log(value);
    this.firebaseService.addQuiz(value);
  }

}
