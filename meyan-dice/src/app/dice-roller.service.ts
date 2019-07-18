import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  private subject = new Subject<any>();

  constructor() { }

  rollDice(totalDice: number, sides: number, modifier: number) {
    
    let modifiedResult = "";
    for (let i = 0; i < totalDice; i++) {
        modifiedResult += this.rollSingleDice(sides) + ' + ';
    }
    modifiedResult = modifier + ' = ' + (modifiedResult + modifier);
    this.subject.next({roll: modifiedResult});
  }

  rollSingleDice(sides: number) {
    return Math.floor(Math.random() * (sides - 1 + 1) + 1);
  }

  getDiceResult(): Observable<any> {
    return this.subject.asObservable();
  }
}
