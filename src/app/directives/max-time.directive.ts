import {Directive, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';

const MAX_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxTimeValidator),
    multi: true
};

@Directive({
    selector: '[maxTime]',
    providers: [MAX_VALIDATOR]
})
export class MaxTimeValidator implements Validator, OnInit, OnChanges {
    @Input() maxTime: string;

    private validator: ValidatorFn;
    private onChange: () => void;

    ngOnInit() {
        this.validator = max(this.maxTime);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const key in changes) {
            if (key === 'maxTime') {
                this.validator = max(changes[key].currentValue);
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

const max = (checkValue: string): ValidatorFn => {
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
        return v.isBefore(moment(checkValue, 'HH:mm')) ? null : {actualValue: control.value, requiredValue: checkValue, min: true};
    };
};

export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}
