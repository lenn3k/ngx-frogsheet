import {Directive, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';

const MIN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinTimeValidator),
    multi: true
};

@Directive({
    selector: '[minTime]',
    providers: [MIN_VALIDATOR]
})
export class MinTimeValidator implements Validator, OnInit, OnChanges {
    @Input() minTime: string;

    private validator: ValidatorFn;
    private onChange: () => void;

    ngOnInit() {
        this.validator = min(this.minTime);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const key in changes) {
            if (key === 'minTime') {
                this.validator = min(changes[key].currentValue);
                if (this.onChange) {
                    this.onChange();
                }
            }
        }
    }

    validate(c: AbstractControl): { [key: string]: any } {
        return this.validator(c);
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onChange = fn;
    }
}

const min = (checkValue: string): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!isPresent(checkValue)) {
            return null;
        }
        if (isPresent(Validators.required(control))) {
            return null;
        }
        if (checkValue.length === 0) {
            return null;
        }
        if (!moment(checkValue, 'HH:mm').isValid()) {
            return null;
        }

        if (!moment(control.value, 'HH:mm').isValid()) {
            return null;
        }
        const v: moment.Moment = moment(control.value, 'HH:mm');
        return v.isAfter(moment(checkValue, 'HH:mm')) ? null : {actualValue: control.value, requiredValue: checkValue, min: true};
    };
};

export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}
