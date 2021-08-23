import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function StateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (!control.value) return null;

        const value = control.value;
       
        


        return notNumber ? {notNumber} : null;
    }
}