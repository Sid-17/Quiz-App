import { Component, OnInit } from '@angular/core';
import {ComponentService } from '../component.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [AuthService]
})
export class ResultComponent implements OnInit {

  tQ:number
  userName: String
  bQ:number
  cQ:number
  wQ:number
  score:number
  accuracy:number
  items:  Array<string>;
  ansMap   = new Map();
  marksMap = new Map();
  explMap  = new Map();
  mcMap    = new Map();
  op1Map   = new Map();
  op2Map   = new Map();
  op3Map   = new Map();
  op4Map   = new Map();
  cBoxMap  = new Map();
  evalMap  = new Map();
  queMap   = new Map();

  constructor(
    public componentService: ComponentService,
    public authService: AuthService,
    private router: Router
  ) {
    this.userName = localStorage.getItem('userName');
    this.userName = this.userName.slice(0, this.userName.indexOf("@"));
   }

  ngOnInit() {
    this.bQ=this.componentService.getBlankQuestions()
    this.tQ=this.componentService.getTotalQuestions()
    this.cQ=this.componentService.getCorrectQuestions()
    this.wQ=this.componentService.getWrongQuestions()
    this.score=this.componentService.getScore()
    this.accuracy=this.componentService.getAccuracy()
    this.items=this.componentService.getQids()
    this.ansMap=this.componentService.getAnsMap()
    this.marksMap=this.componentService.getMarksMap()
    this.evalMap=this.componentService.getEvalMap()
    this.explMap=this.componentService.getExplMap()
    this.mcMap=this.componentService.getMcMap()
    this.op1Map=this.componentService.getOp1Map()
    this.op2Map=this.componentService.getOp2Map()
    this.op3Map=this.componentService.getOp3Map()
    this.op4Map=this.componentService.getOp4Map()
    this.cBoxMap=this.componentService.getCBoxMap()
    this.queMap=this.componentService.getQuestionsMap()
  }

  close() {
    this.router.navigate(['/user']);
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
