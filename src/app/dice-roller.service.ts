import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  private subject = new Subject<any>();

  constructor() { }

  rollDice(totalDice: number, sides: number, modifier: number) {
    let rollType = '(' + totalDice + 'd' + sides + ')';
    let formattedModifier = '';
    if (modifier != 0 ) {
      if (modifier > 0) {
        formattedModifier += ' + ' + Math.abs(modifier);
      } else {
        formattedModifier += ' - ' + Math.abs(modifier);
      }
    }
    let modifiedResult = rollType + formattedModifier + '\n';
    let total = 0;

    for (let i = 0; i < totalDice; i++) {
      let roll = this.rollSingleDice(sides);
      modifiedResult +=  roll;
      console.log ("i " + i);
      console.log ('totalDice: ' + totalDice)
      if (i + 1 < totalDice ) {
        modifiedResult += ', ';
      }
      total += Number(roll);
    }
    total+= Number(modifier);
    modifiedResult += formattedModifier;
    console.log('modifier: ' + modifier);

    modifiedResult += '\nTotal: ' + total;
    this.subject.next({roll: modifiedResult});
  }

  rollSingleDice(sides: number) {
    return Math.floor(Math.random() * (sides - 1 + 1) + 1);
  }

  getDiceResult(): Observable<any> {
    return this.subject.asObservable();
  }
}
