import { Component, OnInit, Input } from '@angular/core';
import { DiceRollerService, DieRoll, Die } from '../dice-roller.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  @Input()
  sides: number;
  constructor(private diceRollerService: DiceRollerService) { }

  ngOnInit() {
  }

  rollDice(numOfDice: number, modifier: number) {
    if (numOfDice > 0) {
      console.log('roll');
      console.log('num: ' + numOfDice)
      let dieType: Die = new Die(this.sides);
      let dieRoll: DieRoll = new DieRoll(numOfDice, dieType);
      this.diceRollerService.rollDice(dieRoll, modifier);
    }
  }

}
