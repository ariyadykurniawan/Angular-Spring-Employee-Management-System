import { OpaqueToken } from '@angular/core';

export const lookupListToken = new OpaqueToken('lookupListToken');

export const lookupLists = {
    genders: [  {value: 'Male', viewValue: 'Male'},
                {value: 'Female', viewValue: 'Female'},
                {value: 'Other', viewValue: 'Other'}],
    divisions : [   {value: 'CDC AsteRx', viewValue: 'CDC AsteRx'},
                    {value: 'CDC', viewValue: 'CDC'},
                    {value: 'Finance & Accounting', viewValue: 'Finance & Accounting'},
                    {value: 'SWD Green', viewValue: 'SWD Green'},],
    maritalStatuss : [   {value: 'Single', viewValue: 'Single'},
                        {value: 'Married', viewValue: 'Married'},],
    grades: [   {value: 'SE-JP', viewValue: 'SE-JP'},
                {value: 'SE-PG', viewValue: 'SE-PG'},
                {value: 'SE-AP', viewValue: 'SE-AP'},
                {value: 'SE-AN', viewValue: 'SE-AN'},
                {value: 'SQ-AN', viewValue: 'SQ-JT'},
                {value: 'SQ-ST', viewValue: 'SQ-ST'}],
};