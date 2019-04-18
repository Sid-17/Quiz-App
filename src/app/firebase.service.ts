import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Quiz} from './quiz';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  quizzes:Observable<Quiz[]>;

  constructor(private firestore: AngularFirestore) {}

  getQuizzes(){
    return this.firestore.collection('/Quizzes').snapshotChanges();
}

addQuiz(value){
  this.firestore.collection('/Quizzes').doc(value).set({
    'name':value,
    'subject':value
  });
  
}
}
