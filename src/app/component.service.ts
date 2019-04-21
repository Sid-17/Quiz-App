import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  quizId:string
  tQ:number
  bQ:number
  cQ:number
  wQ:number
  score:number
  accuracy:number
  qIds:  Array<string>;
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

    constructor() { }

    setId(id){
      this.quizId=id;
      //console.log(this.quizId+"sdbcs");
    }

    getId(){
      return this.quizId;
    }

    setResult(tQ:number,cQ:number,wQ:number,bQ:number,score:number,qIds,ansMap,
      marksMap,evalMap,explMap,mcMap,op1Map,
      op2Map,op3Map,op4Map,cBoxMap,queMap){
      this.tQ=tQ;
      this.wQ=wQ;
      this.cQ=cQ;
      this.bQ=bQ;
      this.score=score;
      this.accuracy=(cQ/tQ)*100;
      this.qIds=qIds;
      this.ansMap=ansMap;
      this.marksMap=marksMap;
      this.evalMap=evalMap;
      this.explMap=explMap;
      this.marksMap=marksMap;
      this.mcMap=mcMap;
      this.op1Map=op1Map;
      this.op2Map=op2Map;
      this.op3Map=op3Map;
      this.op4Map=op4Map;
      this.cBoxMap=cBoxMap;
      this.queMap=queMap;


      console.log(this.queMap.size);
      console.log(this.evalMap.size);
    }

    getTotalQuestions(){
      return this.tQ
    }

    getBlankQuestions(){
      return this.bQ
    }
    getCorrectQuestions(){
      return this.cQ
    }
    getWrongQuestions(){
        return this.wQ
    }
    getScore(){
      return this.score
    }
    getAccuracy(){
      return this.accuracy
    }
    getQids(){
      return this.qIds
    }
    getAnsMap(){
      return this.ansMap
    }
    getMarksMap(){
      return this.marksMap
    }
    getEvalMap(){
      return this.evalMap
    }
    getExplMap(){
      return this.explMap
    }
    getMcMap(){
      return this.mcMap
    }
    getOp1Map(){
      return this.op1Map
    }
    getOp2Map(){
      return this.op2Map
    }
    getOp3Map(){
      return this.op3Map
    }
    getOp4Map(){
      return this.op4Map
    }
    getCBoxMap(){
      return this.cBoxMap
    }
    getQuestionsMap(){
      return this.queMap
    }
}
