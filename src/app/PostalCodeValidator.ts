import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function PostalCodeValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (!control.value) return null;

        const value = control.value;
       
        const notNumber = isNaN(value);


        return notNumber ? {notNumber} : null;
    }
}