import { Component, OnInit } from '@angular/core';
import { DiceRollerService } from '../dice-roller.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  constructor(private diceRollerService: DiceRollerService) { }

  ngOnInit() {
  }

  rollDice(numOfDice: number) {
    console.log('roll');
    console.log('num: ' + numOfDice)
    this.diceRollerService.rollDice(numOfDice, 6, 0);
  }

}
