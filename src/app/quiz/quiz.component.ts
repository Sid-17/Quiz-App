import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../component.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [FirebaseService]
})
export class QuizComponent implements OnInit {

  cquiz: string;
  items: Array<any>;
  userName: string;
  qIds = [];
  queMap = new Map();
  ansMap = new Map();
  marksMap = new Map();
  explMap = new Map();
  mcMap = new Map();
  op1Map = new Map();
  op2Map = new Map();
  op3Map = new Map();
  op4Map = new Map();
  cBoxMap = new Map();
  evalMap = new Map();

  constructor(
    public firebaseService: FirebaseService,
    public componentService: ComponentService,
    private router: Router,
    public authService: AuthService
  ) {
    this.userName = localStorage.getItem('userName');
    this.userName = this.userName.slice(0, this.userName.indexOf("@"));
    if (this.userName == "") {
      this.router.navigate(['/login']);
    }
    else {
      if (this.userName == "admin") {
        this.router.navigate(['/add-quiz']);
      }
      else {
        if (this.componentService.getId() == null) {
          this.router.navigate(['/user']);
        }
        else {
          this.router.navigate(['/quiz']);
        }
      }
    }
  }


  ngOnInit() {
    this.cquiz = this.componentService.getId()
    //console.log(this.cquiz);
    this.getQuestions(this.cquiz)
  }

  getQuestions(quiz) {

    this.firebaseService.getQuestions(quiz)
      .subscribe(result => {
        this.items = result;
        let currentIndex, temporaryValue, randomIndex;
        currentIndex = this.items.length
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = this.items[currentIndex];
          this.items[currentIndex] = this.items[randomIndex];
          this.items[randomIndex] = temporaryValue;
        }

        for (let i of this.items) {
          this.qIds.push(i.payload.doc.id);
          this.queMap.set(i.payload.doc.id, i.payload.doc.data().question);
          this.ansMap.set(i.payload.doc.id, i.payload.doc.data().answer);
          this.marksMap.set(i.payload.doc.id, i.payload.doc.data().marks);
          this.explMap.set(i.payload.doc.id, i.payload.doc.data().explanation);
          this.op1Map.set(i.payload.doc.id, i.payload.doc.data().opt1);
          this.op2Map.set(i.payload.doc.id, i.payload.doc.data().opt2);
          this.op3Map.set(i.payload.doc.id, i.payload.doc.data().opt3);
          this.op4Map.set(i.payload.doc.id, i.payload.doc.data().opt4);
          this.mcMap.set(i.payload.doc.id, (i.payload.doc.data().multiCorrect == true));

        }

      })

  }


  onSubmitQuiz() {
    let tQ: number = this.ansMap.size;
    let cQ: number = 0;
    let bQ: number = 0;
    let wQ: number = 0;
    let score: number = 0;


    for (let [k, v] of this.ansMap) {
      let flag: boolean = true;
      if (this.blank(k)) {
        bQ++;
        this.evalMap.set(k, 0)
      }
      else {
        for (let i of '1234') {
          if(v.search(i)!==-1)
          {
            if (!this.toggleCheck("c" + i + "_" + k)) {
            flag = false;
          }
          else {
            if(this.toggleCheck("c" + i + "_" + k))
            flag=false;
          }

        }
      }
        if (flag) {
          cQ++;
          this.evalMap.set(k, 1);
          console.log(this.marksMap.get(k));
          score += this.marksMap.get(k);
        }
        else {
          wQ++;
          this.evalMap.set(k, -1);
          score = score - this.marksMap.get(k) / 2;
        }
      }
    }

    console.log(this.evalMap.size)
    this.setBoxMap();

    this.componentService.setResult(tQ, cQ, wQ, bQ, score, this.qIds, this.ansMap,
      this.marksMap, this.evalMap, this.explMap, this.mcMap, this.op1Map,
      this.op2Map, this.op3Map, this.op4Map, this.cBoxMap, this.queMap);
      alert("Quiz Submitted");
    this.router.navigate(['/result']);

  }

  setBoxMap() {
    for (let qId of this.qIds) {
      for (var i = 1; i <= 4; i++) {
        this.cBoxMap.set("c" + i + "_" + qId, this.toggleCheck("c" + i + "_" + qId))

      }
    }

  }

  blank(qId) {
    let blank: boolean = true;
    for (var i = 1; i <= 4; i++) {
      if (this.toggleCheck("c" + i + "_" + qId)) {
        blank = false;
      }
    }
    return blank;
  }

  toggleCheck(id) {
    let element = <HTMLInputElement>document.getElementById(id);
    return (element.checked);
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
