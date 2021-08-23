
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function AddressValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (!control.value)
            return null;
        
        const value = control.value;

        const hasLetters = /[a-zA-Z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const hasOrder = /^\s*[0-9]+\s*[A-Za-z]*.*\s*[A-Za-z]+\s*[A-Za-z]*\s*.*\s*$/.test(value); 

        const addressValid = hasLetters && hasNumeric && hasOrder
        
        return !addressValid ? {AddressNotValid: {hasLetters: !hasLetters, hasNumeric: !hasNumeric, hasOrder: !hasOrder}} : null;

    }
}