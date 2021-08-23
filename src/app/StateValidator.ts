import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

import UsStates from './UsStatesArray';

export function StateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (!control.value) return null;

        const value = (control.value).toUpperCase();
      
        const hasState = !UsStates.includes(value);


        return hasState ? {hasState} : null;
    }
}