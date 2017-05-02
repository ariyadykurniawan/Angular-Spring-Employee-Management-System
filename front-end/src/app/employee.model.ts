import { OfficeLocation } from './office-location.model';
export class Employee {
    constructor(
        public empId: number,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public dob: Date,
        public nationality: string,
        public phoneNumber: string,
        public email: string,
        public hiredDate: Date,
        public suspendDate: Date,
        public division: string,
        public grade: string,
        public subDivision: string,
        public status: string,
        public maritalStatus: string,
        public empPict: string,
        public officeLocation: OfficeLocation
    ) {

    }
}