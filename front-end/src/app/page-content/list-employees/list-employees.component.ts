import { Component,Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../employee.model';
import { OfficeLocation } from '../../office-location.model'

import { EmployeeService } from '../../employee.service';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { lookupListToken } from '../../lookup-list.providers';
import { Validators, FormBuilder } from '@angular/forms';
import { OfficeLocationService } from '../../office-location.service'

@Component({
    selector: 'list-employees',
    templateUrl: 'list-employees.component.html',
    styleUrls: ['list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit{
    employees: Employee[];
    selectedEmployee: Employee;
    private sort = false;
    private subscription: Subscription;
    private dialogRef: MdDialogRef<any>;

    constructor(private employeeService: EmployeeService,
                private router: Router,
                private sharedService: SharedService,
                private dialog: MdDialog
                ){}
            
    getEmployees():void {
        this.employeeService
            .getEmployees().subscribe(employees => {
                this.employees = employees
            });
           
    }

    ngOnInit(): void {
        this.getEmployees();
        this.subscription = this.sharedService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'refresh') {
                this.getEmployees();
            } else if (res.hasOwnProperty('option') && res.option === 'refreshSelected') {
                this.selectedEmployee = null;
            } else if (res.hasOwnProperty('option') && res.option === 'refreshCancel') {
                this.selectedEmployee = null;
            }
        });

    }

     onSelect(employee: Employee): void{
        this.selectedEmployee = employee;
        this.router.navigate(['/employee/',this.selectedEmployee.empId]);
    }

    onSearch(event:any, search){
        if(!search){
                this.getEmployees();
            }
        this.employees = Object.assign([], this.employees).filter(
            employee => employee.lastName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            employee.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1 || 
            (employee.firstName + ' ' + employee.lastName).toLowerCase().indexOf(search.toLowerCase()) > -1
        );
    }

    onSort(){
        if(this.sort === false){
            this.employees.sort(function(employee1, employee2) {
                if ( employee1.lastName < employee2.lastName ){
                    return -1;
                }else if( employee1.lastName > employee2.lastName ){
                    return 1;
                }else{
                    return 0;	
                }
            });
            this.sort = true;
        }else{
            this.employees.sort(function(emp1, emp2) {
                if ( emp1.lastName < emp2.lastName ){
                    return 1;
                }else if( emp1.lastName > emp2.lastName ){
                    return -1;
                }else{
                    return 0;	
                }
            });
        this.sort = false;
        }

    }

    addEmployee(){
        this.sharedService.notifyOther({ option: 'refreshSelected', value: 'new' });
    }

    openDialogDelete() {
        this.dialogRef = this.dialog.open(DialogDeleteEmployee);
        this.dialogRef.componentInstance.firstName = this.selectedEmployee.firstName;
        this.dialogRef.componentInstance.lastName = this.selectedEmployee.lastName;
        this.dialogRef.afterClosed().subscribe(result => {
            if(result == "delete"){
                this.onDelete();
            }
        });
    }

    openDialogFilter() {
        this.dialogRef = this.dialog.open(DialogFilterEmployee,{
            height: '300px',
            width: '250px',
        });
        this.dialogRef.afterClosed().subscribe(result => {
            this.onFilter(result);
        });
    }

    onDelete(): void{
        this.employeeService.deleteEmployee(this.selectedEmployee.empId).subscribe( response =>{
            this.sharedService.notifyOther({ option: 'refresh', value: 'from form' });
            this.router.navigate(['/']);
        });
    }

    onFilter(filter: any){
        
        if(filter){
            if(filter.gender == "all" && filter.officeLocation == "all"){
                this.getEmployees();
            }else if((filter.gender != "all") && (filter.officeLocation == "all")) {
                this.employeeService
                    .getEmployees().subscribe(employees => {
                        this.employees = employees
                        if(this.employees != null){
                            this.employees = Object.assign([], this.employees).filter(
                                employee => employee.gender.indexOf(filter.gender) > -1
                            );
                        }
                    });
            }else if((filter.gender == "all") && (filter.officeLocation != "all")){
                this.employeeService
                    .getEmployees().subscribe(employees => {
                        this.employees = employees
                        if(this.employees != null){
                            this.employees = Object.assign([], this.employees).filter(
                                employee => employee.officeLocation.locationName.toLowerCase().indexOf(filter.officeLocation.toLowerCase()) > -1
                            );
                        }
                    });
            }else if((filter.gender != "all") && (filter.officeLocation != "all")){
                this.employeeService
                    .getEmployees().subscribe(employees => {
                        this.employees = employees  
                        if(this.employees != null){
                            this.employees = Object.assign([], this.employees).filter(
                                employee => employee.gender.indexOf(filter.gender) > -1 &&
                                employee.officeLocation.locationName.toLowerCase().indexOf(filter.officeLocation.toLowerCase()) > -1
                            );
                        }                        
                    });
                
            }
        }
    }
}

@Component({
  selector: 'dialog-delete-employee',
  templateUrl: '../dialog/dialog-delete-employee.component.html',
})

export class DialogDeleteEmployee {
    firstName : string;
    lastName : string;
    constructor(public dialogRef: MdDialogRef<DialogDeleteEmployee>) {}
}


@Component({
  selector: 'dialog-filter-employee',
  templateUrl: '../dialog/dialog-filter-employee.component.html',
  styleUrls: ['../dialog/dialog-filter-employee.component.css']
})

export class DialogFilterEmployee {
    constructor(public dialogRef: MdDialogRef<DialogDeleteEmployee>,
                @Inject(lookupListToken) public lookupLists,
                private formBuilder: FormBuilder,
                private officeLocationService: OfficeLocationService,) {}
    form;
    officeLocations: OfficeLocation[];
    ngOnInit(){
        this.officeLocationService.getOfficeLocation().subscribe(response => {
            this.officeLocations  = response;
        });

        this.form = this.formBuilder.group({
            gender: this.formBuilder.control('all'),
            officeLocation: this.formBuilder.control('all')
        });
    }
}