import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  week1: number;
  week2: number;
  taxCalculated = false;
  grossPay: number;
  nettPay: number;
  paye: number;
  prsi: number;
  usc: number;
  taxSum: number;

  onCalc() {
    this.grossPay = +(this.week1).toFixed(2);
    this.taxCalculated = true;
    this.paye = +((this.grossPay * 0.2) - 76.68).toFixed(2);
    this.prsi = +this.calcPrsi(this.week1).toFixed(2);
    this.usc = +this.calcUsc(this.grossPay);
    this.taxSum = +(this.paye + this.prsi + this.usc).toFixed(2);
    this.nettPay = +(this.grossPay - this.taxSum).toFixed(2);
  }

  calcPrsi(amount: number) {
    let result = 0;
    if (amount > 352.01) {
      result = (amount * 0.042);
    }
    return result.toFixed(2);
  }

  calcUsc(amount: number) {
    let result = 0;
    const tresholds = [
      {value: 231, prc: 0.005},
      {value: 320.93, prc: 0.02},
      {value: 795.08, prc: 0.03}
      ];

    if (amount > tresholds[0].value) {
      result = tresholds[0].value * tresholds[0].prc + (amount - tresholds[0].value) * tresholds[1].prc;
    }
    if (amount > tresholds[0].value + tresholds[1].value) {
      result += (amount - (tresholds[0].value + tresholds[1].value)) * tresholds[2].prc;
    }
    return result.toFixed(2);
  }
}
