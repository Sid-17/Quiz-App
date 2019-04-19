import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Quiz} from './quiz';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //quizzes:Observable<Quiz[]>;

  constructor(private firestore: AngularFirestore) {}

  getQuizzes(){
    return this.firestore.collection('/Quizzes').snapshotChanges();
}

getQuestions(quizId){
  return this.firestore.collection('/Quizzes/'+quizId+'/Questions').snapshotChanges();
}

addQuiz(value){
  this.firestore.collection('/Quizzes').doc(value).set({
    'name':value,
    'subject':value
  });

}
addQuestion(question,op1,op2,op3,op4,ans,expl,marks:number,quizId,mC:boolean){
  this.firestore.collection('/Quizzes/'+quizId+'/Questions').add({
    'question': question,
    'opt1':op1,
    'opt2':op2,
    'opt3':op3,
    'opt4':op4,
    'answer':ans,
    'explanation':expl,
    'marks':marks,
    'multiCorrect':mC
  });

}

}
