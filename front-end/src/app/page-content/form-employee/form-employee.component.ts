import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../employee.model';
import { OfficeLocation } from '../../office-location.model'
import { EmployeeService } from '../../employee.service';
import { OfficeLocationService } from '../../office-location.service'

import { lookupListToken } from '../../lookup-list.providers';
import { Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
    selector: 'form-employee',
    templateUrl: 'form-employee.component.html',
    styleUrls: ['form-employee.component.css']
})

export class FormEmployeeComponent{
    employee : Employee = new Employee(0,"","","",null,"","","",null,null,"","","","","","",new OfficeLocation(0,""));
    param;
    form;
    private isShow = false;
    private isEdited = false
    private empPict = "../../assets/images/user.png";
    private ofLs : OfficeLocation[];
    officeLocation: OfficeLocation;

    constructor(private employeeService: EmployeeService,
                private officeLocationService : OfficeLocationService,
                @Inject(lookupListToken) public lookupLists,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private sharedService: SharedService){}

    ngOnInit(){
        this.getLocation();
        this.initialForm();
        this.route.params
        .subscribe(params => {
            this.param = params['param'];
            if (this.param == "add") {
                this.isEdited = false;
                this.isShow = true;
                this.form.reset();
                this.initialForm();
            }else if (this.param != null && this.param != "") {
                //console.log(this.param);
                this.getEmployee(this.param);
            }
        });
    }

    getLocation(){
        this.officeLocationService
            .getOfficeLocation().subscribe(officeLocations =>{
                this.ofLs = officeLocations
            });
    }

    initialForm(){
        this.form = this.formBuilder.group({
            firstName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
            subDivision: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
            lastName: this.formBuilder.control('', Validators.required),
            status: this.formBuilder.control('', Validators.required),
            gender: this.formBuilder.control('Male', Validators.required),
            suspendDate: this.formBuilder.control(''),
            dob: this.formBuilder.control('', Validators.required),
            hiredDate: this.formBuilder.control('', Validators.required),
            nationality: this.formBuilder.control('', Validators.required),
            grade: this.formBuilder.control('', Validators.required),
            maritalStatus: this.formBuilder.control('', Validators.required),
            division: this.formBuilder.control('', Validators.required),
            phoneNumber: this.formBuilder.control('', Validators.required),
            email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
            officeLocation: this.formBuilder.control('', Validators.required)
        });
        this.empPict = "../../assets/images/user.png";
    }

     onSet(){
             this.form.controls['firstName'].setValue(this.employee.firstName, Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
             this.form.controls['subDivision'].setValue(this.employee.subDivision, Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
             this.form.controls['lastName'].setValue(this.employee.lastName, Validators.compose([Validators.required]));
             this.form.controls['status'].setValue(this.employee.status, Validators.compose([Validators.required]));
             this.form.controls['gender'].setValue(this.employee.gender, Validators.compose([Validators.required]));
             this.form.controls['suspendDate'].setValue(this.employee.suspendDate);
             this.form.controls['dob'].setValue(this.employee.dob, Validators.compose([Validators.required]));
             this.form.controls['hiredDate'].setValue(this.employee.hiredDate, Validators.compose([Validators.required]));
             this.form.controls['nationality'].setValue(this.employee.nationality, Validators.compose([Validators.required]));
             this.form.controls['grade'].setValue(this.employee.grade, Validators.compose([Validators.required]));
             this.form.controls['maritalStatus'].setValue(this.employee.maritalStatus, Validators.compose([Validators.required]));
             this.form.controls['division'].setValue(this.employee.division, Validators.compose([Validators.required]));
             this.form.controls['phoneNumber'].setValue(this.employee.phoneNumber, Validators.compose([Validators.required]));
             this.form.controls['email'].setValue(this.employee.email, Validators.compose([Validators.required, Validators.email]));
             this.form.controls['officeLocation'].setValue(this.employee.officeLocation.id, Validators.compose([Validators.required]));
    }

    onSubmit(employee:Employee){
        if(this.empPict != "../../assets/images/user.png" || this.empPict != null) {
            employee.empPict = this.empPict;
        }

        this.officeLocation = {
            id: this.employee.officeLocation.id,
            locationName: this.employee.officeLocation.locationName
        };

        employee.officeLocation = this.officeLocation;

        if(this.param === 'add'){
            this.employeeService.createEmployee(employee).subscribe(response => {
                this.onRefresh();
            });
        }else{
            employee.empId = parseInt(this.param);
            this.employeeService.updateEmployee(employee).subscribe(response => {
                this.onRefresh();
            });
        }
    }

    onRefresh(){
        this.sharedService.notifyOther({ option: 'refresh', value: 'from form' });
        this.router.navigate(['/']);
    }

    onCancel(){
        this.sharedService.notifyOther({ option: 'refreshCancel', value: 'cancel' });
        this.router.navigate(['/']);
    }

    getEmployee(param) {
        this.employeeService.getEmployee(param)
        .subscribe(employee => {
            this.employee = employee;
            if (this.employee == null) {
                this.isShow = false;
            }else{
                this.isShow= true;
                this.isEdited = true;
                if(this.employee.empPict == null || this.employee.empPict == ""){
                    this.empPict = "../../assets/images/user.png";
                }else{
                    this.empPict = employee.empPict;   
                }
                this.onSet();
            }
        });
    }

    onUpload(img){
        if(img.target.files[0]){
            var image = new FileReader();
            image.onload = (img: any)=>{
                this.empPict = img.target.result;
            }
            image.readAsDataURL(img.target.files[0]);
        }   
    }

    onChange(officeLocation: OfficeLocation) {
        //console.log(officeLocation);
        if(this.employee.officeLocation != null){
            this.employee.officeLocation = officeLocation;
            // console.log(this.employee.officeLocation);
        }
    }
}