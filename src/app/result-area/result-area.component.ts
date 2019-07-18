import { Component, OnInit, Input } from '@angular/core';
import { DiceRollerService } from '../dice-roller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-area',
  templateUrl: './result-area.component.html',
  styleUrls: ['./result-area.component.css']
})
export class ResultAreaComponent implements OnInit {
  results: string = "";
  subscription: Subscription;

  constructor(private diceRollerService: DiceRollerService) { }

  ngOnInit() {
    this.subscription = this.diceRollerService.getDiceResult().subscribe(
      modifiedResult => {
        console.log(modifiedResult.roll);
        this.addToResults(modifiedResult.roll);
      }
    );
  }

  clearResults() {
    this.results = "";
  }

  addToResults(dataToAdd: string) {
    console.log(this.results);
    if(this.results != "") {
      this.results += "\n" + dataToAdd;
    } else {
      this.results += dataToAdd;
    }
    
  }
}
