import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frogsheet';

  dayInputs: Array<DayInput> = [];
  todoWorkingHours: number;
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  workingHours = 8.75;
  maxShiftHours = 1.6;

  monthList: Array<string> = new Array(12)
    .fill(0)
    .map((_, i) => i)
    .map(i =>
      moment()
        .month(i)
        .format('MMMM')
    );

  ngOnInit(): void {
    this.updateDays();
  }

  calculateTotal(dayInput: DayInput): void {
    let total: moment.Moment;

    const startTime = moment(dayInput.startTime, 'HH:mm');
    const endTime = moment(dayInput.endTime, 'HH:mm');
    if (
      startTime.isValid() &&
      endTime.isValid() &&
      startTime.isBefore(endTime)
    ) {
      total = endTime
        .subtract(startTime.get('hour'), 'hour')
        .subtract(startTime.get('minute'), 'minute');

      dayInput.total = total.format('HH:mm');

      dayInput = this.calculateShift(dayInput);

      return;
    }
    dayInput.total = '';
  }

  updateDays(): void {
    const days = this.getDaysInMonth(this.currentMonth, this.currentYear);
    days.forEach((day: Date) => {
      this.dayInputs.push({
        date: day,
        month: day.getMonth(),
        day: day.getDate(),
        startTime: '',
        endTime: '',
        weekday: day.getDay() !== 0 && day.getDay() !== 6,
        total: ''
      });
    });
  }

  calculateShift(dayInput: DayInput): DayInput {
    const total = moment(dayInput.total, 'HH:mm');

    const totalNumber = total.get('hour') + total.get('minute') / 60;

    const shiftNumber = totalNumber - this.workingHours;

    const shift = moment()
      .set('h', Math.abs(shiftNumber))
      .format('HH:mm');

    console.log(shift);

    const newDayInput = { ...dayInput, shift, overtime: shiftNumber > 0 };

    return newDayInput;
  }

  private getDaysInMonth(month: number, year: number): Array<Date> {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  }
}

interface DayInput {
  date?: Date;
  month?: number;
  day?: number;
  startTime?: string;
  endTime?: string;
  weekday?: boolean;
  total?: string;
  shift?: string;
  overtime?: boolean;
}
