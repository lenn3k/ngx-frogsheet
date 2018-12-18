import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Frogsheet';

    dayInputs: DayInput[] = [];
    todoWorkingHours: number;

    ngOnInit(): void {

        const days = this.getDaysInMonth(new Date().getMonth(), new Date().getFullYear());
        days.forEach((day: Date) => {
            this.dayInputs.push({
                date: day,
                month: day.getMonth(),
                day: day.getDate(),
                startTime: '',
                endTime: '',
                breakTime: '',
                type: 'work',
                weekday: day.getDay() !== 0 && day.getDay() !== 6,
                total: ''
            });
        });



        // this.todoWorkingHours = this.dayInputs


    }

    private getDaysInMonth(month, year) {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    calculateTotal(dayInput: DayInput) {
        let total: moment.Moment;

        const startTime = moment(dayInput.startTime, 'HH:mm');
        const endTime = moment(dayInput.endTime, 'HH:mm');
        if (startTime.isValid() && endTime.isValid() && startTime.isBefore(endTime)) {

            total = endTime
                .subtract(startTime.get('hour'), 'hour')
                .subtract(startTime.get('minute'), 'minute');

            const breakTime = moment(dayInput.breakTime, 'HH:mm');
            if (breakTime.isValid()) {
                total = total
                    .subtract(breakTime.get('hour'), 'hour')
                    .subtract(breakTime.get('minute'), 'minute');
            }

            dayInput.total = total.format('HH:mm');
            return;
        }
        dayInput.total = '';

    }
}

interface DayInput {
    date?: Date;
    month?: number;
    day?: number;
    startTime?: string;
    endTime?: string;
    breakTime?: string;
    type?: string;
    weekday?: boolean;
    total?: string;
}
