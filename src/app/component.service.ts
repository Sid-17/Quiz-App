import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  quizId:string
    constructor() { }

    setId(id){
      this.quizId=id;
      //console.log(this.quizId+"sdbcs");
    }
    getId(){
      return this.quizId;
    }
}
