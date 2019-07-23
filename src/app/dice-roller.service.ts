import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  private subject = new Subject<any>();

  constructor() { }

  rollDice(dieRoll: DieRoll, modifier: number) {
    this.subject.next({roll: this.formatResult(modifier, dieRoll)});
  }

  formatResult(modifier: number, dieRoll: DieRoll) {
    let rollType = '(' + dieRoll.totalDice + 'd' + dieRoll.dieType.sides + ')';
    let rollResult: number[] = dieRoll.rollHand();
    let formattedModifier = this.formatModifier(modifier);
    let total = this.calculateRollTotal(rollResult, modifier);
    let formattedResult = rollType + ' ' + formattedModifier 
        + '\n' + this.formatRollResult(rollResult, ',') 
        + '\n Total: ' + total;
    return formattedResult;
  }

  formatRollResult(dieRolls: number[], separator: string) {
    let formattedRollResult = '';
    for (let i = 0; i < dieRolls.length; i++) {
      formattedRollResult += dieRolls[i];
      if (i + 1 < dieRolls.length) {
        formattedRollResult += separator + ' ';
      }
    }
    return formattedRollResult;
  }

  calculateRollTotal(dieRolls: number[], modifier: number) {
    let rollTotal:number = Number(modifier);
    for (let i = 0; i < dieRolls.length; i++) {
      rollTotal += dieRolls[i];
    }
    return rollTotal;
  }

  rollDiceForResult() {

  }

  formatModifier(modifier: number) {
    let formattedModifier = '';
    if (modifier != 0 ) {
      if (modifier > 0) {
        formattedModifier += ' + ' + Math.abs(modifier);
      } else {
        formattedModifier += ' - ' + Math.abs(modifier);
      }
    }
    return formattedModifier;
  }

  rollSingleDie(sides: number) {
    let die = new Die(6);
    return die.rollDie();
    // return Math.floor(Math.random() * (sides - 1 + 1) + 1);
  }

  getDiceResult(): Observable<any> {
    return this.subject.asObservable();
  }
}

export class DieRoll {
  dieType: Die;
  totalDice: number;

  constructor(totalDice: number, dieType:Die) {
    this.totalDice = totalDice;
    this.dieType = dieType;
  }

  rollHand(): number[] {
    let myHand = new Array();
    for (let i = 0; i < this.totalDice; i ++) {
      myHand.push(this.dieType.rollDie());
    }
    return myHand;
  }
}

export class Die {
  sides: number;
  constructor(sides: number) {
    this.sides = sides;
  }

  rollDie() {
    return Math.floor(Math.random() * (this.sides - 1 + 1) + 1);
  }
}