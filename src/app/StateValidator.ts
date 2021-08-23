import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


const usStates = [
    "AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH", 
	"NJ",
	"NM", 
	"NY" ,
	"NC",
	"ND" ,
	"OH",
	"OK",
	"OR",
	"PA", 
	"RI", 
	"SC", 
	"SD", 
	"TN", 
	"TX", 
	"UT", 
	"VT", 
	"VA", 
	"WA",
	"WV",  
	"WI", 
	"WY"
];

export function StateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (!control.value) return null;

        const value = control.value;
       
        


        return {}
    }
}