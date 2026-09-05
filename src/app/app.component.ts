import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  week1: number;

  taxCalculated = false;
  grossPay: number;
  nettPay: number;
  paye: number;
  prsi: number;
  usc: number;
  taxSum: number;

  onCalc() {
    this.grossPay = +this.week1.toFixed(2);
    this.taxCalculated = true;

    this.paye = this.calcPaye(this.grossPay);
    this.prsi = this.calcPrsi(this.grossPay);
    this.usc = this.calcUsc(this.grossPay);

    this.taxSum = +(this.paye + this.prsi + this.usc).toFixed(2);
    this.nettPay = +(this.grossPay - this.taxSum).toFixed(2);
  }

  calcPaye(amount: number): number {
    const weeklyTaxCredit = 76.68;
    const standardRateBand = 846.16;

    let grossTax: number;

    if (amount <= standardRateBand) {
      grossTax = amount * 0.20;
    } else {
      grossTax =
        standardRateBand * 0.20 +
        (amount - standardRateBand) * 0.40;
    }

    return +Math.max(0, grossTax - weeklyTaxCredit).toFixed(2);
  }

  calcPrsi(amount: number): number {
    if (amount <= 352) {
      return 0;
    }

    return +(amount * 0.042).toFixed(2);
  }

  calcUsc(amount: number): number {
    const band1 = 231.00;
    const band2 = 551.92;
    const band3 = 1347.00;

    let usc = 0;

    if (amount <= band1) {
      usc = amount * 0.005;
    } else if (amount <= band2) {
      usc =
        band1 * 0.005 +
        (amount - band1) * 0.02;
    } else if (amount <= band3) {
      usc =
        band1 * 0.005 +
        (band2 - band1) * 0.02 +
        (amount - band2) * 0.03;
    } else {
      usc =
        band1 * 0.005 +
        (band2 - band1) * 0.02 +
        (band3 - band2) * 0.03 +
        (amount - band3) * 0.08;
    }

    return +usc.toFixed(2);
  }
}
