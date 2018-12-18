import {async, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {MaxTimeValidator} from './directives/max-time.directive';
import {MinTimeValidator} from './directives/min.directive';
import {MaterialModule} from './material.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MinTimeValidator,
                MaxTimeValidator
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                MaterialModule
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Frogsheet'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Frogsheet');
    });

    it('should calculate total', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        const input = {
            date: new Date(2018, 1, 1),
            month: 1,
            day: 1,
            startTime: '',
            endTime: '',
            breakTime: '',
            type: 'work',
            weekday: true,
            total: ''
        };
        app.calculateTotal(input);
        expect(input.total).toEqual('');

        input.startTime = '07:00';
        app.calculateTotal(input);
        expect(input.total).toEqual('');

        input.endTime = '10:00';
        app.calculateTotal(input);
        expect(input.total).toEqual('03:00');

        input.breakTime = '01:00';
        app.calculateTotal(input);
        expect(input.total).toEqual('02:00');

        input.breakTime = '00:30';
        app.calculateTotal(input);
        expect(input.total).toEqual('02:30');

    });
});
